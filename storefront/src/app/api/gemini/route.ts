import { NextResponse } from 'next/server';

// Prioritize the server-side key, fallback to public if that's all that's available (though not recommended)
const apiKey = process.env.GEMINI_API_KEY?.trim();

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

        // Use gemini-2.0-flash-001 as it is the current standard.
        // We prepend the system instruction to the prompt to ensure maximum compatibility across model versions.
        const finalPrompt = systemInstruction ? `${systemInstruction}\n\nUser Request: ${prompt}` : prompt;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: finalPrompt }] }],
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API HTTP error! status: ${response.status}, body: ${errorText}`);
            return NextResponse.json(
                { error: `Gemini Upstream Error: ${response.status} - ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Gemini API Route Error:", error);
        return NextResponse.json(
            { error: `Server Error: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}
