<template>
  <section class="outer">
    <section id="genreTitle">
      <h2>{{ newGenreTitle }}</h2>
      <router-link :to="'/programs/' + typeOfGenre">See all</router-link>
    </section>
    <section class="shellMovie">
      <info-header title="Movies" :counter="genre.counter[0]"></info-header>
      <section class="outerInfoBox_movie">
        <info-box
          class="infoBox"
          v-for="(program, index) in genre.programs.movie"
          :key="index"
          :program="program"
        ></info-box>
      </section>
      <div class="clickDiv">
        <click-button
          title="More Movies"
          @click="addRangeMovie()"
        ></click-button>
      </div>
    </section>

    <section v-if="!noSeries" class="shellSeries">
      <info-header title="Series" :counter="genre.counter[1]"></info-header>
      <section class="outerInfoBox_series">
        <info-box
          class="infoBox"
          v-for="(program, index) in genre.programs.series"
          :key="index"
          :program="program"
        ></info-box>
      </section>
      <div v-if="!under10series" class="clickDiv">
        <click-button
          title="More Series"
          @click="addRangeSeries()"
        ></click-button>
      </div>
    </section>
  </section>
</template>

<script>
// Import
import axios from "axios";
import Header from "../global/InfoGenreHeader.vue";
import InfoBox from "../global/ProgramInfobox.vue";
import ClickButton from "../buttons/ClickButton.vue";
// import axios from 'axios';
export default {
  name: "InfoGenreBody",
  props: {
    typeOfGenre: {
      type: String,
      required: true,
    },
  },
  components: {
    "info-header": Header,
    "info-box": InfoBox,
    "click-button": ClickButton,
  },
  data() {
    return {
      loaded: false,
      genre: {
        counter: [], // Used here
        seeAll: null, // Used to Overview
        range: [10, 10], // Used here
        programs: {
          movie: null,
          series: null,
        }, // Used here and to ProgramTemplate
      },
      noSeries: false,
      under10series: false,
    };
  },
  computed: {
    newGenreTitle: function () {
      // Make first letter uppercase.
      return (
        this.typeOfGenre.charAt(0).toUpperCase() + this.typeOfGenre.slice(1)
      );
    },
  },
  methods: {
    // I spend a lof of time coming up with the best way to fetch data, and didn't wanna create many methods for each genre.
    // That is when I realised that I should just get the date in this component and not in Homepage.vue.
    getMovies() {
      //Movie
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.typeOfGenre +
            "&fields=id,title,plprogram$thumbnails&byProgramType=movie&range=1-" +
            this.genre.range[0]
        )
        .then((response) => {
          this.genre.programs.movie = response.data.entries;
        });
    },
    getSeries() {
      //Series
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.typeOfGenre +
            "&fields=id,title,plprogram$thumbnails&byProgramType=series&range=1-" +
            this.genre.range[1]
        )
        .then((response) => {
          this.genre.programs.series = response.data.entries;

          // If there are no series to a genre, then dont show that content area, same with "show more btn".
          if(response.data.entries.length === 0) {
            this.noSeries = true;
          }
          if(response.data.entries.length < 12) {
            this.under10series = true;
          }
          
        });
    },
    getCount() {
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.typeOfGenre +
            "&fields=id&byProgramType=movie"
        )
        .then((response) => {
          this.genre.counter[0] = response.data.entries.length;
        });
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:" +
            this.typeOfGenre +
            "&fields=id&byProgramType=series"
        )
        .then((response) => {
          this.genre.counter[1] = response.data.entries.length;
        });
      this.loaded = true;
    },
    addRangeMovie() {
      this.genre.range[0] += 10;
      this.getMovies();
    },
    addRangeSeries() {
      this.genre.range[1] += 10;
      this.getSeries();
    },
  },
  created() {
    //Axios is used to make it more simple to use CRUD-operations.
    this.getMovies();
    this.getSeries();
    this.getCount();
  },
};
</script>

<style scoped>
.outerInfoBox_movie,
.outerInfoBox_series {
  /* Help from this article: https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6 */
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  padding: 0 0 1rem 0;
}
.infoBox {
  flex: 0 0 auto;
}

.shellMovie {
  margin: 0 0 2rem 0;
}
/* Scrollbar design */
::-webkit-scrollbar {
  height: 8px;
  background-color: #00144b13;
  border-radius: 500px;
}
::-webkit-scrollbar-thumb {
  /* background-color: #00ffce; */
  background-color: #000e35e7;
  border-radius: 500px;
}
::-webkit-scrollbar-thumb:active {
  background-color: #00ffcca6;
}

.clickDiv {
  width: 100%;
  display: flex;
  /* justify-content: center; */
  margin: 1rem 0;
}
#genreTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#genreTitle h2 {
  font-size: 2rem;
  margin: 0;
  margin-bottom: 1rem;
}
#genreTitle a {
  color: white;
}
</style>
