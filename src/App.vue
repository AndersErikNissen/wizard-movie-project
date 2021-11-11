<template>
  <the-nav :genres="genres"></the-nav>
  <router-view class="routerview"/>
</template>

<script>
import Nav from './components/global/TheNavigation.vue'
export default {
  name: "App",
  components: {
    "the-nav": Nav,
  },
  data() {
    return {
      genres: ["Action", "Comedy", "Thriller", "War", "Romance", "Drama", "Crime", "Documentary", "Horror"],
    }
  },
  mounted() {
    if(localStorage.getItem("wishlist")) {
      console.log(localStorage.getItem("wishlist"))
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
#app {
  font-family: 'Inter', sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  color: rgb(255, 255, 255);
}
#app{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('./assets/lightning_bg_v1.svg');
  background-position: -10% -10%;
  background-size: 150%;

  background-color: #00050f;
}
* {
  box-sizing: border-box;
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;

  background-color: white;
}

a {
  font-weight: bold;
  color: #000000;
}

 #mainNav a.router-link-exact-active {
  color: #00ffce;
  text-decoration-line: underline;
}
#genreNav a.router-link-exact-active {
  background-color: white;
  color: black;
}
.routerview {
  padding-top: 15vh;
  min-height: 100vh;
}

/*  */
::-webkit-scrollbar {
  width: 12px;
  background-color: #000616;
}
::-webkit-scrollbar-thumb {
  /* background-color: #00ffce; */
  background-color: #001244;
  border-radius: 500px;
}
::-webkit-scrollbar-thumb:active {
  background-color: #00ffcca6;
}
</style>
