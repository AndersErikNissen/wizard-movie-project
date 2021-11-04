<template>
    <main>
        <h1>
            Template
        </h1>
        {{ idData.title }}

        <router-link to="/program/229503528355">Link</router-link>
    </main>    
</template>

<script>
import axios from "axios";
export default {
    name: "Template",
    props: [
        "programId"
    ],
    data() {
        return {
            idData: false
        }
    },
    methods: {
        loadData() {
            axios
            .get("https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" + this.programId + "?form=json")
            .then((response) => {
                this.idData = response.data;
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
    }
}
</script>

<style scoped>

</style>