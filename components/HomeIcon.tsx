import React from 'react';

const HomeIcon: React.FC = () => (
    <div className="relative flex items-center justify-center w-48 h-48 group">
        {/* Glowing Aura */}
        <div className="absolute w-48 h-48 bg-amber-300/30 rounded-full blur-2xl animate-pulse transition-all duration-500 group-hover:scale-110"></div>
        <div className="absolute w-32 h-32 bg-sky-300/40 rounded-full blur-2xl animate-pulse delay-300 transition-all duration-500 group-hover:scale-110"></div>
        <div className="absolute w-40 h-40 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-500 group-hover:scale-110"></div>

        {/* Bible SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-36 h-36 text-sky-700/80 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>

        {/* Praying Hands Emoji */}
        <span className="text-6xl relative drop-shadow-lg transition-transform duration-500 group-hover:scale-110">🙏</span>
    </div>
);

export default HomeIcon;
