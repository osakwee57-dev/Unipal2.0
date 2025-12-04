import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  public startChat(userName: string, course: string) {
    this.chatSession = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are 'The Guru', a friendly, intelligent, and youth-friendly academic tutor for a Nigerian university student named ${userName} studying ${course}. 
        Use relatable language, occasionally use Nigerian student slang (like "Jackometer", "TDB", "Efiko") but keep it educational. 
        Help with explaining concepts, summarizing notes, and offering study tips. 
        Format responses clearly with bullet points where necessary.`,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error("Chat session not initialized");
    }

    try {
      const response: GenerateContentResponse = await this.chatSession.sendMessage({
        message: message,
      });
      return response.text || "Sorry, I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Omo, network or server issues. Try again later!";
    }
  }
}

export const geminiService = new GeminiService();