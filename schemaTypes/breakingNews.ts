import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'breakingNews',
  title: 'News',
  type: 'document',
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
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default title for search engine results (max 60 characters recommended).',
      validation: Rule => Rule.max(60).warning('SEO titles longer than 60 characters may be truncated.')
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Override the default description for search engine results (max 160 characters recommended).',
      validation: Rule => Rule.max(160).warning('SEO descriptions longer than 160 characters may be truncated.')
    }),
    defineField({
      name: 'mainMedia',
      title: 'Main Media (Optional Image or Video URL)',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: Rule => Rule.required().error('Alt text is required for images.'),
            }),
          ],
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video URL',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Video URL (e.g., YouTube, Vimeo)',
              validation: Rule => Rule.required(),
            }),
          ],
        },
      ],
      validation: Rule => Rule.max(1).error('Only one image or video can be added as main media.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The main content of the news item.',
    }),
    // Add publishedAt for consistency, even if simpler
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(), // Default to now for speed
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainMedia', // Update preview to use mainMedia
    },
  },
})
