<template>
    <main>
        <section v-if="foundData">
            <img :src="posterImg" alt="">
            <h1>
                {{ idData.title }}
            </h1>
            <h2>
                {{ genreArray }}
            </h2>
            <h2>
                {{ actorArray }}
            </h2>
            <h2>
                {{ directorArray }}
            </h2>
            <p>
                {{ idData.description }}
            </p>
            <ul>
                <li>
                    {{ idData.plprogram$year }}
                </li>
                <li>
                    <!-- Cover -->
                    
                </li>
                <li>
                    <!-- Backdrop -->
                   
                </li>
                <li>
                    {{ idData.plprogram$thumbnails }}
                </li>
            </ul>
            <div v-for="(image, index) in idData.plprogram$thumbnails" :key="index">
                <img :src="image.plprogram$url" :alt="index">
            </div>

            
        </section>

        <!-- V-if is used insted of v-else, because it should be loaded before the GET-request is done and that there is an error -->
        <error-get v-if="!foundData && idData" :description="updateError"></error-get>
    </main>    
</template>

<script>
import axios from "axios";
import ErrorGET from '../components/global/ErrorGET.vue';
export default {
    name: "Template",
    props: {
        programId: {
            type: String,
            required: true
        }
    },
    components: {
        "error-get": ErrorGET
    },
    computed: {
        updateError: function () {
            // Just a tiny thing to change in the error message, should the user not know what is meant with an object.
            return this.idData.description.replace("object", "a program")
        },
        genreArray: function () {
            // These [3]Array's are for sorting through the content and pick out what should be displayed.
            let newArray = [];
            this.idData.plprogram$tags.forEach(genre => {
                newArray.push(genre.plprogram$title)
            });
            return newArray;
        },
        directorArray: function () {
            let newArray = [];
            this.idData.plprogram$credits.forEach(director => {
                if (director.plprogram$creditType == "director") {
                    newArray.push(director.plprogram$personName)
                }
            });
            return newArray;
        },
        actorArray: function () {
            let newArray = [];
            this.idData.plprogram$credits.forEach(actor => {
                if (actor.plprogram$creditType == "actor") {
                    newArray.push(actor.plprogram$personName)
                }
            });
            return newArray;
        },
        posterImg: function () {
             let poster = null;

            // This worked to find the poster img, but it seems a lot of the URL's are either missing or not working, so I choose a image-size all programs should have.
            // for(const key in this.idData.plprogram$thumbnails) {
            //     if(this.idData.plprogram$thumbnails[key].plprogram$assetTypes[0] == "Poster") {
            //         poster = this.idData.plprogram$thumbnails[key].plprogram$url;
            //     }
            // }
            // Loops through all the keys in the object looking for a match, and then pick the URL from the correct key.
            for(const key in this.idData.plprogram$thumbnails) {
                if(key == "orig-594x408") {
                    poster = this.idData.plprogram$thumbnails[key].plprogram$url;
                }
            }
            return poster;
        },
    },
    data() {
        return {
            foundData: false,
            idData: false,
            getError: false
        }
    },
    methods: {
        loadData() {
            axios
            .get("https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" + this.programId + "?form=json")
            .then((response) => {
                this.idData = response.data;
            
                //Error Handling
                // Tried beforeEnter, and beforeRouteEnter, but it wont work with Axios. 
                // It is needed to check the middleware if the ID is true, that the error is handled with a v-if inside the component.
                if (response.data.responseCode === 404) {
                    //Should the route have changed to something that can not be found after finding a program, then we need to reset foundData.
                    this.foundData = false;
                    console.log(response.data)
                } else {
                    this.foundData = true;
                }
            })
        }
    },
    created() {
        this.loadData()
    },
    watch: {
        // Since the Template is used by all programs, and when the programId changes it wont run the lifecycle again. That is why we watch programId,
        // and if it changes use our method to re-render the program.data.
        programId: function () {
            this.loadData()
        }
    },
}
</script>

<style scoped>

</style>