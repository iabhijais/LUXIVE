import { NextResponse } from 'next/server';

// Prioritize the server-side key, fallback to public if that's all that's available (though not recommended)
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
    if (!apiKey) {
        console.error("Gemini API Key is missing on server.");
        return NextResponse.json(
            { error: 'Gemini API Key is missing configuration.' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { prompt, systemInstruction } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemInstruction || "" }] },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API HTTP error! status: ${response.status}, body: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Gemini API Route Error:", error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
