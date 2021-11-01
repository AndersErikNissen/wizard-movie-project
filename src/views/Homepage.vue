<template>
    <section>
        <h1>Homepage</h1>
        <info-genre-body></info-genre-body>

    </section>
</template>

<script>
// Import
import InfoGenreBody from '../components/homepage/InfoGenreBody.vue'
export default {
    name: 'Homepage',
    components: {
        "info-genre-body": InfoGenreBody
    }
}
</script>

<style scoped>

</style>