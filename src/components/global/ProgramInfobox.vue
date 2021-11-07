<template>
    <section>
        <router-link :to="'/program/' + editedLink">
            <!-- V-if is used to check if the right image format exists, if not it will show our "missing img"-img -->
            <!-- Using Object.keys like this: Object.keys(program.plprogram$thumbnails).length !== 0. Would check if it's an empty object we are dealing with, but the other we also look for the right image format -->
            <div v-if="program.plprogram$thumbnails['orig-594x408']" class="div_Img">
                <img :src="program.plprogram$thumbnails['orig-594x408'].plprogram$url" :alt="'Image from the program' + program.title + '!'">
            </div>
            <div v-else class="div_Img">
                <img src="../../assets/noImg1.png" alt="No Image was found, sorry!">
            </div>
<!-- 'orig-365x251' -->
            <div>
                <h4>  {{ program.title }} </h4>
            </div>
        </router-link>
    </section>
</template>

<script>
// Import
export default {
    name: "ProgramInfobox",
    props: {
        program: {
            type: Object,
            required: true
        }
    },
    components: {

    },
    computed: {
        editedLink: function () {
            return this.program.id.split("/")[6];
        }
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.div_Img {
    display: inline-block;
    text-decoration: none;
}
a {
    /* Removing the underline after using router-link */
    text-decoration: none;
}
h4 {
    color: black;
    width: 408px;
    margin: .5rem 0;
    padding: 0;
    font-size: 2rem;
}
</style>
