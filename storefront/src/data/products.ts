export const COLLECTIONS = [
    { id: 'sneakers', title: 'AUTHENTIC SNEAKERS', subtitle: 'Premium Sneakers', link: '/shop/sneakers' },
    { id: 'luxury', title: 'LUXURY', subtitle: 'High-End Fashion', link: '/shop/luxury' },
    { id: 'perfumes_her', title: 'PERFUMES FOR HER', subtitle: 'Elegant Fragrances', link: '/shop/perfumes_her' },
    { id: 'watches', title: 'LUXURY WATCHES', subtitle: 'Timeless Elegance', link: '/shop/watches' },
];

export const PRODUCTS = [
    // Sneakers
    {
        id: 1,
        title: "Air Jordan Retro 1 Royal Reimagined",
        price: 5900,
        originalPrice: 22000,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&q=80&w=800",
        badge: "Sale"
    },
    {
        id: 2,
        title: "Nike Airforce 1 UV Active Color Change",
        price: 4500,
        originalPrice: 12000,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        badge: "Hot"
    },
    {
        id: 3,
        title: "Air Jordan 4 Thunder Blue",
        price: 5600,
        originalPrice: 18500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800",
        badge: "Sale"
    },
    {
        id: 4,
        title: "SB Dunk Low Parra Multi",
        price: 5600,
        originalPrice: 15000,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },

    // Luxury
    {
        id: 11,
        title: "LV Beverly Hills Low Top Monogram",
        price: 10800,
        originalPrice: 85000,
        category: "luxury",
        image: "/lv-beverly-hills.png",
        hoverImage: "https://images.unsplash.com/photo-1560769625-255843b6115e?auto=format&fit=crop&q=80&w=800",
        badge: "Premium"
    },
    {
        id: 12,
        title: "LV Runner Tatic White",
        price: 12000,
        originalPrice: 98000,
        category: "luxury",
        image: "/lv-runner-tatic.png",
        hoverImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        badge: "New"
    },
    {
        id: 13,
        title: "LV Trainer Virgil Abloh Multi",
        price: 10400,
        originalPrice: 92000,
        category: "luxury",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        badge: "Sale"
    },
    {
        id: 14,
        title: "LV Trainer Sneaker Boot High",
        price: 22400,
        originalPrice: 120000,
        category: "luxury",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
        badge: "Limited"
    },

    // Watches
    {
        id: 41,
        title: "Tag Heuer CR7 Black Gold All Working W146",
        price: 1549,
        originalPrice: 15490,
        category: "watches",
        image: "/WATCHES/Tag Heuer CR7 Black Gold All Working W146 15490x1549/692e97f6190f30.jpg",
        hoverImage: "/WATCHES/Tag Heuer CR7 Black Gold All Working W146 15490x1549/692e97f6193531.jpg",
        badge: "Classic"
    },
    {
        id: 42,
        title: "Casio G-Shock gms5600",
        price: 46,
        originalPrice: 51,
        category: "watches",
        image: "/WATCHES/Casio G-Shock gms5600 51x46/692e964d3d4b80.jpeg",
        hoverImage: "/WATCHES/Casio G-Shock gms5600 51x46/692e964d3eefc1.jpeg",
        badge: "Exclusive"
    },
    {
        id: 43,
        title: "Casio G-Shock GMC-B2100ZE-1AJR",
        price: 777,
        originalPrice: 69690,
        category: "watches",
        image: "/WATCHES/Casio G-Shock GMC-B2100ZE-1AJR 69690x777/692ea1192b9060.jpg",
        hoverImage: "/WATCHES/Casio G-Shock GMC-B2100ZE-1AJR 69690x777/692ea1192b9060.jpg",
        badge: "Rare"
    },
    {
        id: 44,
        title: "Seiko Presage Cocktail Premium Automatic Black W222",
        price: 333,
        originalPrice: 888,
        category: "watches",
        image: "/WATCHES/Seiko Presage Cocktail Premium Automatic Black W222 888x333/692e8fd7e09d30.jpeg",
        hoverImage: "/WATCHES/Seiko Presage Cocktail Premium Automatic Black W222 888x333/692e8fd7e09d30.jpeg",
        badge: "Iconic"
    },
    {
        id: 45,
        title: "Casio G-Shock gmwb5000 WC 753",
        price: 888,
        originalPrice: 999,
        category: "watches",
        image: "/WATCHES/Casio G-Shock gmwb5000 WC 753 999x888/692b044c030e90.jpeg",
        hoverImage: "/WATCHES/Casio G-Shock gmwb5000 WC 753 999x888/692b044c030e90.jpeg",
        badge: "Elegant"
    },

    // Perfumes Her
    {
        id: 21,
        title: "Gucci Flora Limited Edition",
        price: 2499,
        originalPrice: 8500,
        category: "perfumes_her",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        badge: "Best Seller"
    },
    {
        id: 22,
        title: "Valentino Donna Born In Roma",
        price: 2499,
        originalPrice: 9200,
        category: "perfumes_her",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 23,
        title: "Chanel Coco Mademoiselle",
        price: 3200,
        originalPrice: 10500,
        category: "perfumes_her",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        badge: "New"
    },
    {
        id: 24,
        title: "YSL Libre Intense",
        price: 2800,
        originalPrice: 9800,
        category: "perfumes_her",
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        badge: "Trending"
    },

    // Perfumes Him
    {
        id: 31,
        title: "Dior Sauvage Eau De Parfum",
        price: 2499,
        originalPrice: 11500,
        category: "perfumes_him",
        image: "/dior-sauvage.png",
        hoverImage: "/dior-sauvage.png",
        badge: "Trending"
    },
    {
        id: 32,
        title: "Creed Aventus",
        price: 2499,
        originalPrice: 28000,
        category: "perfumes_him",
        image: "/creed-aventus.png",
        hoverImage: "/creed-aventus.png",
        badge: "Premium"
    },
    {
        id: 33,
        title: "Versace Eros Flame",
        price: 2100,
        originalPrice: 8500,
        category: "perfumes_him",
        image: "/versace-eros.png",
        hoverImage: "/versace-eros.png",
        badge: "Sale"
    },
    {
        id: 34,
        title: "Bleu de Chanel",
        price: 3500,
        originalPrice: 12500,
        category: "perfumes_him",
        image: "/bleu-de-chanel.png",
        hoverImage: "/bleu-de-chanel.png",
        badge: "Classic"
    },
];
