<template>
  <div>
    <div class="header-container">
      <!-- Hamburger icon to toggle the navbar -->
      <a href="javascript:void(0);" class="icon" @click="toggleNavbar">
        <i class="fa fa-bars"></i>
      </a>
      <h1 class="header">Artikel Übersicht</h1>
    </div>

    <!-- Navbar -->
    <div v-if="isNavbarVisible" class="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

        <div class="search-container">
            <input type="text" v-model="search" placeholder="search posts" class="search-bar" />
            <button class="search-button">🔍</button>
        </div>
        <div class="results">
            <p>Search Query: {{ search }}</p>
            <!-- Add any other relevant content or results here -->
        </div>
    <ul v-if="posts.length">
      <li v-for="post in filteredPosts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// =========================================
// import function call to dummyjson api
// =======================================
import fetchPosts from '@/services/postService.js';
import Loader from '@/services/loader';

export default {
  data() {
    return { 
      // check visibility
      isNavbarVisible: false,
      // posts data property, holds the fetched posts
      posts: [],
      search: '',
      Loader: true,
      
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
    toggleNavbar() {
      this.isNavbarVisible = !this.isNavbarVisible;
    },
    // ==========================================================
    // ==========================================================

    async loadPosts() {
      try {
        this.posts = await fetchPosts();
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    },
    async loadJob() {
      try {
        this.posts = await Loader();
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    },
  },
  computed: {
    // ==========================================================
    // do a filter on the posts array and remove any items in it which 
    // don't match the applied filter. Return the new array to the template
    // search is case insensetive 
    // ==========================================================
    filteredPosts: function() {
     return this.posts.filter((post) => {
      return post.title.toLowerCase().includes(this.search.toLowerCase());
     }); 
    }
  }
};
</script>

<style scoped>
h1 {
  color: #333;
  text-align: center;
}

.container {
  display: flex;
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

body {
    font-family: Arial, sans-serif;
}

.navbar {
    /*overflow: hidden;*/
    position: relative;
    width: 100px; /* Width of the navbar */
    background-color: cadetblue; /* Navbar background color */
    /*position: fixed;*/
    height: 100%; /* Full height */
}

.navbar ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0;
}

.navbar ul li {
    margin: 10px 0; /* Space between items */
}

.navbar ul li a { 
    /* Link color */
    color: white;
    text-decoration: none; /* Remove underline */
    padding: 5px; /* Space around the link */
    display: flex; /* Make link fill the entire area */
}

.navbar ul li a:hover {
    background-color: #444; /* Change background on hover */
}

.header {
    margin-left: 20px; /* Space to avoid overlap with navbar */
    padding: 20px; /* Padding for the header */
    background-color: cadetblue; /* Header background color */
    color: black; /* Header text color */
    text-align: center; /* Center align text */
    font-size: 2.5em; /* Font size */
}

.header-container {
  display: flex; /* Align items in a row */
  align-items: center; /* Center items vertically */
  margin: 20px; /* Ensure there's some spacing */
}

.header {
  margin-left: 10px; /* Space between the icon and the title */
}

.main-content {
  flex: 1; /* Allow main content to take available space */
  margin-left: 20px; /* Add space between the navbar and content */
}

.icon {
  cursor: pointer;
  color: black;
  font-size: 50px; /* Increased size of the hamburger icon */
  margin-right: 10px; /* Adds space to the right of the icon */
}

.navbar {
  background-color: #333; /* Navbar background */
  color: white; /* Text color */
  padding: 10px; /* Padding for navbar */
}

.navbar ul {
  list-style: none; /* Remove list bullets */
  padding: 0; /* Remove padding */
}

.navbar ul li {
  margin: 10px 0; /* Space between list items */
}

.navbar ul li a {
  color: white; /* Link color */
  text-decoration: none; /* Remove underline */
}

.search-container {
    display: flex;
    border: 2px solid #ccc;
    border-radius: 25px;
    overflow: hidden;
    background-color: white;
}

.search-bar {
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    outline: none;
}

.search-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.search-button:hover {
    background-color: #45a049;
}

</style>
