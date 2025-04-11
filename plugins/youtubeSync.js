import { extractYouTubeId, generateThumbnailUrl } from '../utils/youtube';

/**
 * YouTube Sync Plugin
 * 
 * This plugin adds a document event listener to update youtubeId and thumbnailUrl
 * fields when the youtubeUrl field changes.
 */
export default function youtubeSync() {
  return {
    name: 'youtube-sync',
    document: {
      // Add a document event listener
      onChange: async (params) => {
        const { patches, document } = params;
        
        // Only process justiceWatchVideo documents
        if (document._type !== 'justiceWatchVideo') {
          return { document };
        }
        
        // Check if the youtubeUrl field was changed
        const youtubeUrlPatches = patches.filter(patch => 
          patch.path && patch.path[0] === 'youtubeUrl' && patch.type === 'set'
        );
        
        if (youtubeUrlPatches.length === 0) {
          // No changes to youtubeUrl, return unmodified document
          return { document };
        }
        
        // Get the new youtubeUrl value
        const youtubeUrl = document.youtubeUrl;
        
        if (!youtubeUrl) {
          // URL was cleared, no need to update related fields
          return { document };
        }
        
        // Extract YouTube ID from the URL
        const youtubeId = extractYouTubeId(youtubeUrl);
        
        if (!youtubeId) {
          // Invalid YouTube URL, return unmodified document
          return { document };
        }
        
        // Generate thumbnail URL
        const thumbnailUrl = generateThumbnailUrl(youtubeId);
        
        // Return the document with updated fields
        return {
          document: {
            ...document,
            youtubeId,
            thumbnailUrl
          }
        };
      }
    }
  };
}
