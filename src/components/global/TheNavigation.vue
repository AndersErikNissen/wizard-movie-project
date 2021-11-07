<template>
  <section id="outer">
    <section id="logoMenu">
      <router-link to="/" id="svgRouter">
        <div id="svgDiv">
          <object id="svg" :data="objectSVG" type="image/svg+xml"></object>
          <h5>EGGCELENT</h5>
        </div>
      </router-link>
      <div id="menuDiv">
        <button id="menu" @click="show = !show">
          <h5>MENU</h5>

          <div id="barContainer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </button>
      </div>

      <nav id="nav" v-if="show">
        <ul>
          <li class="navLi">
            <router-link @click="show = !show" to="/">Homepage</router-link>
          </li>
          <li class="navLi">
            <router-link @click="show = !show" to="/programs/action"
              >Overview</router-link
            >
          </li>
          <li class="navLi">
            <router-link @click="show = !show" to="/user-favorites"
              >Your Favorites</router-link
            >
          </li>
        </ul>
      </nav>
    </section>
  </section>
</template>

<script>
import SVG from "../../assets/egg_logo_1.svg";
export default {
  name: "TheNavigation",
  components: {},
  data() {
    return {
      objectSVG: SVG,
      showMenu: false,
      show: false,
    };
  },
};
</script>

<style scoped>
h5 {
  margin: 0 3px;
  font-size: 1rem;
  font-weight: 700;
  color: black;
}
button {
  background-color: transparent;
  border: none;
  height: fit-content;
}
a {
  text-decoration-line: none;
}
button:hover h5 {
  color: rgb(44, 41, 0);
}
button:hover div.bar {
  background-color: rgb(44, 41, 0);
}
button:active {
  transform: scale(0.96);
}
#logoMenu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 1rem;
}
#svg {
  width: 35px;
  height: auto;
  pointer-events: none;
}
#menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}
#nav {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  background-color: rgb(252, 252, 155);
}
ul {
  list-style-type: none;
}
.navLi {
  font-size: 2rem;
  margin: 2rem 0;
  text-align: center;
}
#menuDiv,
#svgDiv {
  display: flex;
  align-items: center;
  z-index: 2;
}
#svgRouter {
  z-index: 2;
}
#svgDiv h5 {
  margin: 0 1rem;
  font-weight: 700;
}
a#svgRouter.router-link-exact-active {
  text-decoration-line: none;
}
.bar {
  display: block;
  width: 25px;
  height: 2px;
  margin: 0;
  background-color: rgb(7, 7, 7);
}
.bar:nth-child(2) {
  margin: 3px 0;
}
</style>