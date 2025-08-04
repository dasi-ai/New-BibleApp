export type AppFeature = 'readBible' | 'search' | 'oldTestament' | 'newTestament' | 'dailyVerse' | 'readingPlans' | 'kidsStories' | 'missionaries';

export interface VerseInfo {
  verse: string;
  text: string;
  translation: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface BibleBook {
    name: string;
    chapters: number;
    testament: 'Old Testament' | 'New Testament';
}

export type ReadingPlanId = '1-year' | '6-month' | '3-month';

export interface DailyReading {
    day: number;
    reading: string;
}

export interface ReadingPlan {
    id: ReadingPlanId;
    name: string;
    description: string;
    plan: DailyReading[];
}

export type ReadingProgress = Record<ReadingPlanId, Record<number, boolean>>;

export interface KidsBibleStory {
  id: string;
  title: string;
  reference: string;
  summary: string[];
  lesson: string;
}

export interface Missionary {
  id: string;
  name: string;
  lifespan: string;
  bio: string[];
  focus: string;
}
