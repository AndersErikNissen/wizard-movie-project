<template>
      <section>
          <section>
            <info-header :genreObj="genreObj.movie"></info-header>

            <info-box v-for="(program, index) in programArray.movie.dataArray" :key="index" :program="program"></info-box>
          </section>
          <section>
            <info-header :genreObj="genreObj.series"></info-header>

            <info-box v-for="(program, index) in programArray.series.dataArray" :key="index" :program="program"></info-box>
          </section>

        
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
        },
        programArray: {
            type: Object
        }
    },
    components: {
        'info-header': Header,
        'info-box': InfoBox
    },
    data() {
        return {
            headerObj: {
                title: null,
                counter: null
            }
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
