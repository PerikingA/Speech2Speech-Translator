from gtts import gTTS
import os
# import tempfile

def text_to_speech(text, lang=''):
    tts = gTTS(text=text, lang=lang, slow=False)

    # with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp:
    #     tts.save(tmp.name)
    #     tmp_path = tmp.name

    # with open(tmp_path, 'rb') as f:
    #     audio_data = f.read()

    mp3_path = "output.mp3"
    tts.save(mp3_path)

    with open(mp3_path, 'rb') as mp3_file:
        mp3_data = mp3_file.read()

    os.remove(mp3_path)  
    return mp3_data

if __name__ == "__main__":
    text = "sin esfuerzo para tus aplicaciones y proyectos."
    audio_data = text_to_speech(text, lang='es')
    with open("output.mp3", "wb") as f:
        f.write(audio_data)
