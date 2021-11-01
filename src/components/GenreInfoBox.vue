<template>
    <article>
        <section>
            <h2> {{ genreTitle }} </h2>
            <h3> {{ genreCounter }} </h3>
        </section>


    </article>    
</template>

<script>
export default {
    props: {
        genreTitle: {
            type: String,
            default: 'Genre Title Missing?'
        },
        genreCounter: {
            type: Number,
            default: 0
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
