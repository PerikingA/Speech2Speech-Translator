import warnings
warnings.filterwarnings("ignore", message="FP16 is not supported on CPU; using FP32 instead")

import whisper
import numpy as np
import soundfile as sf
import librosa

class speech2text:
    def __init__(self, sample_rate=16000):
        self.sample_rate = sample_rate
        self.model = whisper.load_model("base")
    
    def transcribe_audio(self, audio_file_path):
        # Load the provided audio file
        audio_data, sample_rate = sf.read(audio_file_path)
        # print(f"Loaded audio data shape: {audio_data.shape}, sample rate: {sample_rate}")
        
        # Ensure audio data is in the correct format
        if len(audio_data.shape) > 1:
            audio_data = audio_data.mean(axis=1)  # Convert to mono if stereo
        audio_data = np.array(audio_data, dtype=np.float32)
        
        # Resample audio if necessary
        if sample_rate != self.sample_rate:
            # print(f"Resampling from {sample_rate} to {self.sample_rate}")
            audio_data = librosa.resample(audio_data, orig_sr=sample_rate, target_sr=self.sample_rate)


        # Check the first few samples to ensure audio is loaded correctly
        # print(f"First few audio samples: {audio_data[:10]}")

        # Transcribe the audio data
        return self.model.transcribe(audio_data)
    
    def process(self, audio_file_path):
        result = self.transcribe_audio(audio_file_path)
        # print(f"Transcription result: {result}")

        # Return transcribed text and language
        transcribed_text = result.get('text', '')
        language = result.get('language', 'unknown')
        return transcribed_text, language

if __name__ == "__main__":
    audio_file_path = 'path_to_your_audio_file.wav'
    transcriber = speech2text(sample_rate=16000)
    text, lang = transcriber.process(audio_file_path)
    print(f'Transcribed Text: {text}')
    print(f'Detected Language: {lang}')
