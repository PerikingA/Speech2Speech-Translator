import { useState, useRef } from 'react';

const useRecording = () => {
    const [recording, setRecording] = useState(false);
    const [chunks, setChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Media devices API not supported.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            setRecording(false);
        }
    };

    return { recording, startRecording, stopRecording, chunks, setChunks };
};

export default useRecording;
