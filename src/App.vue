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

@import url('https://fonts.googleapis.com/css2?family=Thasadith:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */


  /* font-family: 'Thasadith', sans-serif; */
  font-family: 'Inter', sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  color: rgb(8, 8, 8);
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;

  background-color: white;
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
