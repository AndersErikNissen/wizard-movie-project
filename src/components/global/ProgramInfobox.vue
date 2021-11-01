<template>
    <section>
        <div>
            <h4>  {{ program.title }} </h4>
        </div>

        <div id="div_Img">
            <img v-if="program.img" :src="program.img" :alt="'Image from the program' + program.title + '!'">
            <img v-else src="../../assets/noImg1.png" alt="No Image was found, sorry!">
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
    }
}
</script>

<style scoped>

</style>
