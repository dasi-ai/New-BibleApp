import React, { useState, useEffect } from 'react';
import { getBibleBooks } from '../services/geminiService';
import type { BibleBook } from '../types';

interface NewTestamentProps {
    LoadingSpinner: React.FC;
    ErrorDisplay: React.FC<{ message: string }>;
}

const NewTestament: React.FC<NewTestamentProps> = ({ LoadingSpinner, ErrorDisplay }) => {
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getBibleBooks();
                setBooks(result.filter(b => b.testament === 'New Testament'));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200">
                <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">New Testament Books</h2>
                {loading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
                {!loading && !error && (
                    <div className="animate-fade-in">
                         <ul className="space-y-1 text-sky-800 columns-1 sm:columns-2 md:columns-3">
                            {books.map((book) => (
                                <li key={book.name} className="flex justify-between p-2 rounded-md hover:bg-sky-100 break-inside-avoid-column">
                                    <span>{book.name}</span>
                                    <span className="text-sky-600 font-medium">{book.chapters}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewTestament;