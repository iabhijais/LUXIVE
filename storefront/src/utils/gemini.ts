const apiKey = process.env.NEXT_PUBLIC_GEMINI_ID || "AIzaSyDfDZ2xV5SWtDZ0WtqqOTVrBJekd4sU3vI"; // API Key injected at runtime

export const callGemini = async (prompt: string, systemInstruction = "") => {
    if (!apiKey) {
        console.warn("Gemini API Key is missing. Returning mock response.");
        return "I can't connect to the fashion network right now (API Key missing), but I think this would look great with a monochrome outfit!";
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I'm having trouble connecting to the luxury network right now. Please try again later.";
    }
};
