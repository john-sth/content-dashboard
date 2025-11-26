<template>
  <div>
    <h1>Artikel Übersicht</h1>
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </li>
    </ul>
    <p v-else>No posts available.</p>
  </div>
</template>

<script>
// =========================================
// import function call to dummyjson api
// =======================================
import fetchPosts from '@/services/postService.js';

export default {
  data() {
    return {
      // posts data property, holds the fetched posts
      posts: [],
    };
  },
  // ========================================================
  // use mounted hook after adding the component to the DOM  
  // initiates loadPosts function for the engine to render later
  // ========================================================
  mounted() {
    this.loadPosts();
  },
  methods: {
    // ==========================================================
    // update posts array 
    // Fetch posts using the service in services/postService.js
    // use async for non-blocking call
    // ==========================================================
    async loadPosts() {
      try {
        this.posts = await fetchPosts();
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
  text-align: center;
}

/* Center items horizontally 
   Center items vertically (if needed)
   Stack items in a column */
.posts-container {
  display: flex;  
  /* wrap to the next line */
  flex-wrap: wrap;
  justify-content: center; 
  align-items: flex-start;
  flex-direction: column;
  min-height: 80vh; 
  margin: 0 auto;
}


ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: flex;
  /* wrap children to the next line */
  flex-wrap: wrap;
  justify-content: center;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.post-item {
  /* add space between articles */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: transform 0.6s ease, font-weight 0.6s ease;
  width: 80%;
  max-width: 600px;
  text-align: center;  
}

.post-item:hover {
  transform: scale(1.06); /* Increase size on hover */
  border-color: cadetblue;
  color: black;
  background-color: cadetblue;
  /*font-weight: bold; /* Make font bold on hover */
  z-index: 1;
}

</style>
