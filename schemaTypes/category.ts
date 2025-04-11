import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category', // Changed title for clarity
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Crime', value: 'Crime' },
          { title: 'Court', value: 'Court' },
          { title: 'Commentary', value: 'Commentary' },
          { title: 'Watch', value: 'Watch' },
        ],
        layout: 'dropdown', // Use dropdown for selection
      },
      validation: Rule => Rule.required().error('Category selection is required.'),
      // Description field removed - descriptions are fixed based on title
    }),
    defineField({
      name: 'description',
      title: 'Description (Read Only)',
      type: 'text',
      readOnly: true,
      rows: 3, // Set height to 3 rows
      // Removed help text description
    }),
    // Optional: Add a hidden description field if you need to store it,
    // but it's better handled based on the title value in the frontend.
  ],
  // Optional: Update preview if needed, though title is usually sufficient
})
