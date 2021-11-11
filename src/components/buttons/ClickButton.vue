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
  min-width: 20ch;
  text-align: center;
  border: 1px solid white;
  border-radius: 500px;
  padding: 0.8rem 1.1rem;
  color: white;
  background-color: transparent;
  font-size: .8rem;
}
button:hover {
  background-color: black;
  color: white;
  border-color: black;
}
button:active {
  transform: scale(0.96);
}
</style>