import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import type { QuizQuestion } from '../types';

interface BibleQuizProps {
    LoadingSpinner: React.FC;
    ErrorDisplay: React.FC<{ message: string }>;
}

type QuizState = 'idle' | 'active' | 'finished';

const BibleQuiz: React.FC<BibleQuizProps> = ({ LoadingSpinner, ErrorDisplay }) => {
    const [book, setBook] = useState('Genesis');
    const [difficulty, setDifficulty] = useState('Easy');
    const [translation, setTranslation] = useState('KJV');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [score, setScore] = useState(0);
    const [quizState, setQuizState] = useState<QuizState>('idle');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setQuizState('idle');
        setQuestions([]);
        setUserAnswers({});
        try {
            const result = await generateQuiz(book, difficulty, translation);
            if(result.length === 0){
                setError("The AI could not generate a quiz for this selection. Please try different options.");
            } else {
                setQuestions(result);
                setQuizState('active');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmitQuiz = () => {
        let newScore = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setQuizState('finished');
    };

    const handleReset = () => {
        setQuizState('idle');
        setQuestions([]);
        setUserAnswers({});
        setScore(0);
        setError(null);
    }
    
    const getOptionClass = (questionIndex: number, option: string) => {
        if(quizState !== 'finished') return 'border-gray-600';
        const question = questions[questionIndex];
        const userAnswer = userAnswers[questionIndex];

        if(option === question.answer) return 'border-green-500 bg-green-500/20';
        if(option === userAnswer && option !== question.answer) return 'border-red-500 bg-red-500/20';
        return 'border-gray-600';
    }


    if (quizState === 'active' || quizState === 'finished') {
        return (
            <div className="w-full max-w-3xl mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">{book} Quiz ({translation})</h2>
                {questions.map((q, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-lg mb-4 border border-gray-700">
                        <p className="font-semibold text-lg text-gray-100 mb-4">{i + 1}. {q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((option, j) => (
                                <label key={j} className={`block w-full p-3 rounded-md border transition-colors cursor-pointer ${getOptionClass(i, option)}`}>
                                    <input
                                        type="radio"
                                        name={`question-${i}`}
                                        value={option}
                                        checked={userAnswers[i] === option}
                                        onChange={() => handleAnswerChange(i, option)}
                                        disabled={quizState === 'finished'}
                                        className="mr-3 accent-amber-500 disabled:accent-gray-500"
                                    />
                                    <span className={quizState === 'finished' && userAnswers[i] === option ? 'text-white' : 'text-gray-300'}>{option}</span>
                                </label>
                            ))}
                        </div>
                         {quizState === 'finished' && userAnswers[i] !== q.answer && (
                            <p className="text-sm mt-3 text-green-400">Correct answer: {q.answer}</p>
                        )}
                    </div>
                ))}
                
                {quizState === 'active' && (
                    <button onClick={handleSubmitQuiz} className="w-full py-3 px-4 font-semibold text-gray-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors">Submit Quiz</button>
                )}
                {quizState === 'finished' && (
                    <div className="text-center bg-gray-800 p-6 rounded-lg">
                        <p className="text-2xl font-bold text-white">Quiz Finished!</p>
                        <p className="text-4xl font-bold text-amber-400 my-2">{score} / {questions.length}</p>
                        <button onClick={handleReset} className="mt-4 py-2 px-6 font-semibold text-gray-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors">Take Another Quiz</button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleGenerateQuiz} className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <div>
                        <label htmlFor="book" className="block text-sm font-medium text-gray-300 mb-1">Book Name</label>
                        <input type="text" id="book" value={book} onChange={(e) => setBook(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., Genesis" />
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                     <div className="md:col-span-2">
                        <label htmlFor="translation-quiz" className="block text-sm font-medium text-gray-300 mb-1">Translation</label>
                         <select
                            id="translation-quiz"
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                           <option value="KJV">King James Version (KJV)</option>
                           <option value="WEB">World English Bible (WEB)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500 disabled:bg-amber-300/50 disabled:cursor-not-allowed transition-colors">
                    {loading ? 'Generating Quiz...' : 'Generate Quiz'}
                </button>
            </form>
             <div className="mt-6">
                {loading && <LoadingSpinner />}
                {error && <ErrorDisplay message={error} />}
            </div>
        </div>
    );
};

export default BibleQuiz;