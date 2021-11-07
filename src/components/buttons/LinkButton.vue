<template>
    <router-link tag="button" class="linkButton" :to="linkObject.returnLink">
        {{ linkObject.title }}
    </router-link>
</template>

<script>
export default {
    name: "LinkButton",
    props: {
        linkObject: {
            type: Object
        }
    }    
}
</script>

<style scoped>
.linkButton {
    cursor: pointer;
    display: inline-block;
    min-width: 9ch;
    text-align: center;
    border: 1px solid black;
    padding: .8rem 1.1rem;
    color: black;
    background-color: white;
}
.linkButton {
    text-decoration-line: none;
    font-weight: normal;
}
.linkButton:hover {
    background-color: black;
    color: white;
}
.linkButton:active {
    transform: scale(.96);
}

</style>