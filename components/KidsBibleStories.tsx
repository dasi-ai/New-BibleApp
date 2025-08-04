import React, { useState } from 'react';
import { KIDS_BIBLE_STORIES } from '../data/kidsStories';
import type { KidsBibleStory } from '../types';

const AccordionItem: React.FC<{
  story: KidsBibleStory;
  isOpen: boolean;
  onClick: () => void;
}> = ({ story, isOpen, onClick }) => {
  return (
    <div className="border-b border-sky-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-4 hover:bg-sky-50/50 transition-colors duration-200"
      >
        <span className="font-semibold text-lg text-sky-700">{story.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-sky-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 bg-sky-50/70">
            <p className="text-sm text-sky-600 font-medium mb-4 italic">({story.reference})</p>
            <div className="space-y-4 text-sky-800 leading-relaxed font-serif">
                {story.summary.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="mt-6 border-t border-sky-200 pt-4">
                <h4 className="font-semibold text-sky-700 mb-2">What we can learn:</h4>
                <p className="text-sky-800">{story.lesson}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KidsBibleStories: React.FC = () => {
    const [openStoryId, setOpenStoryId] = useState<string | null>(KIDS_BIBLE_STORIES[0]?.id || null);

    const handleToggle = (id: string) => {
        setOpenStoryId(openStoryId === id ? null : id);
    };

    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Kids Bible Stories</h2>
            <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg border border-sky-200 overflow-hidden">
                {KIDS_BIBLE_STORIES.map(story => (
                    <AccordionItem
                        key={story.id}
                        story={story}
                        isOpen={openStoryId === story.id}
                        onClick={() => handleToggle(story.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default KidsBibleStories;
