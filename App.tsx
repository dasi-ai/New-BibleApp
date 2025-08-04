import React, { useState } from 'react';
import type { AppFeature } from './types';
import { FEATURES } from './constants';
import ListBooks from './components/ListBooks';
import SearchVerse from './components/SearchVerse';
import OldTestament from './components/OldTestament';
import NewTestament from './components/NewTestament';
import DailyVerse from './components/DailyVerse';
import ReadingPlans from './components/ReadingPlans';
import KidsBibleStories from './components/KidsBibleStories';
import Missionaries from './components/Missionaries';
import HomeIcon from './components/HomeIcon';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-800 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
    </div>
);

const App: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState<AppFeature | null>(null);

    const renderFeature = () => {
        const sharedProps = { LoadingSpinner, ErrorDisplay };
        switch (activeFeature) {
            case 'search':
                return <SearchVerse {...sharedProps} />;
            case 'readBible':
                return <ListBooks {...sharedProps} />;
            case 'oldTestament':
                return <OldTestament {...sharedProps} />;
            case 'newTestament':
                return <NewTestament {...sharedProps} />;
            case 'dailyVerse':
                return <DailyVerse {...sharedProps} />;
            case 'readingPlans':
                return <ReadingPlans />;
            case 'kidsStories':
                return <KidsBibleStories />;
            case 'missionaries':
                return <Missionaries />;
            default:
                return null;
        }
    };

    const handleBack = () => {
        setActiveFeature(null);
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative">
                {activeFeature === null ? (
                    // Home Screen View
                    <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full">
                        <HomeIcon />
                        <h1 className="text-4xl sm:text-5xl font-bold text-sky-800 tracking-tight mt-4 drop-shadow-[0_2px_10px_rgba(186,230,253,0.9)]">
                            Bible App
                        </h1>
                        <p className="mt-2 text-lg text-sky-700/90">Your AI-Powered Guide to the Scriptures</p>
                        
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
                            {FEATURES.map((feature) => (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveFeature(feature.id)}
                                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-sky-200/80 shadow-md hover:border-sky-400 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <div className="text-sky-600">{feature.icon}</div>
                                    <span className="font-semibold text-sky-800 text-xs sm:text-sm text-center">{feature.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Feature View
                    <div className="w-full animate-fade-in">
                         <div className="mb-6">
                            <button onClick={handleBack} className="flex items-center gap-2 text-sky-600 hover:text-sky-800 transition-colors font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Back to Home
                            </button>
                        </div>
                        {renderFeature()}
                    </div>
                )}
            </main>
            
            <footer className="text-center py-6 text-sky-600/80 text-sm relative">
                <p>Powered by Google Gemini. Using KJV and WEB public domain translations.</p>
            </footer>
        </div>
    );
};

export default App;