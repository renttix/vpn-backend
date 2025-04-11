import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tipSubmission',
  title: 'Tip Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            storeOriginalFilename: true,
          },
        },
      ],
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Under Review', value: 'reviewing' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Notes for internal use only',
    }),
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'email',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || 'No Subject',
        subtitle: `From: ${subtitle || 'Unknown'} - ${
          date ? new Date(date).toLocaleString() : 'Unknown date'
        }`,
      };
    },
  },
});
