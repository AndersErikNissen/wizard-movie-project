<template>
   <menu-bar></menu-bar>
</template>

<script>
import Bar from "../global/NavigationBar.vue"
export default {
    name: "TheNavigation",
    components: {
        "menu-bar": Bar,
    },
    data() {
        return {
        
        }
    }
}
</script>

<style scoped>
#svg {
    width: 20px;
    height: auto;
}
</style>