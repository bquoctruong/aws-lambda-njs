import * as fs from 'node:fs';
import path from 'node:path';

/**
 * Load HTML, CSS, and JS files from the filesystem.
 */
const html = fs.readFileSync('index.html', { encoding: 'utf8' });

/**
 * A helper function to determine the content type based on file extension.
 */
const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.xml':
            return 'image/svg+xml';
        case '.svg':
            return 'image/svg+xml';
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'application/octet-stream';
    }
};

/**
 * Reads the file from the filesystem and returns its content.
 */
const getFileContent = (filePath) => {
    try {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    } catch (err) {
        console.error(`File not found: ${filePath}`);
        return null;
    }
};

/**
 * Lambda handler function.
 * Serves the HTML page, CSS, and JS files.
 */
export const handler = async (event) => {
    let filePath = 'index.html';
    let contentType = 'text/html';

    // Check if the request is for a specific file (e.g., CSS or JS)
    if (event.rawPath && event.rawPath !== '/') {
        filePath = `.${event.rawPath}`; // Prefix with '.' to ensure correct path handling
        contentType = getContentType(filePath);
    }

    const fileContent = getFileContent(filePath);

    if (fileContent) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': contentType,
            },
            body: fileContent,
        };
    } else {
        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'text/plain',
            },
            body: '404 Not Found',
        };
    }
};
