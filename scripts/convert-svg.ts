import sharp from 'sharp';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLOG_IMG_DIR = path.join(PUBLIC_DIR, 'images', 'blog');
const svgPath = path.join(BLOG_IMG_DIR, 'sqlite-when-to-use-cover.svg');
const webpPath = path.join(BLOG_IMG_DIR, 'sqlite-when-to-use-cover.webp');

async function convert() {
    try {
        console.log(`Converting ${svgPath} to ${webpPath}`);
        await sharp(svgPath)
            .webp({ quality: 80 })
            .toFile(webpPath);
        console.log('Conversion successful.');
    } catch (err) {
        console.error('Conversion failed:', err);
    }
}

convert();
