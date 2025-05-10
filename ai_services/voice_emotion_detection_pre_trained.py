from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import torch
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification
from pydub import AudioSegment
from pydub.utils import which
import io
import os

# Setup ffmpeg/ffprobe
os.environ["PATH"] += os.pathsep + "/usr/bin"
AudioSegment.converter = which("ffmpeg")
AudioSegment.ffprobe = which("ffprobe")

app = FastAPI(root_path="/reflectai")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific IPs if needed later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_NAME = "firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3"
extractor = AutoFeatureExtractor.from_pretrained(MODEL_NAME)
model = AutoModelForAudioClassification.from_pretrained(MODEL_NAME)
model.eval()
emotion_labels = list(model.config.id2label.values())

def convert_to_tensor(audio_segment):
    samples = audio_segment.get_array_of_samples()
    waveform = torch.tensor(samples, dtype=torch.float32) / 32768.0
    return waveform.unsqueeze(0)

def predict_emotion(audio_bytes):
    audio = AudioSegment.from_file(io.BytesIO(audio_bytes)).set_frame_rate(16000).set_channels(1)
    tensor = convert_to_tensor(audio)
    inputs = extractor(tensor.squeeze().numpy(), sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        logits = model(input_features=inputs["input_features"]).logits
    pred_id = torch.argmax(logits, dim=-1).item()
    confidence = torch.nn.functional.softmax(logits, dim=-1)[0][pred_id].item()
    return emotion_labels[pred_id], confidence

@app.post("/audiomodel")
async def predict_multiple_emotions(files: List[UploadFile] = File(...)):
    emotion_conf_map = {}
    for file in files:
        try:
            audio_bytes = await file.read()
            emotion, conf = predict_emotion(audio_bytes)
            if emotion not in emotion_conf_map or conf > emotion_conf_map[emotion]:
                emotion_conf_map[emotion] = conf
        except:
            continue

    if not emotion_conf_map:
        return {"error": "No valid audio files were processed."}

    return [
        {"predicted_emotion": emo, "confidence": round(conf, 4)}
        for emo, conf in sorted(emotion_conf_map.items(), key=lambda x: x[1], reverse=True)
    ]
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
