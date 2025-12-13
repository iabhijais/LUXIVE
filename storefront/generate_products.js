
const fs = require('fs');
const path = require('path');
// const sharp = require('sharp'); // Commented out as we uninstalled it, assuming conversion is done. 
// If we needed to convert again, we'd need to reinstall. 
// But the user's current request is about logic and UI, and I already converted the images.
// However, to be safe and robust if I run this again on the same folder, I should handle the existing jpgs.

const baseDir = path.join(__dirname, 'public', 'Premium Sneakers');
const output = [];

async function generateProducts() {
    try {
        const folders = fs.readdirSync(baseDir);

        for (let index = 0; index < folders.length; index++) {
            const folder = folders[index];
            const folderPath = path.join(baseDir, folder);

            if (fs.statSync(folderPath).isDirectory()) {
                const match = folder.match(/(.+?)\s+(\d+)\s*x\s*(\d+)/);

                if (match) {
                    const title = match[1].trim();
                    const price = parseInt(match[2]);
                    const originalPrice = parseInt(match[3]);

                    // Get images and videos
                    let files = fs.readdirSync(folderPath);
                    // Filter for images AND videos
                    files = files.filter(file => /\.(jpg|jpeg|png|webp|avif|mp4|mov|webm)$/i.test(file));

                    const mediaUrls = [];

                    for (const file of files) {
                        // We assume images are already converted to jpg/webp in previous step or are naturally supported.
                        // We skip the sharp conversion logic here since I uninstalled sharp and the previous run succeeded.
                        // Ideally we would check if we need to convert, but for now we just list what's there.

                        mediaUrls.push(`/Premium Sneakers/${folder}/${file}`);
                    }

                    if (mediaUrls.length > 0) {
                        let badge = "";
                        const discount = ((originalPrice - price) / originalPrice) * 100;
                        if (discount > 50) badge = "Mega Sale";
                        else if (discount > 30) badge = "Sale";
                        else badge = "New";

                        // Separate logic for main image vs gallery to ensure main is an image
                        const mainImage = mediaUrls.find(m => /\.(jpg|jpeg|png|webp)$/i.test(m)) || mediaUrls[0];
                        const hoverImage = mediaUrls.find(m => m !== mainImage && /\.(jpg|jpeg|png|webp)$/i.test(m)) || mainImage;

                        output.push({
                            id: 100 + index,
                            title: title,
                            price: price,
                            originalPrice: originalPrice,
                            category: "sneakers",
                            image: mainImage,
                            hoverImage: hoverImage,
                            badge: badge,
                            gallery: mediaUrls
                        });
                    }
                }
            }
        }

        console.log(JSON.stringify(output, null, 2));

    } catch (err) {
        console.error("Error:", err);
    }
}

generateProducts();
