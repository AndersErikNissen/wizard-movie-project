<template>
    <router-link :to="'/programs/' + url" class="genreTag" tag="button">
        {{ title }}
    </router-link>
</template>

<script>
export default {
    name: "GenreTag",
    props: {
        title: {
            type: String
        }
    },
    computed: {
        url: function() {
            return this.title.toLowerCase();
        }
    }
}
</script>

<style scoped>
.genreTag {
    display: inline-block;
    min-width: 5ch;
    text-align: center;
    border: 1px solid black;
    border-radius: 100px;
    padding: .8rem 1.1rem;
    color: black;
    background-color: transparent;
    margin-right: 1rem;
}
.genreTag {
    text-decoration-line: none;
    font-weight: normal;
}
.genreTag:hover {
    background-color: black;
    color: white;
}
.genreTag:active {
    transform: scale(.96);
}
</style>