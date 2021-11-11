<template>
  <main>
    <section class="intro">
      <h1>This is your very own Wishlist!</h1>
    </section>

    <section>
      <info-box v-for="wish in GETarray" :key="wish.id" :program="wish"></info-box>
    </section>
  </main>
</template>

<script>
import ProgramInfoBox from "../components/global/ProgramInfobox.vue"
import axios from "axios"
export default {
  name: "UserWishlist",
  components: {
    "info-box": ProgramInfoBox,
  },
  data() {
    return {
      wishlist: [],
      GETarray: [],
    };
  },
  created() {
    if (localStorage.getItem("wishlist")) {
      // Check if the wishId is in the list and if the wishlist exists.
      // First we are trying to parse the string from local storage to JSON, if not the localStorage wishlist should be removed.
      try {
        this.wishlist = JSON.parse(localStorage.getItem("wishlist"));
      } catch (err) {
        //Remove from localStorage and return false, because the wishlist existed but was either empty
        localStorage.removeItem();
      }
    }

    this.GETall();
  },
  methods: {
    GETall() {
      this.wishlist.forEach((wish) => {
        axios
        .get("https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" + wish +"?form=json&fields=id,title,plprogram$thumbnails")
        .then((response) => {
          this.GETarray.push(response.data);
        })
        .catch(function (error) {
          console.log(error)
        });
      });
    },
  },
};
</script>

<style scoped>
main {
  min-height: 100vh;
}

</style>