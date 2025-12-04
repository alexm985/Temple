import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the API client
// Note: In a real production app, ensure this is behind a proxy or the key is restricted
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a wise, calm, and compassionate Hindu Priest (Pandit Ji). 
Your role is to guide devotees with spiritual knowledge, explain rituals (pooja), 
interpret mythology, and offer comforting advice based on Dharma and ancient scriptures (Vedas, Upanishads, Gita).
Keep your answers concise (under 100 words), respectful, and culturally accurate. 
Use a gentle, blessing-filled tone. 
If asked about medical or legal advice, politely decline and refer them to professionals.
Always end with a short blessing like "Om Shanti" or "Hari Om".
`;

export const sendMessageToPandit = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for the API
    // We map our ChatMessage type to the format expected by generateContent if we were doing a full chat session,
    // but for simplicity and state management in this demo, we'll use a single turn generation 
    // with the history prepended as context or use the Chat API.
    
    // Let's use the Chat API for better context management
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I apologize, I am in deep meditation. Please ask again later. Om Shanti.";
  } catch (error) {
    console.error("Error communicating with the divine grid:", error);
    return "The connection to the spiritual realm is currently faint. Please try again in a moment.";
  }
};