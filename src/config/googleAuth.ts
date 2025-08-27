// Google Drive Configuration for Shared Folder Access
// Replace with your shared Google Drive folder ID or public folder URL

export const GOOGLE_DRIVE_CONFIG = {
    // Shared folder ID (get this from the folder URL: https://drive.google.com/drive/folders/FOLDER_ID)
    SHARED_FOLDER_ID: 'YOUR_SHARED_FOLDER_ID',

    // API key for public access (optional, for higher rate limits)
    API_KEY: 'YOUR_GOOGLE_API_KEY',

    // Base URL for Google Drive API
    BASE_URL: 'https://www.googleapis.com/drive/v3',
};

// Instructions for setup:
// 1. Create a Google Drive folder and add your audio files
// 2. Share the folder as "Anyone with the link can view"
// 3. Get the folder ID from the URL: https://drive.google.com/drive/folders/FOLDER_ID
// 4. Replace YOUR_SHARED_FOLDER_ID with your actual folder ID
// 5. (Optional) Create API key at https://console.cloud.google.com/ for higher rate limits
