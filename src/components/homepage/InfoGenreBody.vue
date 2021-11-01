<template>
      <section>
          <info-header :genreObj="genreObj"></info-header>
          
        <info-box v-for="(item, index) in items" :key="index" :program="item">
            
        </info-box>
        
      </section>
</template>

<script>
// Import
import Header from './InfoGenreHeader.vue';
import InfoBox from '../global/ProgramInfobox.vue';
// import axios from 'axios';
export default {
    name: "InfoGenreBody",
    props: {
        genreObj: {
            type: Object,
            // One way to have a default: is to use a function to set an object's default
            default: () => ({
                title: 'Title is Missing?',
                counter: 0,
                link: '/'
            })
        }
    },
    components: {
        'info-header': Header,
        'info-box': InfoBox
    },
    data() {
        return {
            items: [
                {
                    title: "Test 1",
                    img: false
                },
                {
                    title: "Test 2",
                    img: false
                },
            ]
        }
    },
    created() {
        //Axios is used to make it more simple to use CRUD-operations.
        // axios
        // .get()
    }
}
</script>

<style scoped>


</style>
