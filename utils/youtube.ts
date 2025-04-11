/**
 * Utility functions for working with YouTube videos
 */

/**
 * Extract YouTube ID from various URL formats
 */
export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Match patterns like:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  
  return match ? match[1] : null;
};

/**
 * Generate thumbnail URL from YouTube ID
 */
export const generateThumbnailUrl = (youtubeId: string): string => {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
};
