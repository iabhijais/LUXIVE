
const fs = require('fs');
const path = require('path');

const newProducts = JSON.parse(fs.readFileSync('new_products.json', 'utf8'));

// Hardcoded existing products that we want to KEEP
// Extracted from previous file view
const existingProducts = [
    // Sneakers (IDs 100-124)
    {
        "id": 100,
        "title": "Air Jordan 1 Hyper Royal",
        "price": 3200,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/15819563_32921118_1000.webp",
        "hoverImage": "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/air-jordan-1-hyper-royal-release-date (1).jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/15819563_32921118_1000.webp",
            "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/air-jordan-1-hyper-royal-release-date (2).jpg",
            "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/air-jordan-1-hyper-royal-release-date.jpg",
            "/Premium Sneakers/Air Jordan 1 Hyper Royal 3200 x 6999/air-jordan-1-retro-high-og-hyper-royal-301879.jpg"
        ]
    },
    {
        "id": 101,
        "title": "Air Jordan 1 Retro High OG ObsidianUniversity Blue",
        "price": 3300,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/14431181_21155388_1000.webp",
        "hoverImage": "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/482560_08_jpg_b7ce7f4e4a.webp",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/14431181_21155388_1000.webp",
            "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/482560_08_jpg_b7ce7f4e4a.webp",
            "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/71lazriS0YL._AC_UY1000_.jpg",
            "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/m_684073a005deb341c6cc73a3.jpg",
            "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/shopping_6_408b2387-6587-4d31-96c2-55300cf19cf8.webp"
        ]
    },
    {
        "id": 102,
        "title": "Air Jordan 1 Retro Low OG Mocha UA",
        "price": 7500,
        "originalPrice": 14999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/1_6c517e49-0660-4cef-bc9b-373d09c06a48.webp",
        "hoverImage": "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/68f945347e33d1.jpg",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/1_6c517e49-0660-4cef-bc9b-373d09c06a48.webp",
            "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/68f945347e33d1.jpg",
            "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/68f945347e4cb2.jpg",
            "/Premium Sneakers/Air Jordan 1 Retro Low OG Mocha UA 7500 x 14999/air-jordan-1-low-og-mocha-cz0790-102-release-date.jpg"
        ]
    },
    {
        "id": 103,
        "title": "Balenciaga 10XL Sneaker Black Red",
        "price": 8999,
        "originalPrice": 14999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/Balenciaga-10XL-Worn-Out-Grey-White-Red-Product.webp",
        "hoverImage": "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/P00948315.webp",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/Balenciaga-10XL-Worn-Out-Grey-White-Red-Product.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/P00948315.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/P00948315_d1.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/WhatsAppImage2025-05-24at6.01.03PM.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Black Red 8999 x 14999/WhatsAppImage2025-05-24at6.01.10PM.jpg"
        ]
    },
    {
        "id": 104,
        "title": "Balenciaga 10XL Sneaker Green",
        "price": 8999,
        "originalPrice": 15999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/21_da30f6c1-2204-47f0-849c-888e682c13bb.webp",
        "hoverImage": "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/23_4337e6fb-cb94-4a60-9448-388d8e0cf258.webp",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/21_da30f6c1-2204-47f0-849c-888e682c13bb.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/23_4337e6fb-cb94-4a60-9448-388d8e0cf258.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/https___hypebeast.com_image_2023_12_balenciaga-fall-2024-exclusive-10xl-sneaker-erewhon-jacob-co-release-info-tw.jpg",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/product-jpeg-500x500.webp",
            "/Premium Sneakers/Balenciaga 10XL Sneaker Green 8999 x 15999/WhatsAppImage2025-06-20at7_44_22PM-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer-4000x4000.webp"
        ]
    },
    {
        "id": 105,
        "title": "Balenciaga Cargo Sneakers High Quality Made in italy",
        "price": 8999,
        "originalPrice": 15999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.28PM.webp",
        "hoverImage": "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.35PM.webp",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.28PM.webp",
            "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.35PM.webp",
            "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.36PM.webp",
            "/Premium Sneakers/Balenciaga Cargo Sneakers High Quality Made in italy 8999 x15999/WhatsAppImage2025-05-26at1.59.38PM_1200x.webp"
        ]
    },
    {
        "id": 106,
        "title": "Balmain Unicorn Low Sneaker Neoprene & Calfskin",
        "price": 11999,
        "originalPrice": 19999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/20a236c049bd65f8accd92cbf192ad6c.png",
        "hoverImage": "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/8066bfe310f0b4501764b1b8e786cdb9.png",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/20a236c049bd65f8accd92cbf192ad6c.png",
            "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/8066bfe310f0b4501764b1b8e786cdb9.png",
            "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/DM1VJ309KBFGEFFH.jpg",
            "/Premium Sneakers/Balmaiiin Unicorn Low Sneaker Neoprene & Calfskin 11999 x 19999/DM1VJ309KBFGEFFJ.jpg"
        ]
    },
    {
        "id": 107,
        "title": "Balmain Unicorn Low Top Premium Sneaker White Blue",
        "price": 11999,
        "originalPrice": 21999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-1000x1000 (1).webp",
        "hoverImage": "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-1000x1000 (2).webp",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-1000x1000 (1).webp",
            "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-1000x1000 (2).webp",
            "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-1000x1000.webp",
            "/Premium Sneakers/Balmaiinn Unicorn Low Top Premium Sneaker White Blue  11999 x 21999/product-jpeg-500x500.webp"
        ]
    },
    {
        "id": 108,
        "title": "Gucci Screener GG Designer sneaker Premium",
        "price": 8899,
        "originalPrice": 19999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f1f00.jpeg",
        "hoverImage": "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f5081.jpeg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f1f00.jpeg",
            "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f5081.jpeg",
            "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f7152.jpeg",
            "/Premium Sneakers/Guccci Screener GG Designer sneaker Premium  8899 x 19999/693abd3c4f94a3.jpeg"
        ]
    },
    {
        "id": 109,
        "title": "Gucci Screener GG Leather Trimmed Sneaker",
        "price": 4500,
        "originalPrice": 9999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_001_100_0000_Light-mens-gg-screener-sneaker.jpg",
        "hoverImage": "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_004_100_0000_Light-mens-gg-screener-sneaker.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_001_100_0000_Light-mens-gg-screener-sneaker.jpg",
            "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_004_100_0000_Light-mens-gg-screener-sneaker.jpg",
            "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_005_100_0000_Light-mens-gg-screener-sneaker.jpg",
            "/Premium Sneakers/Gucc_i Screener GG Leather Trimmed Sneaker 4500 x 9999/546551_9Y920_9666_006_100_0000_Light-mens-gg-screener-sneaker.jpg"
        ]
    },
    {
        "id": 110,
        "title": "Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown",
        "price": 5000,
        "originalPrice": 12999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/louis-vuitton-lv-trainer-sneaker--BR9U4PGC30_PM.webp",
        "hoverImage": "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/louis-vuitton-lv-trainer-sneaker--BR9U5PMI92_PM2_Front view.webp",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/louis-vuitton-lv-trainer-sneaker--BR9U4PGC30_PM.webp",
            "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/louis-vuitton-lv-trainer-sneaker--BR9U5PMI92_PM2_Front view.webp",
            "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/louis-vuitton-lv-trainer-sneaker--BVU00KJA92_PM.webp",
            "/Premium Sneakers/Louis Vuitton LV Trainer Sneaker Monogram Eclipse Brown 5000 x 12999/whatsapp-image-2023-04-11-at-12-34-56-am-1--500.webp"
        ]
    },
    {
        "id": 111,
        "title": "Louis Vuitton trainer denim blue with all accessories",
        "price": 3199,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Closeup view.webp",
        "hoverImage": "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Cropped worn view.webp",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Closeup view.webp",
            "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Cropped worn view.webp",
            "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Detail view.webp",
            "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM1_Interior view.webp",
            "/Premium Sneakers/Louiss Vuitton trainer denim blue with all accessories  3199 x 6999/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM2_Front view.webp"
        ]
    },
    {
        "id": 112,
        "title": "Louis Vuitton Lv Trainer Sneaker Brown Damier Calf Leather",
        "price": 11999,
        "originalPrice": 19999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainer-sneaker--BSUPMYNU92_PM2_Front view.webp",
        "hoverImage": "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainer-sneaker--BVU00NMI92_PM2_Front view.webp",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainer-sneaker--BSUPMYNU92_PM2_Front view.webp",
            "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainer-sneaker--BVU00NMI92_PM2_Front view.webp",
            "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainers-Damier-embossednubuckcalfleather-brown-low-top-sneakers-trainers-2_800x1000.jpg.webp",
            "/Premium Sneakers/Louisvuitton Lv Trainer Sneaker Brown Damier Calf Leather 11999 x 19999/louis-vuitton-lv-trainers-Damier-embossednubuckcalfleather-brown-low-top-sneakers-trainers-5_800x1000.jpg.webp"
        ]
    },
    {
        "id": 113,
        "title": "Lv Trainer Sneaker All Black double Box",
        "price": 11999,
        "originalPrice": 19999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/68b19fe54a6b00.jpg",
        "hoverImage": "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/68b19fe54a9551.jpg",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/68b19fe54a6b00.jpg",
            "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/68b19fe54a9551.jpg",
            "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/68b19fe54ab8b2.jpg",
            "/Premium Sneakers/Lv Trainer Sneaker All Black double Box 11999 x 19999/o_1j3t4hmed1b3a17sps961ujm1n0a8.mov"
        ]
    },
    {
        "id": 114,
        "title": "Nike Air Jordan Retro 1 Lost And-Found",
        "price": 3400,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design (1).jpg",
        "hoverImage": "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design (2).jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design (1).jpg",
            "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design (2).jpg",
            "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design.jpg",
            "/Premium Sneakers/Nikee Air Jordan Retro 1 Lost And-Found 3400 x 6999/air-jordan-1-lost-and-found-header-image.webp"
        ]
    },
    {
        "id": 115,
        "title": "Nike Air Max Furyosa Black Summit White Black",
        "price": 3600,
        "originalPrice": 7499,
        "category": "sneakers",
        "image": "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/20-10-2021_RC_DH0531-002_5_1.webp",
        "hoverImage": "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/4260706173_bk1.webp",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/20-10-2021_RC_DH0531-002_5_1.webp",
            "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/4260706173_bk1.webp",
            "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/619231.webp",
            "/Premium Sneakers/Nikee Air Max Furyosa Black Summit White Black 3600 x 7499/e8c18e03_6699_4a9a_b84a_6c61a347fb68.webp"
        ]
    },
    {
        "id": 116,
        "title": "Nike Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers",
        "price": 3700,
        "originalPrice": 7499,
        "category": "sneakers",
        "image": "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/13678864_16910119_1000.webp",
        "hoverImage": "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/air-jordan-5-wings-release-date.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/13678864_16910119_1000.webp",
            "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/air-jordan-5-wings-release-date.jpg",
            "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/https___hypebeast.com_image_2018_07_air-jordan-5-wings-first-look-1.jpg",
            "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/https___hypebeast.com_image_2018_09_air-jordan-5-wings-release-date-official-imagery-1.jpg",
            "/Premium Sneakers/Nikee Jordan Retro 5 Wings Glow in Dark Reflective Basketball Sneakers 3700 x 7499/product-jpeg-500x500.webp"
        ]
    },
    {
        "id": 117,
        "title": "Nike Zoom Field X Travis Scott Light Chocolate Sneaker",
        "price": 3699,
        "originalPrice": 7999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/EditsbyAhmar01_3bd2a534-e17a-48a7-a1c2-f234c5a4566f.webp",
        "hoverImage": "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/https___hypebeast.com_image_2024_08_20_travis-scott-nike-zoom-field-jaxx-light-chocolate-2.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/EditsbyAhmar01_3bd2a534-e17a-48a7-a1c2-f234c5a4566f.webp",
            "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/https___hypebeast.com_image_2024_08_20_travis-scott-nike-zoom-field-jaxx-light-chocolate-2.jpg",
            "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/https___hypebeast.com_image_2024_08_20_travis-scott-nike-zoom-field-jaxx-light-chocolate-5.jpg",
            "/Premium Sneakers/Nikee Zoom Field X Travis Scott Light Chocolate Sneaker 3699 x 7999/Travis-Scott-x-Nike-Zoom-Field-Jaxx-Light-Chocolate-04.jpg"
        ]
    },
    {
        "id": 118,
        "title": "Nike SB Dunk Low Year Of The Dragon Steam Puppet",
        "price": 3200,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/e03834f54d68fdd9d86122c87f54b92f.jpeg",
        "hoverImage": "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/IMG-20250208-WA0034.webp",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/e03834f54d68fdd9d86122c87f54b92f.jpeg",
            "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/IMG-20250208-WA0034.webp",
            "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/IMG-20250208-WA0035.webp",
            "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/whatsapp-image-2025-08-17-at-1-55-16-pm-1.jpeg",
            "/Premium Sneakers/Nik_ee SB Dunk Low Year Of The Dragon Steam Puppet 3200 x 6999/WhatsAppImage2025-04-22at6.13.17PM.webp"
        ]
    },
    {
        "id": 119,
        "title": "SB x Air Jordan 4 Retro 4 SP Pine Green UA",
        "price": 7000,
        "originalPrice": 15999,
        "category": "sneakers",
        "image": "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (1).jpg",
        "hoverImage": "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (2).jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (1).jpg",
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (2).jpg",
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (3).jpg",
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (4).jpg",
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date (5).jpg",
            "/Premium Sneakers/SB x Air Jordan 4 Retro 4 sp Pine Green UA 7000 x 15999/nike-sb-x-air-jordan-4-pine-green-dr5415-103-release-date.jpg"
        ]
    },
    {
        "id": 120,
        "title": "Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive",
        "price": 7500,
        "originalPrice": 15999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/460846584_18042036902024226_2239084832835864242_n-820x1024.jpg",
        "hoverImage": "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/460846584_18042036902024226_2239084832835864242_n-820x1024.jpg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/travis-scott-air-jordan-1-low-og-sp-medium-olive-dm7866-200-release-date-1.webp",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Reverse 2024 Olive Medium Olive  7500 x 15999/travis-scott-air-jordan-1-low-olive-DM7866-200-1.webp"
        ]
    },
    {
        "id": 121,
        "title": "Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA",
        "price": 7500,
        "originalPrice": 15999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/68f938629579d2.jpg",
        "hoverImage": "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/68f93862959803.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/68f938629579d2.jpg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/68f93862959803.jpg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/68f9386295ce95.jpg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/nike-x-travis-scott-air-jordan-1-retro-low-og-sp-velvet-brown-778479_600x.jpeg",
            "/Premium Sneakers/Travis Scott x Air Jordan 1 Retro Low OG SP Velvet Brown UA 7500 x 15999/travis-scott-air-jordan-1-low-og-velvet-brown-dm7866-202-release-date-6-1068x1068.jpg"
        ]
    },
    {
        "id": 122,
        "title": "UA Air Jordan 1 Dark Mocha Premium",
        "price": 7999,
        "originalPrice": 14999,
        "category": "sneakers",
        "image": "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/69204557ea2400.jpg",
        "hoverImage": "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/air-jordan-1-dark-mocha-release-date.jpg",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/69204557ea2400.jpg",
            "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/air-jordan-1-dark-mocha-release-date.jpg",
            "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/air-jordan-1-low-og-mocha-cz0790-102-release-date (1).jpg",
            "/Premium Sneakers/UA Air Jordan 1 Dark Mocha Premium  7999 x 14999/air-jordan-1-low-og-mocha-cz0790-102-release-date.jpg"
        ]
    },
    {
        "id": 123,
        "title": "UA Air Jordan 1 Low x Dior",
        "price": 8999,
        "originalPrice": 16999,
        "category": "sneakers",
        "image": "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/15651284_28537785_1000.webp",
        "hoverImage": "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/s-l1200.jpg",
        "badge": "Sale",
        "gallery": [
            "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/15651284_28537785_1000.webp",
            "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/s-l1200.jpg",
            "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/t8b5nsuv89ybfesmr6l9.webp",
            "/Premium Sneakers/UA Air Jordan 1 Low x Dior 8999 x 16999/WhatsAppImage2025-03-12at8.51.03PM.webp"
        ]
    },
    {
        "id": 124,
        "title": "Zion Williamson x Air Jordan 1 Low",
        "price": 3200,
        "originalPrice": 6999,
        "category": "sneakers",
        "image": "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/19388282_43527627_1000.webp",
        "hoverImage": "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/air-jordan-1-retro-low-og-x-zion-williamson-voodoo-450773.jpg",
        "badge": "Mega Sale",
        "gallery": [
            "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/19388282_43527627_1000.webp",
            "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/air-jordan-1-retro-low-og-x-zion-williamson-voodoo-450773.jpg",
            "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/IMG_8187.webp",
            "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/Nike-AJ1-LowOGFlax-Voodoo-IG-5.jpg",
            "/Premium Sneakers/Zion Williamson x Air Jordan 1 Low 3200 x 6999/WhatsApp-Image-2024-08-31-at-2.31.32-PM.jpeg"
        ]
    },
    // Luxury (IDs 11-14)
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
    // Sweatshirts (IDs 51-58)
    {
        id: 51,
        title: "RALPH LAUREN PREMIUM V NECK SWEATER",
        price: 2200,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 52,
        title: "RALPH LAUREN PREMIUM IMPORTED SWEATER",
        price: 1950,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 53,
        title: "ZARA PREMIUM KNITTED STIRPES PULL OVER BROWN",
        price: 2000,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1620799139507-2a54f7c3dd05?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1620799139507-2a54f7c3dd05?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 54,
        title: "LOUIS VUITTON PRINT PREMIUM TURKISH OVERSIZED SWEATER",
        price: 3000,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
        badge: "Premium"
    },
    {
        id: 55,
        title: "ZARA PREMIUM KNITTED POLO SWEATER",
        price: 1950,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 56,
        title: "ZARA PREMIUM KNITTED POLO SWEATER BROWN",
        price: 1950,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 57,
        title: "ZARA PREMIUM KNITTED POLO",
        price: 1950,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
    {
        id: 58,
        title: "RALPH LAUREN PREMIUM V NECK SWEATER",
        price: 2200,
        originalPrice: 9999,
        category: "sweatshirts",
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
        hoverImage: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
        badge: ""
    },
];

const allProducts = [...existingProducts, ...newProducts];

const fileContent = `export const COLLECTIONS = [
    { id: 'sneakers', title: 'AUTHENTIC SNEAKERS', subtitle: 'Premium Sneakers', link: '/shop/sneakers' },
    { id: 'luxury', title: 'LUXURY', subtitle: 'High-End Fashion', link: '/shop/luxury' },
    { id: 'perfumes_her', title: 'PERFUMES FOR HER', subtitle: 'Elegant Fragrances', link: '/shop/perfumes_her' },
    { id: 'watches', title: 'LUXURY WATCHES', subtitle: 'Timeless Elegance', link: '/shop/watches' },
    { id: 'sweatshirts', title: 'PREMIUM SWEATSHIRTS', subtitle: 'Cozy Luxury', link: '/shop/sweatshirts' },
];

export const PRODUCTS = ${JSON.stringify(allProducts, null, 4)};
`;

fs.writeFileSync('src/data/products.ts', fileContent);
console.log('Updated products.ts with ' + allProducts.length + ' products.');
