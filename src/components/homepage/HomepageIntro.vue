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
  font-size: 4rem;
  text-align: center;
}
p {
  max-width: 65ch;
}
#homeIntro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 500px;
}
</style>