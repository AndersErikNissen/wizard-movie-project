<template>
  <img :src="path" alt="SVG">
</template>

<script>
export default {
    name: "SVGTemplate",
    props: {
      path: {
        type: String,
      }
    },
    created() {
      console.log(this.path)
    }
};
</script>

<style scoped>
</style>