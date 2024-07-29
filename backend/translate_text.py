from googletrans import Translator

def translate_text(text, src_lang='en', dest_lang='es'):
    
    if not src_lang or not text:
        return "No info", dest_lang
    
    translator = Translator()
    translation = translator.translate(text, src=src_lang, dest=dest_lang)
    # print("translated text: " + translation.text)
    return translation.text, translation.dest

if __name__ == "__main__":
    text = "this is a test i am running"
    translated_text, dest_lang = translate_text(text)
    print(f"Original Text: {text}")
    print(f"Translated Text: {translated_text}")
