<template>
     <nav id="nav" v-if="show">
        <ul>
            <li>
                <router-link @click="!thisShow" to="/">Homepage</router-link>
            </li>
            <li>
                <router-link @click="!thisShow" to="/programs/action">Overview</router-link>
            </li>
            <li>
                <router-link @click="!thisShow" to="/user-favorites">Your Favorites</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "NavigationMenu",
    props: {
        show: {
            type: Boolean
        }
    },
    data() {
        return {
            thisShow: this.show
        }
    }
}
</script>

<style scoped>
#nav {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: top;

    z-index: 1;
}
ul {
    list-style-type: none;
}
</style>