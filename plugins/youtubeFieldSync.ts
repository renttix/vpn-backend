import { definePlugin } from 'sanity';
import { extractYouTubeId, generateThumbnailUrl } from '../utils/youtube';

/**
 * Plugin to sync YouTube URL with youtubeId and thumbnailUrl fields
 * 
 * This plugin listens for document changes and updates related fields
 * when the youtubeUrl field changes.
 */
export const youtubeFieldSyncPlugin = definePlugin({
  name: 'youtube-field-sync',
  document: {
    // Listen for document changes
    onChange: async (params) => {
      const { patches, document, documentId, getClient } = params;
      
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
      
      try {
        // Extract YouTube ID from the URL
        const youtubeId = extractYouTubeId(youtubeUrl);
        
        if (!youtubeId) {
          // Invalid YouTube URL, return unmodified document
          return { document };
        }
        
        // Generate thumbnail URL
        const thumbnailUrl = generateThumbnailUrl(youtubeId);
        
        // Get a client to patch the document
        const client = getClient({apiVersion: '2023-05-03'});
        
        // Patch the document with the new values
        await client
          .patch(documentId)
          .set({
            youtubeId: youtubeId,
            thumbnailUrl: thumbnailUrl
          })
          .commit();
          
        console.log(`Updated youtubeId and thumbnailUrl for document ${documentId}`);
        
        // Return the document with updated fields
        return {
          document: {
            ...document,
            youtubeId,
            thumbnailUrl
          }
        };
      } catch (error) {
        console.error('Error in youtubeFieldSyncPlugin:', error);
        // Return unmodified document on error
        return { document };
      }
    }
  }
});
