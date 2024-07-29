import speech_recognition as sr

class speak:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.words = ""
        self.confirm = ["yes", "yea", "yuh"]
    
    def listen(self):
        listening = True
        while listening:
            try:
                with sr.Microphone() as mic:
                    print("Calibrating for ambient noise, please wait...")
                    self.recognizer.adjust_for_ambient_noise(mic, duration=0.7)
                    
                    self.recognizer.pause_threshold = 0.5
                    
                    print("Listening...")
                    audio = self.recognizer.listen(mic)
                    
                    text = self.recognizer.recognize_google(audio_data=audio)
                    text = text.lower()
                    self.words += f"{text}. "
                    
                    print("Do you want to say more?")
                    
                    say_more = self.recognizer.listen(mic)
                    sm_text = self.recognizer.recognize_google(audio_data=say_more)
                    
                    listening = sm_text.lower() in self.confirm
            
            except sr.UnknownValueError:
                print("Let's try again..")
                self.recognizer = sr.Recognizer()
                continue
        
        return self.words

# Example usage:
if __name__ == "__main__":
    speech_to_text = speak()
    words = speech_to_text.listen()
    print(words)
