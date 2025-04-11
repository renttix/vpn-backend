# Justice Watch Components

This document explains the custom components used in the Justice Watch feature of the Sanity Studio.

## YouTubeUrlInput Component

The `YouTubeUrlInput` component is a custom input component for Sanity Studio that enhances the user experience when working with YouTube videos. It provides the following functionality:

1. Automatically extracts the YouTube video ID from various YouTube URL formats
2. Automatically generates a thumbnail URL based on the YouTube video ID
3. Provides visual feedback on whether the entered URL is a valid YouTube URL
4. Updates related fields (`youtubeId` and `thumbnailUrl`) automatically

### Usage

The component is used in the `justiceWatchVideo` schema to handle the `youtubeUrl` field:

```typescript
defineField({
  name: 'youtubeUrl',
  title: 'YouTube URL',
  type: 'url',
  description: 'The full YouTube URL (e.g., https://youtu.be/tjfapTxcnfg)',
  validation: Rule => Rule.required().error('YouTube URL is required.'),
  fieldset: 'youtube',
  components: {
    input: YouTubeUrlInput
  }
})
```

### Supported URL Formats

The component supports the following YouTube URL formats:

- Standard watch URLs: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short URLs: `https://youtu.be/VIDEO_ID`
- Shorts URLs: `https://youtube.com/shorts/VIDEO_ID`
- Embed URLs: `https://www.youtube.com/embed/VIDEO_ID`

### Troubleshooting

If you encounter issues with the component:

1. Make sure the `youtubeId` and `thumbnailUrl` fields are defined in your schema
2. Check the browser console for any error messages
3. Verify that the URL you're entering is a valid YouTube URL
4. Restart the Sanity Studio if necessary

## Implementation Details

The component is implemented as a React forwardRef component to comply with Sanity's component API. It uses the following Sanity UI components:

- `Stack`: For layout
- `TextInput`: For the URL input
- `Box`: For wrapping feedback elements
- `Card`: For displaying feedback
- `Text`: For displaying text

The component uses React's `useMemo` hook to efficiently extract the YouTube ID from the URL and avoid unnecessary re-computations. It also uses Sanity's patch operations (`set` and `unset`) to update related fields.

### Current Implementation

We've simplified the YouTube video entry process to avoid the "getAttribute only applies to plain objects" error that was occurring with the automatic field synchronization.

#### Changes Made:

1. Removed the custom `YouTubeUrlInput` component that was causing errors
2. Changed the YouTube ID field to be manually editable (no longer read-only)
3. Updated field descriptions to guide users on how to manually extract YouTube IDs and create thumbnail URLs
4. Created a `YOUTUBE_MANUAL_GUIDE.md` document with detailed instructions for content editors

#### Manual Process:

Content editors now need to:
1. Enter the YouTube URL
2. Manually extract and enter the YouTube ID
3. Manually create and enter the thumbnail URL or upload a custom thumbnail image

#### Future Improvements:

In the future, we plan to revisit the automatic field synchronization approach with a more robust implementation that:
1. Uses Sanity's document actions or hooks instead of custom input components
2. Implements proper error handling for non-plain objects
3. Uses a more reliable approach to update related fields

For now, the manual approach allows content editors to add videos without encountering errors, while we work on a more elegant solution.
