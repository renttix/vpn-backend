import {definePlugin} from 'sanity'

// Create a document action for SEO guidance
export const seoHelperPlugin = definePlugin({
  name: 'seo-helper',
  document: {
    // Add a new document action
    actions: (prev, context) => {
      const {documentStore, getClient} = context
      
      // Only add the action for post and videoPost document types
      return prev.map(originalAction => {
        // Return a new action that wraps the original
        if (originalAction.name === 'publish') {
          return {
            ...originalAction,
            execute: async () => {
              // Get the current document
              const doc = documentStore.getDocument()
              
              // If no document, just execute the original action
              if (!doc) {
                return originalAction.execute()
              }
              
              // Only run SEO checks for post and videoPost types
              if (!['post', 'videoPost'].includes(doc._type)) {
                return originalAction.execute()
              }
              
              // Calculate SEO score
              const seoScore = calculateSeoScore(doc)
              
              // Generate SEO suggestions
              const suggestions = generateSeoSuggestions(doc)
              
              // If score is below threshold, show confirmation dialog
              if (seoScore < 70) {
                const confirmed = window.confirm(
                  `⚠️ SEO Score: ${seoScore}%\n\n` +
                  `Your content has some SEO issues:\n\n` +
                  `${suggestions.join('\n• ')}\n\n` +
                  `Do you still want to publish?`
                )
                
                if (!confirmed) {
                  return {type: 'canceled'}
                }
              }
              
              // Execute the original action
              return originalAction.execute()
            }
          }
        }
        
        // Add a new SEO Check action
        if (originalAction.name === 'discardChanges') {
          const seoCheckAction = {
            name: 'seoCheck',
            label: 'SEO Check',
            icon: () => '🔍',
            onHandle: () => {
              // Get the current document
              const doc = documentStore.getDocument()
              
              // If no document, do nothing
              if (!doc) {
                return
              }
              
              // Only run SEO checks for post and videoPost types
              if (!['post', 'videoPost'].includes(doc._type)) {
                window.alert('SEO checks are only available for articles and videos.')
                return
              }
              
              // Calculate SEO score
              const seoScore = calculateSeoScore(doc)
              
              // Generate SEO suggestions
              const suggestions = generateSeoSuggestions(doc)
              
              // Determine color based on score
              const scoreColor = seoScore >= 80 ? '🟢' : seoScore >= 50 ? '🟠' : '🔴'
              
              // Show SEO report
              window.alert(
                `${scoreColor} SEO Score: ${seoScore}%\n\n` +
                `Suggestions:\n• ${suggestions.join('\n• ')}\n\n` +
                `SEO Best Practices:\n` +
                `• Use your target keyword in the title, SEO title, and first paragraph\n` +
                `• Keep SEO title under 60 characters\n` +
                `• Keep SEO description under 160 characters\n` +
                `• Use descriptive alt text for all images\n` +
                `• Include internal links to other relevant content\n` +
                `• Use headings (H2, H3) to structure your content\n` +
                `• Aim for at least 300 words for standard articles`
              )
            }
          }
          
          return [seoCheckAction, originalAction]
        }
        
        return originalAction
      })
    }
  }
})

// Calculate SEO score based on document content
function calculateSeoScore(doc: any): number {
  let score = 0
  let maxScore = 0
  
  // Check if SEO title exists and is not too long
  if (doc.seoTitle) {
    score += 15
    if (doc.seoTitle.length <= 60) {
      score += 5
    }
  }
  maxScore += 20
  
  // Check if SEO description exists and is not too long
  if (doc.seoDescription) {
    score += 15
    if (doc.seoDescription.length <= 160) {
      score += 5
    }
  }
  maxScore += 20
  
  // Check if main image exists and has alt text
  if (doc.mainImage) {
    score += 10
    if (doc.mainImage.alt) {
      score += 10
    }
  }
  maxScore += 20
  
  // Check if slug exists
  if (doc.slug && doc.slug.current) {
    score += 10
  }
  maxScore += 10
  
  // Check if categories exist
  if (doc.categories && doc.categories.length > 0) {
    score += 10
  }
  maxScore += 10
  
  // Check if tags exist
  if (doc.tags && doc.tags.length > 0) {
    score += 10
  }
  maxScore += 10
  
  // Check if body content exists
  if (doc.body && doc.body.length > 0) {
    score += 10
  }
  maxScore += 10
  
  // Calculate percentage
  return Math.round((score / maxScore) * 100)
}

// Generate SEO suggestions based on document content
function generateSeoSuggestions(doc: any): string[] {
  const suggestions: string[] = []
  
  // SEO title suggestions
  if (!doc.seoTitle) {
    suggestions.push('Add an SEO title to improve search engine visibility')
  } else if (doc.seoTitle.length > 60) {
    suggestions.push(`SEO title is ${doc.seoTitle.length} characters. Consider shortening it to 60 characters or less`)
  }
  
  // SEO description suggestions
  if (!doc.seoDescription) {
    suggestions.push('Add an SEO description to improve search engine visibility')
  } else if (doc.seoDescription.length > 160) {
    suggestions.push(`SEO description is ${doc.seoDescription.length} characters. Consider shortening it to 160 characters or less`)
  }
  
  // Image alt text suggestions
  if (doc.mainImage && !doc.mainImage.alt) {
    suggestions.push('Add alt text to the main image for better accessibility and SEO')
  }
  
  // Slug suggestions
  if (!doc.slug || !doc.slug.current) {
    suggestions.push('Add a slug for the article URL')
  }
  
  // Category suggestions
  if (!doc.categories || doc.categories.length === 0) {
    suggestions.push('Add at least one category to help organize and discover your content')
  }
  
  // Tag suggestions
  if (!doc.tags || doc.tags.length === 0) {
    suggestions.push('Add relevant tags to improve content discoverability')
  }
  
  // Body content suggestions
  if (!doc.body || doc.body.length === 0) {
    suggestions.push('Add body content to your article')
  }
  
  // If no suggestions, everything looks good
  if (suggestions.length === 0) {
    suggestions.push('Great job! Your content meets all basic SEO requirements')
  }
  
  return suggestions
}
