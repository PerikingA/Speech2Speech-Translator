"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import useRecording from '../components/useRecording'; // Import the useRecording hook
import useSubmit from '../components/useSubmit'; // Ensure this hook is correctly defined
import { languages_gTTS } from '../components/languages'; // Ensure this dictionary is correctly exported

// Define AudioPlayer component directly in this file
const AudioPlayer: React.FC<{ audioUrl: string | null }> = ({ audioUrl }) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return audioUrl ? (
        <div className="audio-player">
            <audio ref={audioRef} src={audioUrl} />
            <button onClick={togglePlayPause} className="play-pause-button">
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    ) : null;
};

const HomePage: React.FC = () => {
    const { recording, startRecording, stopRecording, chunks, setChunks } = useRecording();
    const { audioUrl, submitAudio } = useSubmit();
    const [language, setLanguage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Filter languages based on search term
    const filteredLanguages = useMemo(() => {
        return Object.entries(languages_gTTS).filter(([name]) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (code: string, name: string) => {
        setLanguage(code);
        setSearchTerm(name); // Update the input with the selected language name
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleStartRecording = () => {
        setChunks([]); // Clear previous chunks
        startRecording();
    };

    const handleStopRecording = () => {
        stopRecording();
        // Process chunks after recording is stopped
        // const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // const audioUrl = URL.createObjectURL(audioBlob);
        // submitAudio([audioBlob], language);
    };

    const handleSubmit = () => {
        if (chunks.length > 0) {
            submitAudio(chunks, language);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <h1 className="mb-4 text-2xl font-bold">Welcome to the Speech Translator</h1>
                <p className="mb-4 text-lg">Select the language you want to translate to then hit Start Recording:</p>
                
                <div className="mb-4 text-center">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search language..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                                {filteredLanguages.length > 0 ? (
                                    filteredLanguages.map(([name, code]) => (
                                        <div
                                            key={code as string}
                                            onClick={() => handleLanguageChange(code, name)}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2">No languages found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                <button 
                    onClick={handleStartRecording} 
                    className={`mb-2 p-2 rounded text-white ${language ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'}`}
                    disabled={!language}
                >
                    {recording ? 'Recording...' : 'Start Recording'}
                </button>
                
                <button 
                    onClick={handleStopRecording} 
                    className={`mb-2 p-2 rounded text-white ${recording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                    disabled={!recording}
                >
                    Stop Recording
                </button>
                
                <button 
                    onClick={handleSubmit} 
                    className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
                
                <AudioPlayer audioUrl={audioUrl} />
            </div>
        </div>
    );
};

export default HomePage;
