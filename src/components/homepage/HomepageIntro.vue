<template>
  <section id="homeIntro">
    <section>
      <h1>Welcome to <span>Movie Wizard</span>!</h1>
      <div class="introText">
        <p>
          Here you will be able to find all the latest movies. If you find
          anything that you like, you can add the program to your own personal
          Wishlist!
        </p>
        <p>
         Go explore, and find your next favourite
          program!
        </p>
        <p>
           So what are you waiting for? 
        </p>
      </div>
    </section>
    <div class="divSVG">
      <svg-temp :path="'assets/img/wizard_kettle_with_broom.svg'"></svg-temp>
    </div>
  </section>
</template>

<script>
import SVG from "../global/SVGTemplate.vue";
export default {
  name: "HomepageIntro",
  components: {
    "svg-temp": SVG,
  },
};
</script>

<style scoped>
.divSVG {
  max-width: 700px;
  width: 100%;
  padding: 3rem;
}
.divSVG img {
  width: 100%;
}

h1 {
  font-size: 3rem;
}
p {
  max-width: 65ch;
}
#homeIntro {
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-around;
  padding: 3rem;

  /* margin: 0 0 0 4rem; */
  min-height: 50vh;
}
* {
  box-sizing: border-box;
}
span {
  color:  #00ffce;
}
@media screen and (max-width: 1024px) {
  h1 {
    font-size: 3rem;
  }
  p {
    margin: 1rem 0;
  }
  #homeIntro {
    flex-direction: column;
  }
}
@media screen and (max-width: 468px) {
  h1 {
    font-size: 2.2rem;
  }
  #homeIntro {
    margin: 0;
    padding: 1rem;
  }
  .divSVG {

  padding: .5rem;
}
}
</style>