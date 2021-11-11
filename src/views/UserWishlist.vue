<template>
  <main>
    <section class="intro">
      <h1>This is your very own Wishlist!</h1>
    </section>
    <section class="arraySection" v-if="GETarray.length > 0">
      <section v-for="(wish, index) in GETarray" :key="wish.id" class="infoContainer">
        <info-box :program="wish"></info-box>
        <div>
          <click-btn @click="removeWish(wish.id,index)" :title="'Unwish'"></click-btn>
        </div>
      </section>
    </section>
    <!-- If there are nothing on the wishlist show this section -->
    <section class="errorBox" v-if="GETarray.length === 0">
      <div>
        <p>You have no programs on your wishlist! Isn't that a shame?</p>
        <p>
          Get started finding programs worthy of your Wishlist on our Homepage!
        </p>
      </div>
      <div>
        <link-btn
          :linkObject="{ title: 'Homepage', returnLink: '/' }"
        ></link-btn>
      </div>
    </section>
  </main>
</template>

<script>
import ProgramInfoBox from "../components/global/ProgramInfobox.vue";
import Btn from "../components/buttons/ClickButton.vue";
import LinkBtn from "../components/buttons/LinkButton.vue";
import axios from "axios";
export default {
  name: "UserWishlist",
  components: {
    "info-box": ProgramInfoBox,
    "click-btn": Btn,
    "link-btn": LinkBtn,
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
            console.log("Created Wish:", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    removeWish(wishId, indx) {
      // Used in Wish Button aswell
      let id = wishId.split("/")[6],
        idToRemove = this.wishlist.indexOf(id);

      if (idToRemove > -1) {
        // Checks if the id was found.
        this.wishlist.splice(idToRemove, 1);
        // Change the loaded content
        this.GETarray.splice(indx, 1);
      }

      const parsed = JSON.stringify(this.wishlist);
      localStorage.setItem("wishlist", parsed);
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
  margin: 0 0 2rem 0;
}
.errorBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.errorBox a {
  margin: 2rem 0 0 0;
}
.intro {
  display: flex;
  justify-content: center;
}
.arraySection {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>