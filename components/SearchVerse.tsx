import React, { useState } from 'react';
import { searchByKeyword, searchByReference } from '../services/geminiService';
import type { VerseInfo } from '../types';

interface SearchVerseProps {
    LoadingSpinner: React.FC;
    ErrorDisplay: React.FC<{ message: string }>;
}

const VerseCard: React.FC<{ verse: VerseInfo }> = ({ verse }) => (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-sky-200/70 shadow-md animate-fade-in">
        <blockquote className="text-left">
            <p className="text-lg font-serif text-sky-800 leading-relaxed">"{verse.text}"</p>
            <footer className="mt-4 text-md font-semibold text-sky-600">{verse.verse} ({verse.translation})</footer>
        </blockquote>
    </div>
);

const SUGGESTED_KEYWORDS = ['Love', 'Peace', 'Anger', 'Depression', 'Fear', 'Patience', 'Pride', 'Joy', 'Loss', 'Happy', 'Hope', 'Temptation', 'Stress', 'Doubt', 'Jealousy', 'Healing', 'Anxiety'];

const SearchVerse: React.FC<SearchVerseProps> = ({ LoadingSpinner, ErrorDisplay }) => {
    const [searchMode, setSearchMode] = useState<'keyword' | 'reference'>('keyword');
    const [keyword, setKeyword] = useState('peace');
    const [reference, setReference] = useState('John 3:16');
    const [translation, setTranslation] = useState('KJV');
    const [verses, setVerses] = useState<VerseInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performSearch = async (mode: 'keyword' | 'reference', term: string, trans: string) => {
        if (!term.trim()) {
            setError(`Please enter a ${mode}.`);
            return;
        }

        setLoading(true);
        setError(null);
        setVerses([]);
        try {
            const result = mode === 'keyword'
                ? await searchByKeyword(term, trans)
                : await searchByReference(term, trans);
            
            if (result.length === 0) {
                 setError("No verses found for your query. Please try different terms or check your reference.");
            }
            setVerses(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const term = searchMode === 'keyword' ? keyword : reference;
        performSearch(searchMode, term, translation);
    };

    const handleSuggestionClick = (suggestedKeyword: string) => {
        setKeyword(suggestedKeyword);
        performSearch('keyword', suggestedKeyword, translation);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200">
                <div className="flex bg-sky-100 rounded-lg p-1 mb-4">
                    <button type="button" onClick={() => setSearchMode('keyword')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all ${searchMode === 'keyword' ? 'bg-white text-sky-700 shadow' : 'text-sky-600 hover:bg-sky-200/50'}`}>
                        Search by Keyword
                    </button>
                    <button type="button" onClick={() => setSearchMode('reference')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all ${searchMode === 'reference' ? 'bg-white text-sky-700 shadow' : 'text-sky-600 hover:bg-sky-200/50'}`}>
                        Search by Reference
                    </button>
                </div>

                <div className="space-y-4 mb-4">
                    {searchMode === 'keyword' ? (
                        <div>
                            <label htmlFor="keyword" className="block text-sm font-medium text-sky-700 mb-1">Keyword</label>
                            <input
                                type="text"
                                id="keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full bg-sky-100/50 border border-sky-300 rounded-md shadow-sm py-2 px-3 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="e.g., peace, love, faith"
                            />
                             <div className="mt-3 flex flex-wrap gap-2">
                                {SUGGESTED_KEYWORDS.map((k) => (
                                    <button
                                        type="button"
                                        key={k}
                                        onClick={() => handleSuggestionClick(k)}
                                        className="bg-sky-200/50 text-sky-700 px-3 py-1 text-xs rounded-full hover:bg-sky-200 hover:text-sky-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white"
                                    >
                                        {k}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div>
                            <label htmlFor="reference" className="block text-sm font-medium text-sky-700 mb-1">Reference</label>
                            <input
                                type="text"
                                id="reference"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                className="w-full bg-sky-100/50 border border-sky-300 rounded-md shadow-sm py-2 px-3 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="e.g., John 3:16 or Genesis 1"
                            />
                        </div>
                    )}
                     <div>
                        <label htmlFor="translation-search" className="block text-sm font-medium text-sky-700 mb-1">Translation</label>
                        <select
                            id="translation-search"
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
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="mt-6">
                {loading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
                {verses.length > 0 && (
                    <div className="space-y-4">
                        {verses.map((verse) => <VerseCard key={verse.verse} verse={verse} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchVerse;