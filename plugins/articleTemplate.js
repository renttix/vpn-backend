// Article Template Plugin
import {definePlugin} from 'sanity';

export const articleTemplatePlugin = definePlugin({
  name: 'article-template-plugin',
  document: {
    // Add a new document action for creating articles from templates
    newDocumentOptions: (prev, {creationContext}) => {
      // Only show templates in the global "new document" menu
      if (creationContext.type !== 'global') {
        return prev;
      }
      
      // Add templates to the list of new document options
      return [
        ...prev,
        {
          templateId: 'news-article',
          title: 'News Article',
          description: 'Standard news article with SEO fields pre-filled',
          schemaType: 'post',
          icon: () => '📰',
          parameters: {
            template: 'news'
          }
        },
        {
          templateId: 'feature-article',
          title: 'Feature Article',
          description: 'In-depth feature article with SEO fields pre-filled',
          schemaType: 'post',
          icon: () => '📝',
          parameters: {
            template: 'feature'
          }
        },
        {
          templateId: 'opinion-article',
          title: 'Opinion Piece',
          description: 'Opinion or editorial article with SEO fields pre-filled',
          schemaType: 'post',
          icon: () => '💭',
          parameters: {
            template: 'opinion'
          }
        },
        {
          templateId: 'news',
          title: 'News',
          description: 'News article with SEO fields pre-filled',
          schemaType: 'post',
          icon: () => '🔥',
          parameters: {
            template: 'breaking'
          }
        }
      ];
    },
    
    // Handle template creation
    templateParameters: (prev, {documentId, schemaType, parameters}) => {
      // Only handle post document types
      if (schemaType !== 'post') {
        return prev;
      }
      
      // Get the template type from parameters
      const templateType = parameters?.template;
      
      // If no template type, return previous parameters
      if (!templateType) {
        return prev;
      }
      
      // Create a new document based on the template type
      switch (templateType) {
        case 'news':
          return {
            ...prev,
            title: 'New News Article',
            seoTitle: 'News Article Title (60 chars max) - VPN London News',
            seoDescription: 'Concise summary of the news article in 160 characters or less. Include primary keyword and make it compelling for clicks.',
            status: 'draft',
            body: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Start your news article here. Include your primary keyword in the first paragraph. Aim for at least 300 words total.'
                  }
                ],
                markDefs: []
              }
            ],
            isBreakingNews: false
          };
          
        case 'feature':
          return {
            ...prev,
            title: 'New Feature Article',
            seoTitle: 'Feature Article Title (60 chars max) - VPN London News',
            seoDescription: 'Engaging description of your feature article in 160 characters or less. Include primary keyword and highlight unique angle.',
            status: 'draft',
            body: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Start your feature article here with an engaging introduction. Include your primary keyword in the first paragraph. Aim for at least 1,000 words for in-depth features.'
                  }
                ],
                markDefs: []
              },
              {
                _type: 'block',
                style: 'h2',
                children: [
                  {
                    _type: 'span',
                    text: 'First Subheading (Include Keyword)'
                  }
                ],
                markDefs: []
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Continue your article here...'
                  }
                ],
                markDefs: []
              }
            ],
            isBreakingNews: false
          };
          
        case 'opinion':
          return {
            ...prev,
            title: 'New Opinion Piece',
            seoTitle: 'Opinion: Article Title (60 chars max) - VPN London News',
            seoDescription: 'Thought-provoking description of your opinion piece in 160 characters or less. Include primary keyword and highlight perspective.',
            status: 'draft',
            body: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Start your opinion piece here with a strong statement or perspective. Include your primary keyword in the first paragraph. Aim for at least 600 words for opinion pieces.'
                  }
                ],
                markDefs: []
              },
              {
                _type: 'block',
                style: 'h2',
                children: [
                  {
                    _type: 'span',
                    text: 'First Argument (Include Keyword)'
                  }
                ],
                markDefs: []
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Continue your article here...'
                  }
                ],
                markDefs: []
              }
            ],
            isBreakingNews: false
          };
          
        case 'breaking':
          return {
            ...prev,
            title: 'New News',
            seoTitle: 'News Title (60 chars max) - VPN London News',
            seoDescription: 'News about [topic] in 160 characters or less. Include primary keyword and emphasize importance.',
            status: 'draft',
            body: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Start your news article here with the most important information. Include your primary keyword in the first paragraph. Be concise but comprehensive.'
                  }
                ],
                markDefs: []
              }
            ],
            isBreakingNews: true
          };
          
        default:
          return prev;
      }
    }
  }
});
