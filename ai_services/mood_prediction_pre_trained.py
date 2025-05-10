from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch.nn.functional as F

app = FastAPI(root_path="/reflectai")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific IPs if needed later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "SamLowe/roberta-base-go_emotions"
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model.eval()

LABELS = [
    "admiration", "amusement", "anger", "annoyance", "approval", "caring", "confusion",
    "curiosity", "desire", "disappointment", "disapproval", "disgust", "embarrassment",
    "excitement", "fear", "gratitude", "grief", "joy", "love", "nervousness", "optimism",
    "pride", "realization", "relief", "remorse", "sadness", "surprise", "neutral"
]

emoji_mood_map = {
    '😊': 'Joyful', '😢': 'Sad', '😡': 'Anger', '😱': 'Fear', '😍': 'Admiration',
    '🤔': 'Confused', '💔': 'Despair', '💭': 'Nostalgic', '😌': 'Relief',
    '🙃': 'Sarcasm', '💪': 'Powerful', '🥺': 'Vulnerable', '😎': 'Confident',
    '😴': 'Tired', '🤯': 'Overwhelmed', '🥳': 'Excited', '😅': 'Confused',
    '❤️': 'Loving', '😁': 'Cheerful'
}

class TextInput(BaseModel):
    text: str

def extract_emojis(text):
    found_moods = set()
    for char in text:
        if char in emoji_mood_map:
            found_moods.add(emoji_mood_map[char])
    return list(found_moods)

def predict_emotions(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = F.sigmoid(outputs.logits).squeeze().tolist()
    predicted_emotions = {LABELS[i]: probs[i] for i in range(len(LABELS)) if probs[i] > 0.1}
    sorted_emotions = sorted(predicted_emotions.items(), key=lambda x: x[1], reverse=True)
    return [{"emotion": label, "confidence": round(score, 4)} for label, score in sorted_emotions]


@app.post("/textmodel")
def get_emotions(input: TextInput):
    text = input.text
    emoji_moods = extract_emojis(text)

    # Remove all known emojis from text
    text_without_emojis = ''.join([ch for ch in text if ch not in emoji_mood_map])
    text_without_emojis = text_without_emojis.strip()

    if text_without_emojis == "":
        return {
            "emoji_moods": emoji_moods,
            "text_emotions": []
        }

    text_emotions = predict_emotions(text)
    return {
        "emoji_moods": emoji_moods,
        "text_emotions": text_emotions
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
