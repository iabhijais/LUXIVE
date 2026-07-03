
"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    title: string;
}

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
    // Determine the type of media (image or video)
    const isVideo = (url: string) => /\.(mp4|mov|webm)$/i.test(url);

    // Ensure we start with a valid image if possible, otherwise just the first item
    const [selectedMedia, setSelectedMedia] = useState(images[0] || "");

    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col-reverse gap-4 md:flex-row">
            {/* Thumbnails */}
            <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto px-1 py-1 md:h-[620px] md:w-24 md:flex-col md:overflow-y-auto">
                {images.map((media, index) => {
                    const isVid = isVideo(media);
                    const isSelected = selectedMedia === media;

                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={() => setSelectedMedia(media)}
                            onMouseEnter={() => setSelectedMedia(media)}
                            className={`group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[8px] border border-black/10 bg-white transition-all duration-300 ease-out md:h-24 md:w-24
                                ${isSelected
                                    ? 'z-10 scale-95 ring-2 ring-black shadow-md'
                                    : 'opacity-90 hover:z-20 hover:scale-105 hover:shadow-xl hover:opacity-100'
                                }`}
                        >
                            {isVid ? (
                                <div className="relative flex h-full w-full items-center justify-center bg-[#fbfbf8]">
                                    <video
                                        src={media}
                                        className="w-full h-full object-cover opacity-80"
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                        <Play className="w-6 h-6 text-white fill-current" />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={media}
                                    alt={`${title} view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Main Display */}
            <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-[8px] border border-black/10 bg-[#fbfbf8] shadow-[0_22px_70px_rgba(18,16,13,0.08)] md:aspect-auto md:h-[620px]">
                {isVideo(selectedMedia) ? (
                    <video
                        src={selectedMedia}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <img
                        src={selectedMedia}
                        alt={title}
                        className="h-full w-full object-contain object-center p-4 transition-all duration-500 ease-in-out mix-blend-multiply md:p-8"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
