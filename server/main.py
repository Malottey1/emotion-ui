# server/main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
from emotion import EmotionEngine
from chat import chat_once

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])
engine = EmotionEngine()

@app.websocket('/ws/frames')
async def frames(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            b64 = await ws.receive_text()  # dataURL frame
            emotion = engine.infer_from_b64(b64) # {label, probs}
            await ws.send_json(emotion)
            await asyncio.sleep(0.2)  # ~5 Hz
    except Exception:
        await ws.close()

class ChatIn(BaseModel):
    prompt: str
    history: list[dict] = []

@app.post('/chat')
def chat(body: ChatIn):
    return chat_once(body.prompt, body.history)