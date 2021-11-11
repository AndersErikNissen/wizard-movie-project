<template>
  <main>
    <section class="intro">
      <h1>This is your very own Wishlist!</h1>
    </section>

    <section v-for="wish in GETarray" :key="wish.id" class="infoContainer">
      <info-box :program="wish"></info-box>
      <div>
        <click-btn @click="removeWish(wish.id)" :title="'Unwish'"></click-btn>
      </div>
    </section>
  </main>
</template>

<script>
import ProgramInfoBox from "../components/global/ProgramInfobox.vue";
import Btn from "../components/buttons/ClickButton.vue";
import axios from "axios";
export default {
  name: "UserWishlist",
  components: {
    "info-box": ProgramInfoBox,
    "click-btn": Btn,
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
    console.log(this.GETarray);
  },
  computed: {},
  methods: {
    GETall() {
      this.wishlist.forEach((wish) => {
        axios
          .get(
            "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" +
              wish +
              "?form=json&fields=id,title,plprogram$thumbnails"
          )
          .then((response) => {
            this.GETarray.push(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    removeWish(wishId) {
      // Used in Wish Button aswell
      let id = wishId.split("/")[6],
        idToRemove = this.wishlist.indexOf(id);

      if (idToRemove > -1) {
        // Checks if the id was found.
        this.wishlist.splice(idToRemove, 1);
      }

      const parsed = JSON.stringify(this.wishlist);

      localStorage.setItem("wishlist", parsed);
      this.GETall();
    },
  },
};
</script>

<style scoped>
main {
  min-height: 100vh;
}
h1 {
  font-size: 3rem;
}
.infoContainer {
  display: flex;
  flex-direction: column;
}
</style>