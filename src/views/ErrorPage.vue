<template>
    <error-get :errorObject="errorObj"></error-get>
</template>

<script>
import ErrorGET from '../components/global/ErrorGET.vue';
export default {
    name: "ErrorPage",
    components: {
        "error-get": ErrorGET
    },
    data() {
        return {
            errorObj: {
            title: "Homepage",
            description: "Something wen wrong, please try again.",
            returnLink: "/"
        }
        }
    }
}
</script>