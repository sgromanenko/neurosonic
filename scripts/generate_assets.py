import sys
import os
import time

# Add project root to path so we can import backend modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.services.audio_engine import engine
from scipy.io import wavfile
import numpy as np

OUTPUT_DIR = os.path.join("backend", "static", "audio")
DURATION = 60 # Generate 60 seconds for demo (in real app, 10-30 mins)

def generate_track(filename, mode):
    print(f"Generating {filename} ({mode})...")
    start_time = time.time()
    
    # Generate audio buffer
    buffer = engine.generate_session(mode, DURATION)
    
    # Save to file
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(buffer.getvalue())
        
    elapsed = time.time() - start_time
    print(f"Done! Saved to {filepath} in {elapsed:.2f}s")

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Starting asset generation for {DURATION}s tracks...")
    
    generate_track("focus_1.wav", "focus")
    generate_track("relax_1.wav", "relax")
    generate_track("meditate_1.wav", "meditate")
    generate_track("sleep_1.wav", "sleep")
    
    print("All assets generated successfully.")
