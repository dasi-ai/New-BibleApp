import React from 'react';

const Favorites: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 text-center">
                <h2 className="text-3xl font-bold text-amber-400 mb-4">Favorites</h2>
                <p className="text-gray-300 text-lg">
                    This feature is coming soon! You'll be able to save your favorite verses here.
                </p>
            </div>
        </div>
    );
};

export default Favorites;