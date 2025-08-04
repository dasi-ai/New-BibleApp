import React from 'react';
import type { AppFeature } from './types';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ReadBibleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const OldTestamentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 4v16l-3 -2l-3 2v-16l3 -2l3 2z" />
      <path d="M15 4v16l-3 -2l-3 2v-16l3 -2l3 2z" />
    </svg>
);

const NewTestamentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
      <path d="M19 16h-12" />
      <path d="M12 4v16" />
       <path d="M16 7.5l-4 4" />
      <path d="M12 7.5l4 4" />
    </svg>
);

const DailyVerseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
);

const ReadingPlansIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17.5 21h-11.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h11.5a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2z" />
        <path d="M12 3v18" />
        <path d="M9 7h-2" />
        <path d="M9 12h-2" />
        <path d="M9 17h-2" />
        <path d="M15 7h2" />
        <path d="M15 12h2" />
        <path d="M15 17h2" />
    </svg>
);

const KidsStoriesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3.5 3h17a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1 -1.5 1.5h-17a1.5 1.5 0 0 1 -1.5 -1.5v-15a1.5 1.5 0 0 1 1.5 -1.5" />
        <path d="M8 3v18" />
        <path d="M12.5 16h-2.5a1.5 1.5 0 0 1 0 -3h2.5v-3.5a1.5 1.5 0 0 1 3 0v3.5h2.5a1.5 1.5 0 0 1 0 3h-2.5" />
    </svg>
);

const MissionaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M14.5 14.5l-2.5 -2.5l-2.5 5l5 -2.5z" />
      <path d="M12 3l0 2" />
      <path d="M12 19l0 2" />
      <path d="M3 12l2 0" />
      <path d="M19 12l2 0" />
    </svg>
);

export const FEATURES: { id: AppFeature; name: string; icon: React.ReactNode }[] = [
    { id: 'dailyVerse', name: 'Daily Verse', icon: <DailyVerseIcon /> },
    { id: 'search', name: 'Search Verses', icon: <SearchIcon /> },
    { id: 'readingPlans', name: 'Reading Plans', icon: <ReadingPlansIcon /> },
    { id: 'kidsStories', name: 'Kids Stories', icon: <KidsStoriesIcon /> },
    { id: 'missionaries', name: 'Inspiring Missionaries', icon: <MissionaryIcon /> },
    { id: 'readBible', name: 'Read Bible', icon: <ReadBibleIcon /> },
    { id: 'oldTestament', name: 'Old Testament', icon: <OldTestamentIcon /> },
    { id: 'newTestament', name: 'New Testament', icon: <NewTestamentIcon /> },
];