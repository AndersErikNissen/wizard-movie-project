<template>
    <section>
        <div>
            <h4>  {{ program.title }} </h4>
        </div>
        <!-- V-if is used to check if the right image format exists, if not it will show our "missing img"-img -->
        <!-- Using Object.keys like this: Object.keys(program.plprogram$thumbnails).length !== 0. Would check if it's an empty object we are dealing with, but the other we also look for the right image format -->
        <div v-if="program.plprogram$thumbnails['orig-93x165']" class="div_Img">
            <img :src="program.plprogram$thumbnails['orig-93x165'].plprogram$url" :alt="'Image from the program' + program.title + '!'">
        </div>
        <div v-else class="div_Img">
            <img src="../../assets/noImg1.png" alt="No Image was found, sorry!">
        </div>
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
    data() {
        return {

        }
    },
}
</script>

<style scoped>

</style>
