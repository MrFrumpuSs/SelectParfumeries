import { v4 as uuidv4 } from 'uuid';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function(img, url) {
    if(img) {
        if (!img.length) {
            img = [ img ]; 
        }
    }

    let imgName = 'default.jpeg';
    let imgPath = url + '/' + imgName;
    let imgArr = [];
    if(img) {
        await Promise.all(img.map(async (element) => {
            imgName = uuidv4() + '.webp';
            imgArr.push(url + '/' + imgName);
            imgPath = path.resolve(__dirname, '..', 'static', imgName);
            const image = await sharp(element.data)
            .webp()
            .toFile(imgPath);      
        }));
    } else {
        imgArr.push(url + '/' + imgName);
    }

    return imgArr;
}