declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

// Google Drive API Types
interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  fileExtension?: string;
}

interface GoogleDriveFileList {
  files: GoogleDriveFile[];
  nextPageToken?: string;
}

interface GoogleAuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  expiresIn: number | null;
  issuedAt: number | null;
  authentication: any | null;
}

// Song type for the playlist
interface Song {
  id: string;
  title: string;
  singer: string;
  category: string;
  theme: string;
  duration: string;
  image: string;
  fileId?: string;
  webContentLink?: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends import('./types/naviagtion').RootStackParamList { }
  }
}
