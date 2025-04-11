# Manual YouTube Video Entry Guide

This guide explains how to manually enter YouTube video information in the Justice Watch Video schema.

## Getting the YouTube ID

The YouTube ID is a unique identifier for each video. Here's how to find it:

1. **From a standard YouTube URL**:
   - Example: `https://www.youtube.com/watch?v=abc123`
   - The ID is the value after `v=`: `abc123`

2. **From a shortened YouTube URL**:
   - Example: `https://youtu.be/abc123`
   - The ID is the value after `youtu.be/`: `abc123`

3. **From a YouTube embed URL**:
   - Example: `https://www.youtube.com/embed/abc123`
   - The ID is the value after `embed/`: `abc123`

## Creating Thumbnail URLs

YouTube automatically generates thumbnails for videos. You can use these URLs:

1. **Maximum resolution thumbnail**:
   - `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
   - Replace `VIDEO_ID` with the YouTube ID

2. **High quality thumbnail**:
   - `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
   - Replace `VIDEO_ID` with the YouTube ID

3. **Medium quality thumbnail**:
   - `https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg`
   - Replace `VIDEO_ID` with the YouTube ID

4. **Standard quality thumbnail**:
   - `https://img.youtube.com/vi/VIDEO_ID/default.jpg`
   - Replace `VIDEO_ID` with the YouTube ID

## Example

For the YouTube video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

- **YouTube ID**: `dQw4w9WgXcQ`
- **Thumbnail URL**: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

## Adding a Video to Justice Watch

1. Enter the full YouTube URL in the "YouTube URL" field
2. Extract the YouTube ID as shown above and enter it in the "YouTube ID" field
3. Create a thumbnail URL as shown above and enter it in the "Thumbnail URL" field
4. Alternatively, upload a custom thumbnail image using the "Thumbnail Image" field

## Future Improvements

In the future, we plan to implement automatic extraction of YouTube IDs and thumbnail URLs to simplify this process.
