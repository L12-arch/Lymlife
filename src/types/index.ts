export interface Song {
  id: string;
  title: string;
  singer: string;
  webContentLink?: string;
  duration?: string;
  album?: string;
  category?: string;
  theme?: string;
  image?: string;
  fileId?: string;
  type?: 'audio' | 'video';
}

export interface VideoProps {
  id: string;
  title: string;
  duration?: string;
  category: string;
  webContentLink?: string;
  thumbnailLink?: string;
  fileId?: string;
}

export interface Playlist {
  id: string;
  name: string;
  images: string[];
  songs: VideoProps[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
