<template>
    <main>
        <h1>404 Error</h1>
        <h2> {{ errorObject.description }} </h2>
        <p>Please try again.</p>
        <link-button :linkObject="errorObject"></link-button>
    </main>
</template>

<script>
import linkButton from '../buttons/LinkButton.vue'
export default {
    name: "ErrorGET",
    props: {
        errorObject: {
            title: {
                type: String,
                default: 'Error'
            },
            description: {
                type: String,
                default: 'There was an error, please try again.'
            },
            returnLink: {
                type: String,
                default: "/"
            }
        }
    },
    components: {
        "link-button": linkButton
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>