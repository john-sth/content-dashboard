// =====================================================
// API Call to https://dummyjson.com/
// =====================================================

import axios from 'axios';

// ================================
// function makes a request
// to the API and returns the first
// 10 posts
// ================================

const fetchPosts = async () => {
      const url = 'https://dummyjson.com/posts?limit=10';
      try {
              const response = await axios.get(url);
              // === Return posts data
              return response.data.posts; 
            } catch (error) {
                    console.error('Error fetching posts:', error);
                    throw error; 
                  }
};

// =======================
// make function available
// in project
// =======================
export default fetchPosts;

