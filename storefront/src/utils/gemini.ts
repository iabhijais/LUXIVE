export const callGemini = async (prompt: string, systemInstruction = "") => {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, systemInstruction }),
        });

        if (!response.ok) {
            console.warn(`Gemini API Route error: ${response.status}`);
            return "Sorry, I'm having trouble connecting to the luxury network right now. Please try again later.";
        }

        const data = await response.json();

        if (data.error) {
            console.warn("Gemini API Error:", data.error);
            return `Debug Error: ${data.error}`;
        }

        return data.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini Client Error:", error);
        return "Sorry, I'm having trouble connecting to the luxury network right now. Please try again later.";
    }
};
