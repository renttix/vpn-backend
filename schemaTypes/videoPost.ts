import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoPost',
  title: 'Video Post',
  type: 'document',
  // Add fieldsets for organization
  fieldsets: [
    { name: 'images', title: 'Images', options: { collapsible: true, collapsed: true } },
    { name: 'metadata', title: 'Metadata & Taxonomy', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default title for search engine results (max 60 characters recommended).',
      validation: Rule => Rule.required().max(60).error('SEO Title is required and should be under 60 characters.'),
      fieldset: 'seo', // Assign to SEO fieldset
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      // rows: 3, // Removed to make the box smaller (default height)
      description: 'Override the default description for search engine results (max 160 characters recommended).',
      validation: Rule => Rule.required().max(160).error('SEO Description is required and should be under 160 characters.'),
      fieldset: 'seo', // Assign to SEO fieldset
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'videoUrl', // Added video URL field
      title: 'Video URL',
      type: 'url', // Using URL type for simplicity
    }),
    defineField({ // Insert thumbnailImage
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
          validation: Rule => Rule.required().warning('Alternative text is strongly recommended.'),
        })
      ],
      validation: Rule => Rule.required().error('Thumbnail image is required.'),
      fieldset: 'images', // Assign to Images fieldset
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary image (Optional)',
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
          validation: Rule => Rule.warning('Alternative text is strongly recommended if using a secondary image.'),
        })
      ],
      // No top-level required validation - this image is optional
      fieldset: 'images', // Assign to Images fieldset
    }),
    defineField({ // Insert duration
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Video duration, e.g., "5:30" or "1:15:00".',
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'description', // Modified description field
      title: 'Description',
      type: 'blockContent', // Changed type to blockContent
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Add relevant tags for more specific categorization.',
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In Review', value: 'review'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio', // Or 'dropdown'
      },
      initialValue: 'draft',
      description: 'The current editorial status of the video post.',
      validation: Rule => Rule.required(),
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'isBreakingNews',
      title: 'News',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this video post as news to highlight it with a News tag.',
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts/Videos',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'post'}, {type: 'videoPost'}] }
      ],
      description: 'Link to other relevant content.',
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'lastUpdatedAt',
      title: 'Last Updated At',
      type: 'datetime',
      readOnly: true,
      description: 'Automatically updated when the document is changed.',
      // Optionally, use initialValue to show the internal field value
      // initialValue: (document) => document._updatedAt,
      // Note: Displaying it might require custom input component or studio customization
      // for real-time reflection without saving. The value IS available via API.
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
  ],

  preview: {
    select: { // Updated preview select
      title: 'title',
      author: 'author.name',
      media: 'thumbnailImage', // Use thumbnailImage for media preview
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
