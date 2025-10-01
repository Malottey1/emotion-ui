import os
from motor.motor_asyncio import AsyncIOMotorClient

_client = None

def get_db():
global _client
if not _client:
_client = AsyncIOMotorClient(os.environ['DB_URI'])
return _client[os.environ.get('DB_NAME','emotion_ui')]