import numpy as np
from scipy.io import wavfile
import io
import random

class BrainFMModulator:
    def __init__(self, sample_rate=44100):
        self.sample_rate = sample_rate

    def generate_sine_wave(self, freq, duration, phase=0):
        t = np.arange(int(duration * self.sample_rate)) / self.sample_rate
        return np.sin(2 * np.pi * freq * t + phase)

    def generate_pad_chord(self, root_freq, chord_type, duration):
        """
        Generates a rich ambient pad using additive synthesis.
        """
        # Define intervals for chords (ratios)
        intervals = {
            "major": [1, 5/4, 3/2, 2],       # Root, Major 3rd, Perfect 5th, Octave
            "minor": [1, 6/5, 3/2, 2],       # Root, Minor 3rd, Perfect 5th, Octave
            "sus2":  [1, 9/8, 3/2, 2],       # Root, Major 2nd, Perfect 5th, Octave
            "lydian": [1, 5/4, 3/2, 11/8],   # Root, Maj 3rd, Perf 5th, Sharp 4th (dreamy)
        }
        
        ratios = intervals.get(chord_type, intervals["major"])
        mixed_signal = np.zeros(int(duration * self.sample_rate))
        
        # Additive Synthesis: Stack sine waves for each note in chord
        for ratio in ratios:
            freq = root_freq * ratio
            # Detune oscillators for richness (Chorus effect)
            detune_amount = 0.005 # 0.5% detune
            
            # Oscillator 1 (Center)
            osc1 = self.generate_sine_wave(freq, duration)
            # Oscillator 2 (Left-ish/Detuned)
            osc2 = self.generate_sine_wave(freq * (1 - detune_amount), duration, phase=random.random())
            # Oscillator 3 (Right-ish/Detuned)
            osc3 = self.generate_sine_wave(freq * (1 + detune_amount), duration, phase=random.random())
            
            # Mix oscillators
            note_signal = (osc1 + 0.5 * osc2 + 0.5 * osc3) / 2.0
            mixed_signal += note_signal

        # Normalize
        mixed_signal = mixed_signal / np.max(np.abs(mixed_signal))
        
        # Apply Envelope (Attack/Release) to make it a "Pad"
        attack_time = 2.0 # seconds
        release_time = 2.0 # seconds
        total_samples = len(mixed_signal)
        attack_samples = int(attack_time * self.sample_rate)
        release_samples = int(release_time * self.sample_rate)
        
        envelope = np.ones(total_samples)
        # Attack fade in
        envelope[:attack_samples] = np.linspace(0, 1, attack_samples)
        # Release fade out
        envelope[-release_samples:] = np.linspace(1, 0, release_samples)
        
        return mixed_signal * envelope

    def generate_texture_layer(self, duration):
        """
        Generates a background texture (filtered noise) to simulate rain/wind.
        """
        samples = int(duration * self.sample_rate)
        # Brown noise (1/f^2) for deeper texture
        white = np.random.randn(samples)
        # Simple integration for brown noise
        brown = np.cumsum(white)
        brown = brown / np.max(np.abs(brown))
        
        # Low pass filter simulation (simple moving average)
        window_size = 50
        texture = np.convolve(brown, np.ones(window_size)/window_size, mode='same')
        return texture * 0.15 # Low volume

    def apply_neural_modulation(self, audio_data, target_freq, depth=0.5):
        """
        Applies Amplitude Modulation (AM) to the audio data at the target frequency.
        """
        t = np.arange(len(audio_data)) / self.sample_rate
        # AM formula: (1 + depth * sin(2 * pi * freq * t))
        modulation = 1 + depth * np.sin(2 * np.pi * target_freq * t)
        return audio_data * modulation

    def apply_3d_spatialization(self, audio_data, speed=0.1):
        """
        Simulates a simple 3D rocking effect by panning left/right.
        """
        t = np.arange(len(audio_data)) / self.sample_rate
        pan = np.sin(2 * np.pi * speed * t)
        theta = (pan + 1) * (np.pi / 4) 
        left_gain = np.cos(theta)
        right_gain = np.sin(theta)
        return np.column_stack((audio_data * left_gain, audio_data * right_gain))

    def generate_session(self, mode, duration_sec):
        """
        Generates a full musical session with chords and textures.
        """
        # 1. Compose Chord Progression based on Mode
        if mode == "focus":
            # Minor/Neutral, steady. Root A (220Hz)
            root = 220
            chords = ["minor", "sus2", "minor", "sus2"]
            chord_duration = 10 # seconds per chord
            target_freq = 14 # Beta
            mod_depth = 0.25 # Subtle
            
        elif mode == "relax":
            # Major/Lydian, dreamy. Root F (174.6Hz)
            root = 174.6
            chords = ["major", "lydian", "major", "sus2"]
            chord_duration = 15 # Slower changes
            target_freq = 10 # Alpha
            mod_depth = 0.35
            
        elif mode == "sleep":
            # Deep Drones. Root C (130.8Hz)
            root = 130.8
            chords = ["sus2", "minor", "sus2", "minor"]
            chord_duration = 20 # Very slow
            target_freq = 2 # Delta
            mod_depth = 0.5
            
        elif mode == "meditate":
            # Theta waves (6Hz), calming. Root D (146.8Hz)
            root = 146.8
            chords = ["major", "sus2", "lydian", "sus2"]
            chord_duration = 18 # Slow, meditative
            target_freq = 6 # Theta
            mod_depth = 0.4
            
        else:
            root = 220
            chords = ["major"]
            chord_duration = 10
            target_freq = 10
            mod_depth = 0.3

        # 2. Generate Audio Track
        total_samples = int(duration_sec * self.sample_rate)
        full_audio = np.zeros(total_samples)
        
        current_sample = 0
        chord_idx = 0
        
        while current_sample < total_samples:
            # Generate chord
            chord_type = chords[chord_idx % len(chords)]
            # Vary root slightly for progression (e.g., up a 5th then back)
            current_root = root * (1.5 if chord_idx % 4 == 2 else 1.0)
            
            chord_sig = self.generate_pad_chord(current_root, chord_type, chord_duration)
            
            # Crossfade into main buffer
            remaining = total_samples - current_sample
            chunk_len = min(len(chord_sig), remaining)
            
            # Simple overlap add (in a real engine, we'd crossfade properly)
            full_audio[current_sample:current_sample+chunk_len] += chord_sig[:chunk_len]
            
            current_sample += int(chunk_len * 0.8) # 20% overlap
            chord_idx += 1

        # Normalize
        full_audio = full_audio / np.max(np.abs(full_audio))
        
        # 3. Add Texture Layer (Rain/Wind)
        texture = self.generate_texture_layer(duration_sec)
        full_audio = full_audio * 0.8 + texture * 0.2
        
        # 4. Apply Neural Modulation
        modulated = self.apply_neural_modulation(full_audio, target_freq, mod_depth)
        
        # 5. Spatialization
        if mode == "sleep":
            final_audio = self.apply_3d_spatialization(modulated, speed=0.2)
        else:
            # Stereo wideness for others
            final_audio = np.column_stack((modulated, modulated))

        # Convert to 16-bit PCM
        final_audio_int16 = (final_audio * 32767).astype(np.int16)
        
        buffer = io.BytesIO()
        wavfile.write(buffer, self.sample_rate, final_audio_int16)
        buffer.seek(0)
        return buffer

engine = BrainFMModulator()
