"use client"
import { useState } from 'react';

interface AvatarResponse {
    avatar_id: string;
    avatar_url: string;
    status: string;
}

export default function HeygenAvatar() {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<AvatarResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateAvatar = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text to generate an avatar');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setAvatar(data);
        } catch (err) {
            setError(`Failed to generate avatar: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
            <h2 className="text-xl font-bold">Generate Interactive Avatar</h2>

            <textarea
                className="border rounded p-2 h-32"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text for your avatar to speak..."
            />

            <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                onClick={generateAvatar}
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate Avatar'}
            </button>

            {error && <p className="text-red-500">{error}</p>}

            {avatar && (
                <div className="mt-4 border rounded p-4">
                    <h3 className="font-semibold mb-2">Your Avatar</h3>
                    {avatar.status === 'completed' ? (
                        <div className="aspect-video">
                            <iframe
                                src={avatar.avatar_url}
                                className="w-full h-full border-0"
                                allow="camera; microphone; autoplay; clipboard-write; encrypted-media;"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <p>Avatar generation in progress: {avatar.status}</p>
                    )}
                </div>
            )}
        </div>
    );
}