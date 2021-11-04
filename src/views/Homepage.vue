<template>
    <section>
        <h1>Homepage</h1>
        <!-- Rember you can useKebab-case when using props in HTML -->
        <info-genre-body :genreObj="genreArray[0].info" :programArray="genreArray[0].data"></info-genre-body>

        <div>
            <button @click="logData"></button>
        </div>
     
    </section>
</template>

<script>
// Import
import InfoGenreBody from '../components/homepage/InfoGenreBody.vue';
import axios from 'axios';
export default {
    name: 'Homepage',
    components: {
        "info-genre-body": InfoGenreBody
    },
    data() {
        return {
            testObj: {
                title: "Yay!!",
                counter: 1111,
                link: "/"
            },
            loaded: false,
            genreArray: [
                {
                info: {
                    name: "action",
                    movie: {
                        name: 'Movies',
                        counter: 0,
                    },
                    series: {
                        name: 'Series',
                        counter: 0,
                    }
                    },
                data: {
                    movie: {
                        url: 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:action&byProgramType=movie',
                        // &fields=title,description,programType,tdc$imdbid
                        dataArray: null
                    },
                    series: {
                        url: 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byTags=genre:action&byProgramType=series',
                        dataArray: null
                    }
                }
                }
            ]
        }
    },
    methods: {
        logData: function () {
            // let newTry = this.data2.entries[0]; // Have some error prevention when no img can be found
            // let newTry2 = this.data2.entries[1].plprogram$thumbnails;
            // console.log(Object.values(newTry)[0].plprogram$url)
            // console.log(Object.values(newTry))
            // console.log(newTry["orig-1188x816"])
            // console.log(newTry2["orig-1188x816"])

        }
    },
    created() {
        axios
        .get(this.genreArray[0].data.movie.url)
        .then((response) => {
            this.genreArray[0].data.movie.dataArray = response.data.entries;
            this.genreArray[0].info.movie.counter = response.data.entries.length;
            this.loaded = true;

            console.log(response.data.entries)
        });
        axios
        .get(this.genreArray[0].data.series.url)
        .then((response) => {
            this.genreArray[0].data.series.dataArray = response.data.entries;
            this.genreArray[0].info.series.counter = response.data.entries.length;

            console.log(response.data.entries)
        });
        axios
        .get("https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/229503528355?form=json")
        .then((response) => console.log("Yay!",response.data))

        // Some of the key values
        // plprogram$thumbnails
            // orig-1188x816
        // plprogram$tags
  }
}
</script>

<style scoped>

</style>