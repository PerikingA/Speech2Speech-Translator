from flask import Flask, request, jsonify
import base64
import os
import tempfile
from pydub import AudioSegment
from translate import translator
from flask_cors import CORS
from gtts import gTTS
from googletrans import Translator
import whisper
import numpy as np
import soundfile as sf
import librosa

app = Flask(__name__)
CORS(app)
# logging.basicConfig(level=logging.DEBUG)

@app.route('/translate', methods=['POST'])
def handle_translation():
    if 'speech_input' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    if 'outgoing_language' not in request.form:
        return jsonify({"error": "No language provided"}), 400

    audio_file = request.files['speech_input']
    outgoing_language = request.form['outgoing_language']
    
    try:
        # Save the original webm file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp_webm:
            audio_file.save(tmp_webm.name)
            tmp_webm_path = tmp_webm.name
            # logging.debug(f"Temporary WEBM file saved at: {tmp_webm_path}")

        # Convert webm to wav using pydub
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_wav:
            audio = AudioSegment.from_file(tmp_webm_path, format='webm')
            audio.export(tmp_wav.name, format='wav')
            tmp_wav_path = tmp_wav.name
            # logging.debug(f"Temporary WAV file saved at: {tmp_wav_path}")

        # Inspect the converted wav file
        # audio_segment = AudioSegment.from_wav(tmp_wav_path)
        # logging.debug(f"Loaded WAV file duration: {audio_segment.duration_seconds} seconds")
        # logging.debug(f"Loaded WAV file frame rate: {audio_segment.frame_rate}")

        # Process the file using the translator function
        mp3_output = translator(tmp_wav_path, outgoing_language)

        # Delete temporary files
        # os.remove(tmp_webm_path)
        os.remove(tmp_wav_path)

        # Return the audio as base64
        audio_data = base64.b64encode(mp3_output).decode('utf-8')

        return jsonify({"speech_output": f"data:audio/mp3;base64,{audio_data}"})
    
    except Exception as e:
        # traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
