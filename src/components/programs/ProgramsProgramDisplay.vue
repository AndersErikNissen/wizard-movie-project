<template>
  <section>
    <section class="movieSection">
      <info-header title="Movies" :counter="counter[0]"></info-header>
      <section class="movieGrid">
        <info-box class="infoBox" v-for="movie in movieArray" :key="movie.title" :program="movie"></info-box>
      </section>
    </section>
    <section class="seriesSection">
      <info-header title="Series" :counter="counter[1]"></info-header>
      <section class="seriesGrid">
        <info-box class="infoBox" v-for="series in seriesArray" :key="series.title" :program="series"></info-box>
      </section>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import InfoBox from "../global/ProgramInfobox.vue";
import InfoHeader from "../global/InfoGenreHeader.vue";
export default {
  name: "ProProDisplay",
  props: {
      currentGenre: {
          type: String,
          default: "action"
      }
  },
  components: {
    "info-box": InfoBox,
    "info-header": InfoHeader,
  },
  data() {
    return {
      counter: [0, 0],
      movieArray: undefined,
      seriesArray: undefined,
    };
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
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.infoBox:nth-child(odd),
.infoBox:nth-child(odd) {
  justify-self: right;
}
.infoBox {
    margin: 3rem 0;
}
</style>