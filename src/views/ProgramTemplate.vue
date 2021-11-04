<template>
    <main>
        <section v-if="foundData">
            <h1>
                Template
            </h1>
            {{ idData.title }}

            <router-link to="/program/229503528355">Link</router-link>
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
            return this.idData.description.replace("object", "program")
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
                // Tried beforeEnter, and beforeRouteEnter, but wont work with Axios. 
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