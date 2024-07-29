from text2speech import text_to_speech
from translate_text import translate_text
from speech2text import speech2text
import logging

# Configure logging
# logging.basicConfig(level=logging.DEBUG)

def translator(audio_file_path, outgoing_lang):
    s2t = speech2text()

    # Process the audio file to get text and language
    text1, incoming_lang = s2t.process(audio_file_path)
    # logging.debug(f"Transcribed text: {text1}")
    # logging.debug(f"Detected language: {incoming_lang}")


    # Translate the text
    translated_text, send_lang = translate_text(text1, incoming_lang, outgoing_lang)
    # logging.debug(f"Translated text: {translated_text}")
    # logging.debug(f"Send language: {send_lang}")


    # Convert the translated text to speech
    return text_to_speech(translated_text, send_lang)
