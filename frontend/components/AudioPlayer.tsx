import React from 'react';
import useRecording from './useRecording';
import LanguageSelector from './LanguageSelector';
import useSubmit from './useSubmit';

const AudioPlayer: React.FC = () => {
    const { recording, startRecording, stopRecording, chunks } = useRecording();
    const { audioUrl, submitAudio } = useSubmit();
    const [selectedLanguage, setSelectedLanguage] = React.useState<string>('');

    const handleSubmit = () => {
        if (chunks.length > 0) {
            submitAudio(chunks, selectedLanguage);
        }
    };

    return (
        <div>
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            <button onClick={handleSubmit} disabled={chunks.length === 0 || !selectedLanguage}>
                Submit
            </button>
            {audioUrl && (
                <audio controls>
                    <source src={audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioPlayer;
