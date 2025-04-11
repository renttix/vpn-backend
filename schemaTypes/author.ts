import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'position',
      title: 'Position/Role',
      type: 'string',
      description: 'e.g., Staff Writer, Editor-in-Chief'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email().warning('Invalid email format'),
      description: 'Author\'s contact email (optional).'
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter URL',
      type: 'url',
      description: 'Link to Twitter profile (optional).'
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Link to LinkedIn profile (optional).'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
