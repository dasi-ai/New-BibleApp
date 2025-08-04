import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { VerseInfo, QuizQuestion, BibleBook } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are a Bible assistant built into an app called "Bible App".
You will respond to user queries using only freely available and public domain Bible translations: the King James Version (KJV) and the World English Bible (WEB).
Do NOT use or mention translations that are not public domain like NIV, ESV, or NLT.
If a user asks for a translation that is not KJV or WEB, you must not fulfill the request and instead politely inform them that only KJV and WEB are supported in this app.
Always clearly label the translation used in your response.
Your responses must be in JSON format according to the provided schema.`;

const parseJsonResponse = <T,>(text: string): T => {
    try {
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("The AI returned a response that was not valid JSON.");
    }
}

export const getDailyVerse = async (translation: string): Promise<VerseInfo> => {
    const prompt = `Give me an uplifting or inspirational Bible verse from the ${translation} version.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    verse: { type: Type.STRING, description: "The Bible verse reference, e.g., John 3:16" },
                    text: { type: Type.STRING, description: "The full text of the Bible verse." },
                    translation: { type: Type.STRING, description: "The Bible translation used, either 'KJV' or 'WEB'." },
                },
                required: ["verse", "text", "translation"],
            },
        },
    });

    return parseJsonResponse<VerseInfo>(response.text);
};

export const generateQuiz = async (book: string, difficulty: string, translation: string): Promise<QuizQuestion[]> => {
    const prompt = `Generate 5 multiple choice Bible quiz questions from the book of ${book}, suitable for a ${difficulty} difficulty level, using the ${translation} version. Each question must have exactly 4 options. The 'answer' field must exactly match one of the strings in the 'options' array.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        answer: { type: Type.STRING },
                    },
                    required: ["question", "options", "answer"],
                },
            },
        },
    });
    
    return parseJsonResponse<QuizQuestion[]>(response.text);
};

export const getBibleBooks = async (): Promise<BibleBook[]> => {
    const prompt = `List all books of the Bible, separated by Old and New Testament, with the number of chapters in each. Use the KJV as the reference for book names and chapter counts.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        chapters: { type: Type.INTEGER },
                        testament: { type: Type.STRING, enum: ['Old Testament', 'New Testament'] },
                    },
                    required: ['name', 'chapters', 'testament'],
                },
            },
        },
    });
    return parseJsonResponse<BibleBook[]>(response.text);
};

export const searchByKeyword = async (keyword: string, translation: string): Promise<VerseInfo[]> => {
    const prompt = `Find several Bible verses from both the Old and New Testaments that contain the keyword "${keyword}". Use the ${translation} version. Return the results as an array.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                     type: Type.OBJECT,
                    properties: {
                        verse: { type: Type.STRING, description: "The Bible verse reference, e.g., John 14:27" },
                        text: { type: Type.STRING, description: "The full text of the Bible verse containing the keyword." },
                        translation: { type: Type.STRING, description: "The Bible translation used, either 'KJV' or 'WEB'." },
                    },
                    required: ["verse", "text", "translation"],
                }
            },
        },
    });

    return parseJsonResponse<VerseInfo[]>(response.text);
};

export const searchByReference = async (reference: string, translation: string): Promise<VerseInfo[]> => {
    const prompt = `Display the Bible verse or verses for the reference "${reference}" using the ${translation} version. If the reference is for a full chapter, return all verses in that chapter.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        verse: { type: Type.STRING, description: "The Bible verse reference, e.g., John 3:16" },
                        text: { type: Type.STRING, description: "The full text of the Bible verse." },
                        translation: { type: Type.STRING, description: "The Bible translation used, either 'KJV' or 'WEB'." },
                    },
                    required: ["verse", "text", "translation"],
                },
            },
        },
    });
    
    return parseJsonResponse<VerseInfo[]>(response.text);
};