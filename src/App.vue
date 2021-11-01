<template>
  <nav>
        <ul>
            <li>
                <router-link to="/">Homepage</router-link>
            </li>
            <li>
                <router-link to="/program-overview">Overview</router-link>
            </li>
            <li>
                <router-link to="/program-template">Template - Placeholder - Dont need a NAV</router-link>
            </li>
            <li>
                <router-link to="/user-favorites">Your Favorites</router-link>
            </li>
        </ul>
    </nav>
  <router-view/>
  <!-- {{ allSeries.entries[2].title }} -->
  {{ allMovies2017.entries[0].title }}
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      allSeries: false,
      allMovies2017: false,
    }
  },
  created() {
    axios
    .get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series')
    .then((response) => this.allSeries = response.data);
    axios
    .get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-20&byTags=genre:action&byYear=2017&byProgramType=movie')
    .then((response) => this.allMovies2017 = response.data);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
