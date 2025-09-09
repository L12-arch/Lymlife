import { VideoProps } from './../types/index';
import axios from 'axios';
import { GOOGLE_DRIVE_CONFIG } from '../config/googleAuth';
import { GoogleDriveFileList, GoogleDriveFile } from '../types';
const GOOGLE_DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

const VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo', // avi
  'video/x-matroska', // mkv
  'video/mpeg',
];

class GoogleDriveService {
  async listAudioFiles(pageToken?: string): Promise<GoogleDriveFileList> {
    try {
      const { SHARED_FOLDER_ID, API_KEY } = GOOGLE_DRIVE_CONFIG;

      if (!SHARED_FOLDER_ID) {
        throw new Error('Google Drive folder ID not configured');
      }

      const MEDIA_MIME_TYPES = [...VIDEO_MIME_TYPES];

      const mimeTypeQuery = MEDIA_MIME_TYPES.map(
        (type) => `mimeType='${type}'`,
      ).join(' or ');
      const query = `'${SHARED_FOLDER_ID}' in parents and (${mimeTypeQuery}) and trashed=false`;

      const params: Record<string, string> = {
        q: query,
        pageSize: '100',
        fields:
          'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, webContentLink, thumbnailLink, fileExtension), nextPageToken',
        orderBy: 'name',
      };

      if (pageToken) {
        params.pageToken = pageToken;
      }

      if (API_KEY || API_KEY === 'AIzaSyB-FBwwx7Pa4lvjIOQG6yg-JDc7ko7otAY') {
        params.key = "AIzaSyB-FBwwx7Pa4lvjIOQG6yg-JDc7ko7otAY";
      }
console.log(params);
      const response = await axios.get(`${GOOGLE_DRIVE_API_BASE}/files`, {
        params,
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error fetching audio files from Google Drive shared folder:',
        error,
      );
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
  convertToSong(file: GoogleDriveFile): VideoProps {
    const metadata = this.extractMetadata(file.name);
    const fileSize = file.size
      ? this.formatFileSize(file.size)
      : 'Unknown size';

    return {
      id: file.id,
      title: metadata.title,
      category: this.getCategoryFromMimeType(file.mimeType),
      duration: this.estimateDuration(file.size || 0),
      fileId: file.id,
      thumbnailLink: file.thumbnailLink,
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
      'video/mp4': 'MP4',
      'video/webm': 'WebM',
      'video/ogg': 'OGG',
      'video/x-msvideo': 'AVI',
      'video/x-flv': 'FLV',
      'video/quicktime': 'MOV',
      'video/x-matroska': 'MKV',
      'video/mpeg': 'MPEG',
      'video/3gpp': '3GP',
      'video/3gpp2': '3G2',
    };

    return typeMap[mimeType] || 'Video';
  }

  private getEmojiForMimeType(mimeType: string): string {
    const emojiMap: { [key: string]: string } = {
      'video/mp4': '🎬',
      'video/webm': '🎥',
      'video/ogg': '📹',
      'video/x-msvideo': '📼', // AVI
      'video/x-flv': '📺', // FLV
      'video/quicktime': '🎞️', // MOV
      'video/x-matroska': '🎥', // MKV
      'video/mpeg': '📀', // MPEG
      'video/3gpp': '📱', // 3GP (mobile video)
      'video/3gpp2': '📱',
    };

    return emojiMap[mimeType] || '🎥';
  }
}

export const googleDriveService = new GoogleDriveService();
