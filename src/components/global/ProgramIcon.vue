<template>
    <div>
        <img :src="path" :alt="'Image of ' + title">
        <h4>
            {{ title }}
        </h4>
    </div>    
</template>

<script>
export default {
    name: "ProgramIcon",
    props: {
        path: String,
        title: {
            type: [Number, String]
        }
    }
}
</script>

<style scoped>
img {
    width: auto;
    height: 32px;
}
img,
h4 {
    margin: 0 .3rem;
}
div {
    display: flex;
    align-items: center;
    margin: 1rem;
}
</style>