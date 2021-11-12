<template>
  <main>
    <display-all id="programsDisplayAll" v-if="checkGenreId === true" :currentGenre="genreId"></display-all>
    <!-- Error handling -->
    <error-get v-if="checkGenreId.errorStatus" :errorObject="checkGenreId.errorObj"></error-get>
  </main>
</template>

<script>
import Display from "../components/programs/ProgramsProgramDisplay.vue"
import ErrorGet from "../components/global/ErrorGET.vue"
export default {
  name: "ProgramsTemplate",
  props: {
    genreId: {
      type: String,
      required: true,
    },
  },
  components: {
      "display-all": Display,
      "error-get": ErrorGet
  },
  data() {
    return {
      genres: ["action", "comedy", "thriller", "war", "romance", "drama", "crime", "documentary", "horror"],
      error: false,
    }
  },
  computed: {
    genreTitle: function () {
      return this.genreId.charAt(0).toUpperCase() + this.genreId.slice(1);
    },
    checkGenreId: function () {
      // Check if the genre is in the Database.
      let checkGenre = this.genres.find(item => item == this.genreId);

      if(!checkGenre) {
        checkGenre = {
          errorStatus: true,
          errorObj: {
            title: "Homepage",
            description: "This genre does not exist in our database.",
            returnLink: "/"
          }
        };
      } else {
        checkGenre = true;
      }
      console.log(checkGenre)
      return checkGenre;
    }
  },
  methods: {
   
  },
};
</script>

<style scoped>
h1 {
  font-size: 4rem;
  text-align: center;
  padding: 0 1rem;
}
#programsDisplayAll {
  margin: 2rem 4rem;
  margin-bottom: 0;
}

@media screen and (max-width: 1024px) {
    #programsDisplayAll {
      margin: 1rem;
      margin-bottom: 0;
    }
    }

</style>