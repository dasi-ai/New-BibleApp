import React, { useState, useEffect } from 'react';
import { getBibleBooks } from '../services/geminiService';
import type { BibleBook } from '../types';

interface ListBooksProps {
    LoadingSpinner: React.FC;
    ErrorDisplay: React.FC<{ message: string }>;
}

const ListBooks: React.FC<ListBooksProps> = ({ LoadingSpinner, ErrorDisplay }) => {
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getBibleBooks();
            setBooks(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const oldTestament = books.filter(b => b.testament === 'Old Testament');
    const newTestament = books.filter(b => b.testament === 'New Testament');

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200">
                <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Books of the Bible (KJV)</h2>
                
                {loading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
                
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
                        <div>
                            <h3 className="text-2xl font-semibold text-sky-600 border-b-2 border-sky-200 pb-2 mb-3">Old Testament</h3>
                            <ul className="space-y-1 text-sky-800 columns-2">
                                {oldTestament.map((book) => (
                                    <li key={book.name} className="flex justify-between p-1 rounded hover:bg-sky-100 break-inside-avoid-column">
                                        <span>{book.name}</span>
                                        <span className="text-sky-600">{book.chapters}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-sky-600 border-b-2 border-sky-200 pb-2 mb-3">New Testament</h3>
                            <ul className="space-y-1 text-sky-800 columns-2">
                                 {newTestament.map((book) => (
                                    <li key={book.name} className="flex justify-between p-1 rounded hover:bg-sky-100 break-inside-avoid-column">
                                        <span>{book.name}</span>
                                        <span className="text-sky-600">{book.chapters}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                 <button onClick={fetchBooks} disabled={loading} className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 disabled:bg-sky-400/80 disabled:cursor-not-allowed transition-colors">
                    {loading ? 'Refreshing...' : 'Refresh List'}
                </button>
            </div>
        </div>
    );
};

export default ListBooks;