<template>
    <section>
        <div>
            <h4>  {{ programTitle }} </h4>
        </div>
        <img :src="programImg" :alt="'Image from the program' + programTitle + '!'">
    </section>
</template>

<script>
// Import
import defaultImg from '../assets/noImg1.png'
export default {
    props: {
        programImg: {
            type: String,
            default: defaultImg
        }
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>

</style>
