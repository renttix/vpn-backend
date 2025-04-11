import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'justiceWatchChannel',
  title: 'Justice Watch Channel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Channel Name',
      type: 'string',
      validation: Rule => Rule.required().error('Channel name is required.'),
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
      rows: 3,
      validation: Rule => Rule.required().error('Channel description is required.'),
    }),
    defineField({
      name: 'customUrl',
      title: 'YouTube Custom URL',
      type: 'string',
      description: 'The YouTube handle (e.g., @vpnldn)',
      validation: Rule => Rule.required().error('YouTube custom URL is required.'),
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Channel Thumbnail URL',
      type: 'url',
      description: 'URL to the channel thumbnail image',
    }),
    defineField({
      name: 'channelImage',
      title: 'Channel Image',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'customUrl',
      media: 'channelImage',
    },
  },
})
