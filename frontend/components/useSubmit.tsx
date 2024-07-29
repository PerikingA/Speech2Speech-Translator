import { useState } from 'react';

const useSubmit = () => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const submitAudio = async (chunks: Blob[], selectedLanguage: string) => {
        if (chunks.length === 0) {
            console.error('No audio chunks available');
            return;
        }

        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        console.log('Audio Blob size:', audioBlob.size);

        const formData = new FormData();
        formData.append('speech_input', audioBlob, 'audio.wav');
        formData.append('outgoing_language', selectedLanguage);

        try {
            const res = await fetch('http://localhost:5000/translate', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                setAudioUrl(data.speech_output);
            }
        } catch (error) {
            console.error('Error fetching translation:', error);
        }
    };

    return { audioUrl, submitAudio };
};

export default useSubmit;
