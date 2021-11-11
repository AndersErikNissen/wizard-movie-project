<template>
  <main>
    <display-all id="programsDisplayAll" v-if="!checkGenreId.status" :currentGenre="genreId"></display-all>
    <!-- Error handling -->
    <error-get v-if="checkGenreId.status === true" :errorObject="checkGenreId.error"></error-get>
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
      // let check = this.genres.indexOf(this.genreId);
      
      // if(check === -1) {
      //   let obj = {
      //     status: true,
      //     error: {
      //       title: "Homepage",
      //       description: "This genre does not exist in our database.",
      //       returnLink: "/"
      //     }
      //   };
      //   return obj;
      // } 

      return true;
  
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