<template>
    <section>
        <h1>Homepage</h1>
        <!-- Rember you can useKebab-case when using props in HTML -->
        <info-genre-body v-for="genre in genres" :key="genre" :typeOfGenre="genre"></info-genre-body>

    </section>
</template>

<script>
// Import
import InfoGenreBody from '../components/homepage/InfoGenreBody.vue';
// import axios from 'axios';
export default {
    name: 'Homepage',
    components: {
        "info-genre-body": InfoGenreBody
    },
    data() {
        return {
            genres: ["action", "comedy", "thriller", "war", "romance", "drama", "crime", "documentary", "horror"],
        }
    },
    methods: {
      
    },
    created() {

  }
}
</script>

<style scoped>

</style>