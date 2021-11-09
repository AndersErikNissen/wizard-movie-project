<template>
  <main>
    <section class="introToGenre">
      <h1>You have choosen the genre {{ genreTitle }}!</h1>
    </section>
    <display-all :currentGenre="genreId"></display-all>
  </main>
</template>

<script>
import Display from "../components/programs/ProgramsProgramDisplay.vue"
export default {
  name: "ProgramsTemplate",
  props: {
    genreId: {
      type: String,
      required: true,
    },
  },
  components: {
      "display-all": Display
  },
  computed: {
    genreTitle: function () {
      return this.genreId.charAt(0).toUpperCase() + this.genreId.slice(1);
    },
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