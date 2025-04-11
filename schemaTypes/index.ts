import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import videoPost from './videoPost'
import tag from './tag'
import breakingNews from './breakingNews'
import justiceWatchChannel from './justiceWatchChannel' // Import the Justice Watch Channel schema
import justiceWatchVideo from './justiceWatchVideo' // Import the Justice Watch Video schema
import tipSubmission from './tipSubmission' // Import the Tip Submission schema

export const schemaTypes = [
  // Content types
  post, 
  videoPost, 
  breakingNews, 
  justiceWatchVideo, // Add Justice Watch Video
  tipSubmission, // Add Tip Submission
  
  // Reference types
  author, 
  category, 
  tag, 
  justiceWatchChannel, // Add Justice Watch Channel
  
  // Block types
  blockContent
]
