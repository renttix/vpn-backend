import { defineField } from 'sanity';
import { YouTubeUrlInput } from '../components';
import { extractYouTubeId, generateThumbnailUrl } from './youtube';

/**
 * Custom field definition for YouTube URL with automatic field updates
 */
export const youtubeUrlField = defineField({
  name: 'youtubeUrl',
  title: 'YouTube URL',
  type: 'url',
  description: 'The full YouTube URL (e.g., https://youtu.be/tjfapTxcnfg)',
  validation: Rule => Rule.required().error('YouTube URL is required.'),
  fieldset: 'youtube',
  components: {
    input: YouTubeUrlInput
  },
  options: {
    // Store the onChange handler in the options object
    // This will be used by a custom document action
    onChangeHandler: (value: string, context: { getClient: any, documentId: string }) => {
      // Only proceed if we have a value and a document ID
      if (!value || !context.documentId) return;
      
      try {
        // Extract YouTube ID from the URL
        const youtubeId = extractYouTubeId(value);
        if (!youtubeId) return;
        
        // Generate thumbnail URL
        const thumbnailUrl = generateThumbnailUrl(youtubeId);
        
        // Get a client to patch the document
        const client = context.getClient({apiVersion: '2023-05-03'});
        
        // Patch the document with the new values
        client
          .patch(context.documentId)
          .set({
            youtubeId: youtubeId,
            thumbnailUrl: thumbnailUrl
          })
          .commit()
          .catch((error: Error) => {
            console.error('Error updating YouTube related fields:', error);
          });
      } catch (error) {
        console.error('Error in youtubeUrl onChange handler:', error);
      }
    }
  }
});
