<template>
  <main>
    <home-intro></home-intro>
    <!-- Remember you can use Kebab-case when using props in HTML -->
    <info-genre-body
      class="genreBody"
      v-for="genre in genres"
      :key="genre"
      :typeOfGenre="genre"
    ></info-genre-body>
  </main>
</template>

<script>
// Import
import InfoGenreBody from "../components/homepage/InfoGenreBody.vue";
import HomeIntro from "../components/homepage/HomepageIntro.vue";
// import axios from 'axios';
export default {
  name: "Homepage",
  components: {
    "info-genre-body": InfoGenreBody,
    "home-intro": HomeIntro,
  },
  data() {
    return {
      genres: [
        "action",
        "comedy",
        "thriller",
        "war",
        "romance",
        "drama",
        "crime",
        "documentary",
        "horror",
      ],
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
  .genreBody {
    margin: 2rem 4rem;
    position: relative;
    z-index: 0;
  }
@media screen and (max-width: 1024px) {
    .genreBody {
      margin: 1rem;
    }
    }
</style>