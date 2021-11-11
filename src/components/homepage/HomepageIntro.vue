<template>
  <section id="homeIntro">
    <h1>Welcome to EGGCELENT!</h1>
    <div>
      <p>
        Here you will be able to find all the latest movies. If you find
        anything that you like, you can add the program to your own personal
        Wishlist!
      </p>
      <p>
        So what are you waiting for? Go explore, and find your next favourite
        program!
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomepageIntro",
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
p {
  max-width: 65ch;
}
#homeIntro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 1fr;
  margin: 10vw 5vw;

}
* {
  box-sizing: border-box;
}
@media screen and (max-width: 1024px) {
  h1 {
    font-size: 3rem;
  }
  p {
    margin: 1rem 0;
  }
  #homeIntro {
   margin: 8vw;
  }
}
@media screen and (max-width: 468px) {
  h1 {
    font-size: 2.2rem;
  }
}
</style>