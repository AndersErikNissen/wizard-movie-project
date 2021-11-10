<template>
  <main>
    <section v-if="checkGenreId" class="introToGenre">
      <h1>You have choosen the genre {{ genreTitle }}!</h1>
    </section>
    <display-all v-if="checkGenreId" :currentGenre="genreId"></display-all>
    <!-- Error handling -->
    <error-get v-if="checkGenreId.status == true" :errorObject="checkGenreId.error"></error-get>
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
      let check = this.genres.indexOf(this.genreId);
      
      if(check == -1) {
        let obj = {
          status: true,
          error: {
            title: "Homepage",
            description: "This genre does not exist in our database.",
            returnLink: "/"
          }
        };
        return obj;
      } else {
        return this.genreId;
      }
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
</style>