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
};
</script>

<style scoped>
</style>