<template>
    <section>
        <h1>Homepage</h1>
        <!-- Rember you can useKebab-case when using props in HTML -->
        <info-genre-body :genreObj="testObj"></info-genre-body>

    </section>
</template>

<script>
// Import
import InfoGenreBody from '../components/homepage/InfoGenreBody.vue'
export default {
    name: 'Homepage',
    components: {
        "info-genre-body": InfoGenreBody
    },
    data() {
        return {
            testObj: {
                title: "Yay!!",
                counter: 1111,
                link: "/"
            }
        }
    }
}
</script>

<style scoped>

</style>