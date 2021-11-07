<template>
     <nav id="nav">
        <ul>
            <li>
                <router-link to="/">Homepage</router-link>
            </li>
            <li>
                <router-link to="/programs/action">Overview</router-link>
            </li>
            <li>
                <router-link to="/user-favorites">Your Favorites</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar",
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
#barOuter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
}
#svg {
    width: 20px;
    height: auto;
}
.bar {
    width: 20px;
    height: 4px;
    margin: 2px 0;
}
</style>