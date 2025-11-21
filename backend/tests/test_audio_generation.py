import sys
import os
import numpy as np
from scipy.io import wavfile
from scipy.signal import hilbert

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.services.audio_engine import engine

def test_modulation_frequency(mode, expected_freq, tolerance=1.0):
    print(f"Testing {mode} mode (Expected: {expected_freq}Hz)...")
    
    # Generate 5 seconds of audio
    buffer = engine.generate_session(mode, duration_sec=5)
    rate, data = wavfile.read(buffer)
    
    # Convert to float normalized
    if data.dtype == np.int16:
        data = data.astype(np.float32) / 32767.0
    
    # Take left channel
    if len(data.shape) > 1:
        signal = data[:, 0]
    else:
        signal = data
        
    # Extract envelope using Hilbert transform
    analytic_signal = hilbert(signal)
    amplitude_envelope = np.abs(analytic_signal)
    
    # Remove DC component from envelope
    amplitude_envelope = amplitude_envelope - np.mean(amplitude_envelope)
    
    # FFT on envelope to find modulation frequency
    fft = np.fft.rfft(amplitude_envelope)
    freqs = np.fft.rfftfreq(len(amplitude_envelope), 1/rate)
    
    # Zero out DC and very low frequencies (spatialization artifacts < 0.5Hz)
    fft[freqs < 0.5] = 0
    
    # Find peak frequency in the envelope
    peak_idx = np.argmax(np.abs(fft))
    peak_freq = freqs[peak_idx]
    
    print(f"  Detected Modulation Frequency: {peak_freq:.2f} Hz")
    
    if abs(peak_freq - expected_freq) <= tolerance:
        print("  [PASS] Frequency within tolerance.")
        return True
    else:
        print(f"  [FAIL] Expected {expected_freq}Hz, got {peak_freq:.2f}Hz")
        return False

if __name__ == "__main__":
    results = []
    results.append(test_modulation_frequency("focus", 14.0)) # Beta
    results.append(test_modulation_frequency("relax", 10.0)) # Alpha
    results.append(test_modulation_frequency("sleep", 2.0))  # Delta
    results.append(test_modulation_frequency("meditate", 6.0)) # Theta
    
    if all(results):
        print("\nAll audio verification tests PASSED.")
        exit(0)
    else:
        print("\nSome tests FAILED.")
        exit(1)
