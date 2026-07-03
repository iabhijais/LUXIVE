import { NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // 5 requests per minute
const MAX_PROMPT_LENGTH = 8000;

const getClientIp = (request: Request) => {
    const forwardedFor = request.headers.get('x-forwarded-for');
    return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
};

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
        console.error("Gemini API Key is missing on server.");
        return NextResponse.json(
            { error: 'Gemini API Key is missing configuration.' },
            { status: 500 }
        );
    }

    try {
        // Rate Limiting Logic
        const ip = getClientIp(request);
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

        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { error: 'Invalid JSON body' },
                { status: 400 }
            );
        }

        const { prompt, systemInstruction } = body;

        if (typeof prompt !== 'string' || !prompt.trim()) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        if (prompt.length > MAX_PROMPT_LENGTH) {
            return NextResponse.json(
                { error: 'Prompt is too long' },
                { status: 400 }
            );
        }

        // Keep the model configurable so quota/model availability can be adjusted without redeploying code.
        // We prepend the system instruction to the prompt to ensure maximum compatibility across model versions.
        const safeSystemInstruction = typeof systemInstruction === 'string' ? systemInstruction : '';
        const finalPrompt = safeSystemInstruction ? `${safeSystemInstruction}\n\nUser Request: ${prompt}` : prompt;
        const model = process.env.GEMINI_MODEL?.trim() || 'gemini-flash-lite-latest';

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
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
                { error: 'Gemini is temporarily unavailable. Please try again shortly.' },
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
