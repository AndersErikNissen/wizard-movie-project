<template>
    <section>
        <section>
            <h2> {{ title }} </h2>
            <h3> {{ counter }} found </h3>
        </section>
    </section>    
</template>

<script>
export default {
    name: "InfoGenreHeader",
    props: {
        title: {
            type: String
        },
        counter: {
            type: Number
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
