<template>
  <button type="button">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "ClickButton",
  props: {
    title: {
      type: String,
      default: "Click here",
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  display: inline-block;
  min-width: 9ch;
  text-align: center;
  border: 1px solid black;
  padding: 0.8rem 1.1rem;
  color: black;
  background-color: white;
}
button:hover {
  background-color: black;
  color: white;
}
button:active {
  transform: scale(0.96);
}
</style>