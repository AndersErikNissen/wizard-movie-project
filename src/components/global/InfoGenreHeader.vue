<template>
    <section>
        <section>
            <h2> {{ title }} ({{ counter }} total)</h2>
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
h2 {
    margin: 0;
    margin-bottom: .5rem;
}
h2 {
    font-size: 1.3rem;
    font-weight: 300;
}
section {
    width: 100%;
    display: flex;
}
span {
    font-weight: 400;
    font-size: 1.5rem;
}

</style>
