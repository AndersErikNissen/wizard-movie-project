<template>
    <main>
        <h1>404 Error</h1>
        <h2> {{ description }} </h2>
        <p>Please try again.</p>
        <router-link to="/">Homepage</router-link>
    </main>
</template>

<script>
export default {
    name: "ErrorGET",
    props: {
        title: {
            type: String,
            default: 'Error'
        },
        description: {
            type: String,
            default: 'There was an error, please try again.'
        }
    }
}
</script>