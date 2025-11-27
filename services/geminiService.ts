import { GoogleGenAI } from "@google/genai";
import { Vulnerability } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRemediation = async (vuln: Vulnerability): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a senior cybersecurity engineer specializing in Web3 security.
      A developer asks for remediation steps for the following vulnerability:
      
      Vulnerability: ${vuln.title}
      Context: ${vuln.fullDesc}
      Real World Case: ${vuln.realWorldCase.name}

      Provide a concise, actionable checklist (markdown format) of technical controls to prevent this. 
      Focus on Web2 defenses (CSP, SRI, CI/CD checks) that protect Web3 assets.
      Keep it under 200 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "No remediation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI analysis service. Please check your API configuration.";
  }
};

export const generateSimulation = async (vulnTitle: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
          Write a short, dramatic, second-person narrative (like a text adventure) describing how a user falls victim to ${vulnTitle}.
          Keep it to 3 sentences. Make it visceral.
        `;
    
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
    
        return response.text || "Simulation unavailable.";
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "Simulation unavailable.";
      }
}