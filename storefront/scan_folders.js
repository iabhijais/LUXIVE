
const fs = require('fs');
const path = require('path');

const directories = [
    { path: 'MENS PERFUMES', category: 'perfumes_him', startId: 200 },
    { path: 'WOMENS PERFUMES', category: 'perfumes_her', startId: 300 },
    { path: 'PREMIUM WATCHES MEN', category: 'watches', startId: 400 },
    { path: 'PREMIUM WATCHES WOMEN', category: 'watches', startId: 500 }
];

const EXTENSIONS = /\.(jpg|jpeg|png|webp|avif|mp4|mov|webm)$/i;
const HIDE_EXTENSIONS = /\.(mp4|mov|webm)$/i;

function scan() {
    let allProducts = [];

    directories.forEach(dirConfig => {
        const fullPath = path.join(__dirname, 'public', dirConfig.path);
        if (!fs.existsSync(fullPath)) {
            console.log(`Directory not found: ${fullPath}`);
            return;
        }

        const folders = fs.readdirSync(fullPath);
        let currentId = dirConfig.startId;

        folders.forEach(folderName => {
            const folderPath = path.join(fullPath, folderName);
            if (!fs.statSync(folderPath).isDirectory()) return;

            // Strict Regex matching: Title Price X SellingPrice
            // Handles spaces, underscores
            // Group 1: Title
            // Group 2: Original Price
            // Group 3: Selling Price
            const match = folderName.match(/^(.*?)[\s_]+(\d+)[\s_]*[xX][\s_]*(\d+)$/);

            if (match) {
                let title = match[1].replace(/[_-]/g, ' ').trim();
                const originalPrice = parseInt(match[2]);
                const price = parseInt(match[3]);

                // Fix Capitalization of title
                title = title.replace(/\b\w/g, l => l.toUpperCase())
                    .replace(/_/g, " ")
                    .replace(/\s+/g, " ")
                    .replace("Guccci", "Gucci")
                    .replace("Gucc i", "Gucci")
                    .replace("Balmaiiin", "Balmain")
                    .replace("Balmaiinn", "Balmain")
                    .replace("Nik ee", "Nike")
                    .replace("Nikee", "Nike")
                    .replace("Louiss", "Louis")
                    .replace("Louisvuitton", "Louis Vuitton")
                    .replace("Raplh", "Ralph")
                    .replace("Zar A", "Zara")
                    .replace("Burberr Y", "Burberry")
                    .replace("Burberr y", "Burberry")
                    .replace("Diese L", "Diesel")
                    .replace("Gril", "Girl")
                    .replace("Corolina", "Carolina")
                    .replace("Arman I", "Armani")
                    .replace("Arman i", "Armani")
                    .replace("Tisso t", "Tissot")
                    .replace("Tisso T", "Tissot")
                    .replace("Role X", "Rolex")
                    .replace("Role x", "Rolex")
                    .replace("Rad O", "Rado")
                    .replace("Calvi N", "Calvin")
                    .replace("Calvi n", "Calvin")
                    .replace("Sprots", "Sports");

                // Get images
                let files = fs.readdirSync(folderPath).filter(f => EXTENSIONS.test(f));

                // Sort files (simple alpha sort)
                files.sort();

                let gallery = files.map(f => `/${dirConfig.path}/${folderName}/${f}`);

                // Filter out videos for main images
                const imageFiles = gallery.filter(f => !HIDE_EXTENSIONS.test(f));

                if (imageFiles.length > 0) {
                    const product = {
                        id: currentId++,
                        title: title,
                        price: price,
                        originalPrice: originalPrice,
                        category: dirConfig.category,
                        image: imageFiles[0],
                        hoverImage: imageFiles.length > 1 ? imageFiles[1] : imageFiles[0],
                        badge: (originalPrice - price) / originalPrice > 0.4 ? "Mega Sale" : "Sale",
                        gallery: gallery
                    };
                    allProducts.push(product);
                }
            } else {
                console.log(`Skipping (no match): ${folderName}`);
            }
        });
    });

    fs.writeFileSync('new_products.json', JSON.stringify(allProducts, null, 2));
    console.log(`Generated ${allProducts.length} new products.`);
}

scan();
