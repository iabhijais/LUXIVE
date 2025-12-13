
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
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 md:h-[600px] shrink-0 py-1 px-1">
                {images.map((media, index) => {
                    const isVid = isVideo(media);
                    const isSelected = selectedMedia === media;

                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedMedia(media)}
                            onMouseEnter={() => setSelectedMedia(media)}
                            className={`group relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ease-out 
                                ${isSelected
                                    ? 'ring-2 ring-black scale-95 shadow-md z-10'
                                    : 'hover:scale-110 hover:shadow-xl hover:z-20 opacity-90 hover:opacity-100'
                                }`}
                        >
                            {isVid ? (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
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
            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden relative aspect-[4/5] md:aspect-auto md:h-[600px] shadow-sm">
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
                        className="w-full h-full object-contain object-center transition-all duration-500 ease-in-out mix-blend-multiply"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
