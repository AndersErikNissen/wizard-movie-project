<template>
    <section>
        <section>
            <h2> {{ genreObj.name }} </h2>
            <h3> {{ genreObj.counter }} found </h3>
        </section>

        <div>
            <!-- <router-link :to="genreObj.link">See more</router-link> -->
        </div>
    </section>    
</template>

<script>
export default {
    name: "InfoGenreHeader",
    props: {
        genreObj: {
            type: Object,
            default: () => ({
                title: 'Title is Missing?',
                counter: 0,
                link: '/'
            })
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
