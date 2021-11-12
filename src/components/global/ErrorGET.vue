<template>
  <main>
    <section>
      <h1>404 Error</h1>
      <h2>{{ errorObject.description }}</h2>
      <p>Please try again.</p>
      <link-button :linkObject="errorObject"></link-button>
    </section>
    <section class="svgSection">
        <svg-temp class="svg" :path="'assets/img/missing_large_icon.svg'"></svg-temp>
    </section>
  </main>
</template>

<script>
import linkButton from "../buttons/LinkButton.vue"
import SVG from "./SVGTemplate.vue"
export default {
  name: "ErrorGET",
  props: {
    errorObject: {
      title: {
        type: String,
        default: "Error",
      },
      description: {
        type: String,
        default: "There was an error, please try again.",
      },
      returnLink: {
        type: String,
        default: "/",
      },
    },
  },
  components: {
    "link-button": linkButton,
    "svg-temp": SVG
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
h1 {
    font-size: 3rem;
}
main {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.svgSection {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem;
}
.svgSection img {
    width: 100%;
    max-width: 220px;
}
</style>