import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe the image.',
          validation: Rule => Rule.required().warning('Alternative text is strongly recommended.'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
          description: 'Credit the source of the image if needed',
        }),
        defineField({
          name: 'focalPoint',
          type: 'object',
          title: 'Focal point',
          description: 'Set the focal point for responsive cropping',
          fields: [
            {name: 'x', type: 'number', title: 'X position'},
            {name: 'y', type: 'number', title: 'Y position'},
          ],
        }),
      ],
      validation: Rule => Rule.required().error('Main image is required.'),
      fieldset: 'images',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe the image.',
          validation: Rule => Rule.warning('Alternative text is strongly recommended if using a secondary image.'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
          description: 'Credit the source of the image if needed',
        }),
        defineField({
          name: 'focalPoint',
          type: 'object',
          title: 'Focal point',
          description: 'Set the focal point for responsive cropping',
          fields: [
            {name: 'x', type: 'number', title: 'X position'},
            {name: 'y', type: 'number', title: 'Y position'},
          ],
        }),
      ],
      // No top-level required validation - this image is optional
      fieldset: 'images',
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
      description: 'The current editorial status of the post.',
      validation: Rule => Rule.required(),
      fieldset: 'metadata', // Assign to Metadata fieldset
    }),
    defineField({
      name: 'isBreakingNews',
      title: 'News',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this post as news to highlight it with a News tag.',
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
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
