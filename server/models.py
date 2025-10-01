from pydantic import BaseModel, Field
from typing import Literal, Dict, Any
from datetime import datetime

EventType = Literal['emotion_tick','theme_change','chat']

class AnalyticsEvent(BaseModel):
sessionId: str
type: EventType
payload: Dict[str, Any] = {}
ts: datetime = Field(default_factory=datetime.utcnow)