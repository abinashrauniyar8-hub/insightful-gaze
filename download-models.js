import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_landmark_68_model-weights_manifest.json',
    'face_landmark_68_model-shard1',
    'face_recognition_model-weights_manifest.json',
    'face_recognition_model-shard1',
    'face_recognition_model-shard2',
    'face_expression_model-weights_manifest.json',
    'face_expression_model-shard1',
    'age_gender_model-weights_manifest.json',
    'age_gender_model-shard1'
];

const baseUrl = 'https://justadudewhohacks.github.io/face-api.js/models/';
const outputDir = path.join(__dirname, 'public', 'models');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const downloadFile = (filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(outputDir, filename);
        const file = fs.createWriteStream(filePath);
        const url = baseUrl + filename;

        console.log(`Downloading ${filename}...`);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                // consumes response data to free up memory
                response.resume();
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Finished ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
};

async function downloadAll() {
    try {
        for (const model of models) {
            console.log(`Starting ${model}`);
            await downloadFile(model);
        }
        console.log('All models downloaded successfully!');
    } catch (err) {
        console.error('Error downloading models:', err);
        process.exit(1);
    }
}

downloadAll();
