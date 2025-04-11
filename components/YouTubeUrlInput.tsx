import React, { useCallback, useEffect, useMemo } from 'react'
import { Stack, TextInput, Text, Card, Box } from '@sanity/ui'
import { set, unset, StringInputProps } from 'sanity'
import { extractYouTubeId, generateThumbnailUrl } from '../utils/youtube'

/**
 * YouTube URL Input Component
 * 
 * A custom input component for Sanity Studio that enhances the user experience
 * when working with YouTube videos.
 * 
 * This component handles displaying the URL input and feedback, and also
 * updates the youtubeId and thumbnailUrl fields when the URL changes.
 */
const YouTubeUrlInput = React.forwardRef(function YouTubeUrlInput(
  props: StringInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { value, onChange, readOnly, elementProps = {} } = props
  
  // Extract YouTube ID from the current value
  const youtubeId = useMemo(() => value ? extractYouTubeId(value) : null, [value])
  
  // Update related fields when the URL changes
  useEffect(() => {
    if (value && youtubeId) {
      // Get the parent document path
      const parentPath = props.path.slice(0, -1)
      
      // Generate thumbnail URL
      const thumbnailUrl = generateThumbnailUrl(youtubeId)
      
      // Update the youtubeId field
      try {
        // Use a timeout to ensure the URL field is updated first
        setTimeout(() => {
          // Set the youtubeId field
          props.onChange(set(youtubeId, [...parentPath, 'youtubeId']))
          
          // Set the thumbnailUrl field
          props.onChange(set(thumbnailUrl, [...parentPath, 'thumbnailUrl']))
        }, 100)
      } catch (error) {
        console.error('Error updating YouTube related fields:', error)
      }
    }
  }, [value, youtubeId, props])
  
  // Handle URL change
  const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value
    
    // Update the URL field with a simple set/unset operation
    onChange(newUrl ? set(newUrl) : unset())
  }, [onChange])

  // Render the component
  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        ref={ref}
        value={value || ''}
        onChange={handleUrlChange}
        readOnly={readOnly}
        placeholder="https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID"
      />
      
      {/* Feedback area */}
      {value && (
        <Box>
          {youtubeId ? (
            <Card padding={3} tone="positive" border radius={2}>
              <Text size={1}>
                YouTube ID: <strong>{youtubeId}</strong>
              </Text>
            </Card>
          ) : (
            <Card padding={3} tone="critical" border radius={2}>
              <Text size={1}>
                Invalid YouTube URL. Please enter a valid YouTube URL.
              </Text>
            </Card>
          )}
        </Box>
      )}
    </Stack>
  )
})

export default YouTubeUrlInput
