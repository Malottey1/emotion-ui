from fastapi import FastAPI
from emotion import detect_emotion
from db import get_db

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Emotion AI Backend Running"}

@app.post("/detect")
async def detect_emotion_route(image: bytes):
    emotion = detect_emotion(image)
    return {"emotion": emotion}
