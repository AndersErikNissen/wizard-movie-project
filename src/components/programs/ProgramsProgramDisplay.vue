<template>
  <section class="outer">
    <header>
      <h1>Welcome to our Genre Overview</h1>
      <p>
        Here you can find <b>{{ counter[0] }} movies</b> and <b>{{ counter[1] }} series</b>
        from the genre {{ titleGenre }}!
      </p>
    </header>
    <section class="movieSection">
      <h2>Movies</h2>
      <section class="movieGrid">
        <info-box
          class="infoBox"
          v-for="movie in movieArray"
          :key="movie.title"
          :program="movie"
        ></info-box>
      </section>
    </section>
    <section v-if="counter[1] > 0" class="seriesSection">
      <h2>Series</h2>
      <section class="seriesGrid">
        <info-box
          class="infoBox"
          v-for="series in seriesArray"
          :key="series.title"
          :program="series"
        ></info-box>
      </section>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import InfoBox from "../global/ProgramInfobox.vue";
export default {
  name: "ProProDisplay",
  props: {
    currentGenre: {
      type: String,
      default: "action",
    },
  },
  components: {
    "info-box": InfoBox,
  },
  data() {
    return {
      counter: [0, 0],
      movieArray: undefined,
      seriesArray: undefined,
    };
  },
  computed: {
    titleGenre: function () {
      return (
        this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1)
      );
    },
  },
  methods: {
    getMovies() {
      //Movie
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.currentGenre +
            "&fields=id,title,plprogram$thumbnails&byProgramType=movie"
        )
        .then((response) => {
          this.movieArray = response.data.entries;
          this.counter[0] = response.data.entries.length;
        });
    },
    getSeries() {
      //Series
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.currentGenre +
            "&fields=id,title,plprogram$thumbnails&byProgramType=series"
        )
        .then((response) => {
          this.seriesArray = response.data.entries;
          this.counter[1] = response.data.entries.length;
        });
    },
  },
  created() {
    this.getMovies();
    this.getSeries();
  },
  watch: {
    currentGenre: function () {
      this.getMovies();
      this.getSeries();
    },
  },
};
</script>

<style scoped>
.movieGrid,
.seriesGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
header {
  min-height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-size: 3rem;
}
h2 {
  text-align: center;
  font-size: 2rem;
}
b {
  font-size: 1.1rem;
}

</style>