import { useState, useEffect, useCallback } from 'react';
import type { ReadingPlanId, ReadingProgress } from '../types';
import { READING_PLANS } from '../data/readingPlans';

const STORAGE_KEY = 'bibleAppReadingProgress';

const getInitialProgress = (): ReadingProgress => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error("Could not parse reading progress from localStorage", error);
    }
    // Return a default structure if nothing is saved or parsing fails
    return {
        '1-year': {},
        '6-month': {},
        '3-month': {},
    };
};

export const useReadingProgress = (planId: ReadingPlanId) => {
    const [allProgress, setAllProgress] = useState<ReadingProgress>(getInitialProgress);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
        } catch (error) {
            console.error("Could not save reading progress to localStorage", error);
        }
    }, [allProgress]);

    const progress = allProgress[planId] || {};

    const toggleDay = (day: number) => {
        setAllProgress(prev => {
            const newPlanProgress = { ...prev[planId] };
            newPlanProgress[day] = !newPlanProgress[day];
            return {
                ...prev,
                [planId]: newPlanProgress,
            };
        });
    };

    const getPlanProgress = useCallback(() => {
        const plan = READING_PLANS.find(p => p.id === planId);
        if (!plan) return 0;

        const completedDays = Object.values(progress).filter(Boolean).length;
        return (completedDays / plan.plan.length) * 100;
    }, [planId, progress]);


    return { progress, toggleDay, getPlanProgress };
};
