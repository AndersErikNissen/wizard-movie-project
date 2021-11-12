<template>
  <section class="outer">
    <section id="logoMenu">
      <!-- <div class="emptyDiv"></div> -->
      <router-link to="/" id="svgRouter">
        <div id="svgDiv" @click="show = false">
          <object id="svg" :data="objectSVG" type="image/svg+xml"></object>
          <!-- <h2>Movie Wizard</h2> -->
        </div>
      </router-link>
      <div id="menuDiv">
        <button id="menu" @click="show = !show">
          <!-- <h2>MENU</h2> -->

          <div id="barContainer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </button>
      </div>

      <nav id="nav" v-if="show">
        <ul id="mainNav">
          <li class="navLi">
            <router-link @click="show = false" to="/">Homepage</router-link>
          </li>
          <li class="navLi">
            <router-link @click="show = false" to="/user-wishlist"
              >Your Wishlist</router-link
            >
          </li>
        </ul>

        <section id="genreNav">
          <h2>Genres:</h2>
          <ul class="genreUL">
            <li @click="show = false" v-for="genre in genres" :key="genre">
              <genre-tag :title="genre"></genre-tag>
            </li>
          </ul>
        </section>
      </nav>
    </section>
  </section>
</template>

<script>
import SVG from "../../assets/wizard_logo_v1.svg";
import GenreTag from "../buttons/GenreTag.vue";
export default {
  name: "TheNavigation",
  props: {
    genres: {
      type: Array,
    },
  },
  components: {
    "genre-tag": GenreTag,
  },
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
#logoMenu {
  background-color: #00081e;
}
h2 {
  margin: 0 3px;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
}
button {
  background-color: transparent;
  border: none;
  height: fit-content;
}
a {
  text-decoration-line: none;
}
button:hover h2 {
  color: rgb(224, 224, 224);
}
button:hover div.bar {
  background-color: rgb(224, 224, 224);
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
  width: 60px;
  height: auto;
  pointer-events: none;
}
#menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.navLi {
  font-size: 2rem;
  margin: 2rem 0;
  text-align: center;
}

#nav {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  z-index: 3;
  background-color: #2a38b7;
}
#svgDiv {
  /* Makes the logo visible and gives a cool effect */
  background: rgb(0, 6, 22);
  background: radial-gradient(
    circle,
    rgba(0, 6, 22, 1) 30%,
    rgba(0, 6, 22, 0) 70%
  );
}
#menuDiv,
#svgDiv {
  display: flex;
  align-items: center;
}
#svgRouter,
#menuDiv {
  z-index: 4;
}
#svgDiv h2 {
  margin: 0 1rem;
  font-weight: 700;
  color: white;
}
a#svgRouter.router-link-exact-active {
  text-decoration-line: none;
}
.bar {
  display: block;
  width: 25px;
  height: 2px;
  margin: 0;
  background-color: rgb(255, 255, 255);
}
.bar:nth-child(2) {
  margin: 3px 0;
}
.genreUL {
  display: flex;
  flex-direction: row;
  max-width: 1280px;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;
}
.genreUL li {
  margin: 0.4rem 0;
}
@media screen and (max-width: 468px) {
  #nav {
    padding: 0.5rem;
  }
}
</style>