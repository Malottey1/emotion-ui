# server/chat.py
import requests, os
OLLAMA = os.getenv('OLLAMA_HOST','http://localhost:11434')
MODEL = os.getenv('OLLAMA_MODEL','phi3:instruct')

def chat_once(prompt, history):
    msgs = [{'role':'system','content':'You are a calm, supportive assistant.'}] + history + [{'role':'user','content':prompt}]
    r = requests.post(f"{OLLAMA}/api/chat", json={'model': MODEL, 'messages': msgs, 'stream': False})
    return r.json()