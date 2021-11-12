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
  min-width: 20ch;
  text-align: center;
  border: 2px solid #00ffce;
  border-radius: 500px;
  padding: 0.8rem 1.1rem;
  color: white;
  background-color: transparent;
  font-size: .8rem;
}
.linkButton:hover {
  background-color: black;
  color: white;
  border-color: black;
}
.linkButton:active {
  transform: scale(0.96);
}

</style>