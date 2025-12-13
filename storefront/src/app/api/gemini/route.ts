import { NextResponse } from 'next/server';

// Prioritize the server-side key, fallback to public if that's all that's available (though not recommended)
const apiKey = process.env.GEMINI_API_KEY?.trim();

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // 5 requests per minute

export async function POST(request: Request) {
    if (!apiKey) {
        console.error("Gemini API Key is missing on server.");
        return NextResponse.json(
            { error: 'Gemini API Key is missing configuration.' },
            { status: 500 }
        );
    }

    try {
        // Rate Limiting Logic
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();

        const timestamps = rateLimitMap.get(ip) || [];
        // Filter out timestamps older than the window
        const recentTimestamps = timestamps.filter(t => now - t < WINDOW_MS);

        if (recentTimestamps.length >= MAX_REQUESTS) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again in a minute.' },
                { status: 429 }
            );
        }

        // Add current timestamp and update map
        recentTimestamps.push(now);
        rateLimitMap.set(ip, recentTimestamps);

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
