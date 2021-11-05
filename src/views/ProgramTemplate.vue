<template>
    <main>
        <section v-if="foundData" id="outer" >
            <!-- <section id="backdrop">
                <div :style="'background-image: url(' + backdrop.url + '); max-width: ' + backdrop.width + 'px; max-height:' + backdrop.height + 'px'">
                </div>
            </section> -->

            <img id="imgTest" :src="backdrop.url" alt="">
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
            </ul>

            {{ idData.plprogram$tags }}
            <!-- <div v-for="(image, index) in idData.plprogram$thumbnails" :key="index">
                <img :src="image.plprogram$url" :alt="index">
            </div> -->

            {{ runtimeMin }} min
        </section>

        <!-- V-if is used insted of v-else, because it should be loaded before the GET-request is done and that there is an error -->
        <error-get v-if="!foundData && idData" :errorObject="updateError"></error-get>
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
            let obj = {
                title: "Homepage",
                description: this.idData.description.replace("object", "a program"),
                returnLink: "/"
            }
            return obj;
        },
        genreArray: function () {
            // These [3]Array's are for sorting through the content and pick out what should be displayed.
            let newArray = [];
            this.idData.plprogram$tags.forEach(genre => {
                // To make sure we only catch genres and other other things, like editorial.
                if (genre.plprogram$scheme == "genre") {
                    newArray.push(genre.plprogram$title)
                }
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

            // This worked to find the poster img / Backdrop, but it seems a lot of the URL's are either missing or not working, so I choose a image-size all programs should have.
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
        backdrop: function () {
            let backdrop = null;
            for(const key in this.idData.plprogram$thumbnails) {
                if(key == "orig-324x1280") {
                    let path = this.idData.plprogram$thumbnails[key];
                    // Using an object to be able to things like max-width
                    backdrop = {
                        url: path.plprogram$url,
                        width: path.plprogram$width,
                        height: path.plprogram$height
                    }
                }
            }
            return backdrop;
        },
        runtimeMin: function () {
            return this.idData.plprogram$runtime / 60;
        }
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
                    console.log("Error",response.data)
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
#outer {
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;

    text-align: center;
}

#imgTest {
    mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);
}
/* #backdrop {
    width: 100vw;
    height: 40vh;
}
#backdrop div {
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;

    clip-path: polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%);

} */
</style>