import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'

// Import custom plugins
import deskStructure from './plugins/deskStructure'
import seoGuideInit from './plugins/seoGuideInit'
import {articleTemplatePlugin} from './plugins/articleTemplate'

export default defineConfig({
  name: 'default',
  title: 'VPN London News',

  projectId: 'g7f0f6rs',
  dataset: 'production',
  apiVersion: '2023-05-03',

  plugins: [
    // Custom desk structure
    deskTool({
      structure: deskStructure
    }),
    
    // Vision tool for GROQ queries
    visionTool(),
    
    // Media management plugin
    media(),
    
    // Article templates
    articleTemplatePlugin,
    
    // SEO guide initialization
    seoGuideInit,
  ],

  schema: {
    types: schemaTypes,
  }
})
