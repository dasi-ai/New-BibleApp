import React, { useState } from 'react';
import { getDailyVerse } from '../services/geminiService';
import type { VerseInfo } from '../types';

interface DailyVerseProps {
    LoadingSpinner: React.FC;
    ErrorDisplay: React.FC<{ message: string }>;
}

const VerseCard: React.FC<{ verse: VerseInfo }> = ({ verse }) => (
    <div className="mt-6 bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-sky-200/70 shadow-lg animate-fade-in">
        <blockquote className="text-center">
            <p className="text-2xl font-serif text-sky-800 leading-relaxed">"{verse.text}"</p>
            <footer className="mt-4 text-lg font-semibold text-sky-600">{verse.verse} ({verse.translation})</footer>
        </blockquote>
    </div>
);

const DailyVerse: React.FC<DailyVerseProps> = ({ LoadingSpinner, ErrorDisplay }) => {
    const [translation, setTranslation] = useState('KJV');
    const [verse, setVerse] = useState<VerseInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setVerse(null);
        try {
            const result = await getDailyVerse(translation);
            setVerse(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200">
                <div className="space-y-4 mb-4">
                    <div>
                        <label htmlFor="translation" className="block text-sm font-medium text-sky-700 mb-1">Select a Translation</label>
                        <select
                            id="translation"
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                            className="w-full bg-sky-100/50 border border-sky-300 rounded-md shadow-sm py-2 px-3 text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                           <option value="KJV">King James Version (KJV)</option>
                           <option value="WEB">World English Bible (WEB)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 disabled:bg-sky-400/80 disabled:cursor-not-allowed transition-colors">
                    {loading ? 'Getting Verse...' : 'Get Daily Verse'}
                </button>
            </form>

            <div className="mt-6">
                {loading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
                {verse && <VerseCard verse={verse} />}
            </div>
        </div>
    );
};

export default DailyVerse;
