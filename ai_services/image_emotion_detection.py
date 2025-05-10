from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import io
from typing import List

app = FastAPI(root_path="/reflectai")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific IPs if needed later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and processor once at startup
MODEL_NAME = "dima806/facial_emotions_image_detection"
processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()

# Emotion labels
class_labels = ["sad", "disgust", "angry", "neutral", "fear", "surprise", "happy"]

@app.post("/imagemodel")
async def predict_image(files: List[UploadFile] = File(...)):
    try:
        emotion_conf_map = {}

        for file in files:
            if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
                return JSONResponse(
                    status_code=415,
                    content={"error": f"Unsupported file type for {file.filename}. Please upload a .jpg, .jpeg, or .png image."}
                )

            contents = await file.read()
            image = Image.open(io.BytesIO(contents)).convert("RGB")
            inputs = processor(images=image, return_tensors="pt")

            with torch.no_grad():
                outputs = model(**inputs)
                logits = outputs.logits
                probs = torch.softmax(logits, dim=1)[0]

                predicted_class = torch.argmax(probs).item()
                confidence = probs[predicted_class].item() * 100
                emotion = class_labels[predicted_class]

                # Keep the highest confidence if duplicate
                if emotion not in emotion_conf_map or confidence > emotion_conf_map[emotion]:
                    emotion_conf_map[emotion] = confidence

        # Format response
        response = [
            {"emotion": emo, "confidence": round(conf, 2)}
            for emo, conf in emotion_conf_map.items()
        ]

        return {"predicted_emotions": response}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
