<template>
  <nav id="nav">
        <ul>
            <li>
                <router-link to="/">Homepage</router-link>
            </li>
            <li>
                <router-link to="/program-overview">Overview</router-link>
            </li>
            <li>
                <router-link to="/user-favorites">Your Favorites</router-link>
            </li>
        </ul>
    </nav>
  <router-view class="routerview"/>
</template>

<script>
export default {
  name: "App",
  data() {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

 a.router-link-exact-active {
  color: #42b983;
}
.routerview {
  padding: 15vh 0 0 0;
}
</style>
