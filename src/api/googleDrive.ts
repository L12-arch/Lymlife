import axios from 'axios';
import { GOOGLE_DRIVE_CONFIG } from '../config/googleAuth';

const GOOGLE_DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

// Audio file MIME types
const AUDIO_MIME_TYPES = [
    'audio/mpeg', // mp3
    'audio/mp4', // m4a
    'audio/wav',
    'audio/x-wav',
    'audio/aac',
    'audio/ogg',
    'audio/webm',
    'audio/flac',
    'audio/x-m4a',
];

class GoogleDriveService {
    async listAudioFiles(pageToken?: string): Promise<GoogleDriveFileList> {
        try {
            const { SHARED_FOLDER_ID, API_KEY } = GOOGLE_DRIVE_CONFIG;

            if (!SHARED_FOLDER_ID || SHARED_FOLDER_ID === 'YOUR_SHARED_FOLDER_ID') {
                throw new Error('Google Drive folder ID not configured');
            }

            const mimeTypeQuery = AUDIO_MIME_TYPES.map(type => `mimeType='${type}'`).join(' or ');
            const query = `'${SHARED_FOLDER_ID}' in parents and (${mimeTypeQuery}) and trashed=false`;

            const params: Record<string, string> = {
                q: query,
                pageSize: '100',
                fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, webContentLink, thumbnailLink, fileExtension), nextPageToken',
                orderBy: 'name',
            };

            if (pageToken) {
                params.pageToken = pageToken;
            }

            // Add API key if provided for higher rate limits
            if (API_KEY && API_KEY !== 'YOUR_GOOGLE_API_KEY') {
                params.key = API_KEY;
            }

            const response = await axios.get(`${GOOGLE_DRIVE_API_BASE}/files`, { params });

            return response.data;
        } catch (error) {
            console.error('Error fetching audio files from Google Drive shared folder:', error);
            throw new Error('Failed to fetch files from Google Drive');
        }
    }

    async getAllAudioFiles(): Promise<GoogleDriveFile[]> {
        let allFiles: GoogleDriveFile[] = [];
        let pageToken: string | undefined;

        do {
            const response = await this.listAudioFiles(pageToken);
            allFiles = [...allFiles, ...response.files];
            pageToken = response.nextPageToken;
        } while (pageToken);

        return allFiles;
    }

    // Helper method to extract metadata from filename
    extractMetadata(filename: string): { title: string; artist?: string } {
        // Remove file extension
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

        // Common patterns for music files: "Artist - Title" or "Title - Artist"
        const artistTitlePattern = /^(.+?)\s*[-–—]\s*(.+)$/;
        const match = nameWithoutExt.match(artistTitlePattern);

        if (match) {
            return {
                title: match[2].trim(),
                artist: match[1].trim(),
            };
        }

        return {
            title: nameWithoutExt.trim(),
        };
    }

    // Convert Google Drive file to Song object
    convertToSong(file: GoogleDriveFile): Song {
        const metadata = this.extractMetadata(file.name);
        const fileSize = file.size ? this.formatFileSize(file.size) : 'Unknown size';

        return {
            id: file.id,
            title: metadata.title,
            singer: metadata.artist || 'Unknown Artist',
            category: this.getCategoryFromMimeType(file.mimeType),
            theme: 'Music',
            duration: this.estimateDuration(file.size || 0),
            image: this.getEmojiForMimeType(file.mimeType),
            fileId: file.id,
            webContentLink: file.webContentLink,
        };
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private estimateDuration(fileSize: number): string {
        // Very rough estimation: assume 128kbps MP3 ~ 1MB per minute
        const minutes = Math.round(fileSize / (1024 * 1024));
        return `${minutes}:00`;
    }

    private getCategoryFromMimeType(mimeType: string): string {
        const typeMap: { [key: string]: string } = {
            'audio/mpeg': 'MP3',
            'audio/mp4': 'M4A',
            'audio/wav': 'WAV',
            'audio/x-wav': 'WAV',
            'audio/aac': 'AAC',
            'audio/ogg': 'OGG',
            'audio/webm': 'WebM',
            'audio/flac': 'FLAC',
            'audio/x-m4a': 'M4A',
        };

        return typeMap[mimeType] || 'Audio';
    }

    private getEmojiForMimeType(mimeType: string): string {
        const emojiMap: { [key: string]: string } = {
            'audio/mpeg': '🎵',
            'audio/mp4': '🎵',
            'audio/wav': '🎵',
            'audio/x-wav': '🎵',
            'audio/aac': '🎵',
            'audio/ogg': '🎵',
            'audio/webm': '🎵',
            'audio/flac': '🎵',
            'audio/x-m4a': '🎵',
        };

        return emojiMap[mimeType] || '🎵';
    }
}

export const googleDriveService = new GoogleDriveService();
