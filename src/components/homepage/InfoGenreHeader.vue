<template>
    <!-- <article>
        <section>
            <h2> {{ genreTitle }} </h2>
            <h3> {{ genreCounter }} </h3>
        </section>

        <div>
            <router-link :to="genreLink">See more</router-link>
        </div>
    </article>     -->
    <div>
        <h2>Genre Test</h2>
    </div>
</template>

<script>
export default {
    name: "InfoGenreHeader",
    props: {
        genreTitle: {
            type: String,
            default: 'Genre Title Missing?'
        },
        genreCounter: {
            type: String,
            default: "0"
        }
    },
    date() {
        return {
            
        }
    },
}
</script>

<style scoped>


</style>
