import { ImageResponse } from 'next/og';

export const alt = 'LUXIVE - Premium Luxury E-commerce';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(180deg, #0f0e0c 0%, #15120f 100%)',
                    fontFamily: 'serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 24,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 96,
                            height: 96,
                            borderRadius: 18,
                            background: 'linear-gradient(135deg, #FCD34D 0%, #EAB308 50%, #FCD34D 100%)',
                            color: '#12100d',
                            fontSize: 44,
                            fontWeight: 700,
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        LX
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 96,
                            letterSpacing: 8,
                            color: '#f7f0e4',
                        }}
                    >
                        LUXIVE
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 28,
                        fontSize: 30,
                        letterSpacing: 4,
                        textTransform: 'uppercase',
                        color: '#d4b45f',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    Curated Luxury
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        fontSize: 24,
                        color: '#b6aa98',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    Authentic Sneakers · Luxury Fashion · Premium Perfumes
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
