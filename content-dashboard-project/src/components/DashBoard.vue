<template>
  <div>
    <h1>Artikel Übersicht</h1>
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
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
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
