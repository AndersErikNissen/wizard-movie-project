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
    border: none;
    background-color: #001244;
    border-radius: 100px;
    padding: .4rem .8rem;
    color: white;
    margin-right: 1rem;
}
.genreTag {
    text-decoration-line: none;
    font-weight: normal;
}
.genreTag:hover {
    background-color: #00ffcc;
    color: white;
}
.genreTag:active {
    transform: scale(.96);
}
</style>