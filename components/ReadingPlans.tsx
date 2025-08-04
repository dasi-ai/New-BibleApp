import React, { useState, useMemo } from 'react';
import { READING_PLANS } from '../data/readingPlans';
import type { ReadingPlan, ReadingPlanId, DailyReading } from '../types';
import { useReadingProgress } from '../hooks/useReadingProgress';

const PlanDetail: React.FC<{ plan: ReadingPlan; onBack: () => void; }> = ({ plan, onBack }) => {
    const { progress, toggleDay, getPlanProgress } = useReadingProgress(plan.id);
    const progressPercent = getPlanProgress();

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-sky-700">{plan.name}</h2>
                        <p className="text-sky-600 mt-1">{plan.description}</p>
                    </div>
                    <button onClick={onBack} className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                        &larr; Change Plan
                    </button>
                </div>
                
                <div className="my-6">
                    <div className="flex justify-between text-sm font-medium text-sky-700 mb-1">
                       <span>Progress</span>
                       <span>{progressPercent.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-sky-200 rounded-full h-2.5">
                        <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                    {plan.plan.map((item: DailyReading) => (
                         <label
                            key={item.day}
                            className={`flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer ${progress[item.day] ? 'bg-sky-100 border-sky-300' : 'bg-white/50 border-sky-200 hover:bg-sky-50'}`}
                        >
                            <input
                                type="checkbox"
                                checked={!!progress[item.day]}
                                onChange={() => toggleDay(item.day)}
                                className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            />
                            <div className="flex-1 flex justify-between items-center">
                                <span className={`font-semibold ${progress[item.day] ? 'text-sky-800' : 'text-sky-700'}`}>
                                    Day {item.day}
                                </span>
                                 <span className={`text-right ${progress[item.day] ? 'text-sky-600 line-through' : 'text-sky-800'}`}>
                                    {item.reading}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};


const ReadingPlans: React.FC = () => {
    const [selectedPlanId, setSelectedPlanId] = useState<ReadingPlanId | null>(null);

    const handleSelectPlan = (id: ReadingPlanId) => {
        setSelectedPlanId(id);
    };
    
    const handleBack = () => {
        setSelectedPlanId(null);
    }

    const selectedPlan = useMemo(() => {
        if (!selectedPlanId) return null;
        return READING_PLANS.find(p => p.id === selectedPlanId);
    }, [selectedPlanId]);

    if (selectedPlan) {
        return <PlanDetail plan={selectedPlan} onBack={handleBack} />;
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Bible Reading Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {READING_PLANS.map((plan) => (
                    <div key={plan.id} className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-sky-200 flex flex-col">
                        <h3 className="text-2xl font-bold text-sky-700">{plan.name}</h3>
                        <p className="text-sky-600 mt-2 flex-grow">{plan.description}</p>
                        <button
                            onClick={() => handleSelectPlan(plan.id)}
                            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500"
                        >
                            Select Plan
                        </button>
                    </div>
                ))}
            </div>
            <p className="text-center text-sm text-sky-600 mt-8">
                Your progress is saved automatically in your browser.
            </p>
        </div>
    );
};

export default ReadingPlans;
