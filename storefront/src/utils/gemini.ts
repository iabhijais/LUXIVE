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

            const errorString = JSON.stringify(data.error || "");
            if (response.status === 429 || errorString.includes("quota") || errorString.includes("429")) {
                return "I'm currently assisting many clients. Please allow me a moment and try asking again in a few seconds. ✨";
            }

            return "My connection to the fashion archives is briefly interrupted. Please try again.";
        }

        return data.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini Client Error:", error);
        return "Sorry, I'm having trouble connecting to the luxury network right now. Please try again later.";
    }
};
