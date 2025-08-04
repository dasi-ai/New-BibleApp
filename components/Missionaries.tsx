import React from 'react';
import { MISSIONARIES } from '../data/missionaries';
import type { Missionary } from '../types';

const MissionaryCard: React.FC<{ missionary: Missionary }> = ({ missionary }) => (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-sky-700">{missionary.name}</h3>
        <p className="text-sm font-medium text-sky-600 mb-3">{missionary.lifespan}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 mb-4">{missionary.focus}</p>
        <div className="text-sky-800 space-y-3 flex-grow font-serif">
            {missionary.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
    </div>
);

const Missionaries: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-sky-700 mb-8 text-center">Inspiring Missionaries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MISSIONARIES.map((missionary) => (
                    <MissionaryCard key={missionary.id} missionary={missionary} />
                ))}
            </div>
        </div>
    );
};

export default Missionaries;
