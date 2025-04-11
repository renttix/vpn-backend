import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'justiceWatchVideo',
  title: 'Justice Watch Video',
  type: 'document',
  // Add fieldsets for organization
  fieldsets: [
    { name: 'youtube', title: 'YouTube Information', options: { collapsible: true, collapsed: false } },
    { name: 'metadata', title: 'Metadata & Taxonomy', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().error('Description is required.'),
    }),
    defineField({
      name: 'channel',
      title: 'Channel',
      type: 'reference',
      to: {type: 'justiceWatchChannel'},
      validation: Rule => Rule.required().error('Channel is required.'),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'The full YouTube URL (e.g., https://youtu.be/tjfapTxcnfg)',
      validation: Rule => Rule.required().error('YouTube URL is required.'),
      fieldset: 'youtube',
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
      description: 'Enter the YouTube video ID (e.g., for https://youtu.be/abc123, enter "abc123")',
      validation: Rule => Rule.required().error('YouTube ID is required.'),
      fieldset: 'youtube',
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL',
      type: 'url',
      description: 'URL to the video thumbnail (e.g., https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)',
      fieldset: 'youtube',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe the image.',
          validation: Rule => Rule.warning('Alternative text is strongly recommended.'),
        })
      ],
      fieldset: 'youtube',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Video duration, e.g., "5:30" or "1:15:00".',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required().error('Published date is required.'),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Add relevant tags for more specific categorization.',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      validation: Rule => Rule.required(),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'isBreakingNews',
      title: 'News',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this video as news to highlight it with a News tag.',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'relatedVideos',
      title: 'Related Videos',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'justiceWatchVideo'}] }
      ],
      description: 'Link to other relevant videos.',
      fieldset: 'metadata',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      channel: 'channel.title',
      media: 'thumbnailImage',
    },
    prepare(selection) {
      const {channel} = selection
      return {...selection, subtitle: channel && `Channel: ${channel}`}
    },
  },
})
