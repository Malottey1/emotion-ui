# server/emotion.py
import base64, io, numpy as np
from PIL import Image
from fer import FER

class EmotionEngine:
    def __init__(self):
        self.detector = FER(mtcnn=True)
        self.alpha = 0.6
        self.ema = None
    def infer_from_b64(self, data_url):
        img_b64 = data_url.split(',')[1]
        arr = np.array(Image.open(io.BytesIO(base64.b64decode(img_b64))))
        preds = self.detector.detect_emotions(arr)
        if not preds:
            return { 'label':'neutral', 'probs':{} }
        probs = preds[0]['emotions']
        if self.ema is None:
            self.ema = probs
        else:
            self.ema = {k: self.alpha*probs[k] + (1-self.alpha)*self.ema[k] for k in probs}
        label = max(self.ema, key=self.ema.get)
        return { 'label': label, 'probs': self.ema }