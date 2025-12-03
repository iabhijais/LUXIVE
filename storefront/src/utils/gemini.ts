export const callGemini = async (prompt: string, systemInstruction = "") => {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, systemInstruction }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            console.warn(`Gemini API Error: ${response.status}`, data.error);
            return `Debug Error: ${data.error || response.statusText}`;
        }

        return data.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini Client Error:", error);
        return "Sorry, I'm having trouble connecting to the luxury network right now. Please try again later.";
    }
};
