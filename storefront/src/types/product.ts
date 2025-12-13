
interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    category: string;
    image: string;
    hoverImage?: string;
    badge?: string;
    gallery?: string[]; // Add optional gallery array
}

// ... existing code ...
