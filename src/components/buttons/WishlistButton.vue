<template>
  <section>
    <button class="wishBtn" v-if="checkIfOnWishlist" @click="addToWishlist">
      <span>Add Wish</span>
      <img src="assets/img/wand_icon_blue.png" alt="Image of wand">
    </button>
    <button class="wishBtn" v-else @click="removeFromWishlist">
      <span>Remove Wish</span>
      <img src="assets/img/wand_icon_blue.png" alt="Image of wand">
    </button>

    <section class="alertBox" v-if="alertAdd">
      <div class="wishAlert">
        <h4>Program added to your Wishlist!</h4>
      </div>
    </section>
    <section class="alertBox" v-if="alertRemove">
      <div class="wishAlert">
        <h4>Program removed from your Wishlist!</h4>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "WishlistButton",
  props: {
    wishId: {
      type: String,
    },
  },
  data() {
    return {
      wishlist: [],
      alertAdd: false,
      alertRemove: false,
    };
  },
  mounted() {
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
  },
  computed: {
    checkIfOnWishlist: function () {
      // Check to see if the Id can be found.
      let check = this.wishlist.find((wish) => wish == this.wishId),
        returnValue = true;

      if (check !== undefined) {
        returnValue = false;
      }
      return returnValue;
    },
  },
  methods: {
    addToWishlist() {
      this.wishlist.push(this.wishId);

        this.toggleAlert(1);
      this.saveWishlist();
    },
    removeFromWishlist() {
      //Find the right id to remove.
      let idToRemove = this.wishlist.indexOf(this.wishId);

      if (idToRemove > -1) {
        // Checks if the id was found.
        this.wishlist.splice(idToRemove, 1);
      }

      this.toggleAlert(2);
      this.saveWishlist();
    },
    saveWishlist() {
      // Method to update localStorage wishlist
      const parsed = JSON.stringify(this.wishlist);
      // Changes the wishlist to the new updated wishlist
      localStorage.setItem("wishlist", parsed);
    },
    toggleAlert(alert) {
        if(alert === 1) {
            this.alertAdd = true;
            setTimeout(()=> {
                this.alertAdd = false
            }, 2000)
        }
        if(alert === 2) {
            this.alertRemove = true;
            setTimeout(()=> {
                this.alertRemove = false
            }, 2000)
        }

    }
  },
};
</script>

<style scoped>
h4 {
    margin: 0;
    padding: 0;
}
.wishBtn {
  display: inline-block;
  min-width: 5ch;
  border: 2px solid #00ffce;
  border-radius: 100px;
  padding: 0.8rem 1.1rem;
  color: white;
  background-color: transparent;
  margin-right: 1rem;
}
.wishBtn {
  text-decoration-line: none;
  font-size: .8rem;
  font-weight: normal;
}
.wishBtn:hover {
  border: 2px solid black;
  background-color: black;
  color: white;
}
.wishBtn:active {
  transform: scale(0.96);
}
.wishBtn {
  cursor: pointer;
  display: flex;
  align-items: center;
}

img {
  height: 18px;
  margin: 0 0 0 8px;
}

/* Wish Alert - Used to inform that program has been added or removed*/
section.alertBox  {
  position: fixed;
  bottom: 1rem;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
.wishAlert {
  background-color: #00ffce;
  color: #00050f;
  display: inline-block;
  border-radius: 100px;
  padding: 1rem 2rem;
}
</style>