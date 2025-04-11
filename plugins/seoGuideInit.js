// Initialize SEO Guide document
import {createSeoGuideDocument} from './seoGuideTemplate';
import {definePlugin} from 'sanity';

export default definePlugin({
  name: 'seo-guide-init',
  
  // Initialize the plugin
  setup(config) {
    // Run once when the studio starts
    if (config.client) {
      // Get the client with write access
      const client = config.client.withConfig({apiVersion: '2023-05-03'});
      
      // Create or update the SEO guide document
      setTimeout(() => {
        createSeoGuideDocument(client).catch(err => {
          console.error('Error initializing SEO guide:', err);
        });
      }, 2000); // Delay to ensure the studio is fully loaded
    }
    
    return config;
  }
});
