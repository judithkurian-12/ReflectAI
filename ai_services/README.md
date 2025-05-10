# AI Emotion Prediction Service (FastAPI)

This repository provides two AI-powered emotion prediction services built using **FastAPI**:

1. **Text Emotion Prediction**: A model that predicts emotions from input text.
2. **Image Emotion Prediction**: A model that predicts emotions from facial expressions in images.

Both services use **transformers** and **torch** for inference and are designed to run independently on separate ports.

---

## Setup Instructions

### Prerequisites

- Python 3.11+ (Ensure you have Python installed, and check with `python --version`)
- Install required dependencies using `pip`.

---

### Install Dependencies

Make sure you have the `requirements.txt` file in your project folder. It includes all the necessary packages to run both services.

To install the dependencies, run:

```bash
pip install -r requirements.txt
```
### Text Emotion Prediction Service

uvicorn mood_prediction_pre_trained:app --host 0.0.0.0 --port 8003 --reload

### Image Emotion Prediction Service

uvicorn image_emotion_detection:app --host 0.0.0.0 --port 8002 --reload

### Voice Emotion Prediction Service

uvicorn voice_emotion_detection_pre_trained:app --host 0.0.0.0 --port 8004  --reload
