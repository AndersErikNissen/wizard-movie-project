<template>
  <main id="main">
    <section v-if="foundData" id="outer">
      <section id="programPoster_container">
        <img id="programPoster" :src="posterImg" alt="Program Poster" />
        <section id="programShortInfo_container">
          <div>
            <h1>
              {{ idData.title }}
            </h1>
            <section id="programShortInfo">
              <h4><span>Director: </span>{{ directorArray[0] }}</h4>
              <h4><span>Year: </span> {{ idData.plprogram$year }}</h4>
              <h4><span>Runtime: </span> {{ runtimeMin }}min</h4>
              <wish-btn :wishId="programId"></wish-btn>
            </section>
          </div>
          <section>
            <h2>Short Description</h2>
            <p v-if="idData.description !== ''">
              {{ idData.description }}
            </p>
            <p v-else>
              <i>Short description are missing!</i>
            </p>
          </section>
        </section>
      </section>

      <div
        id="backdrop"
        :style="'background-image: url(' + backdrop.url + ');'"
      ></div>
      <section id="programLongInfo_container">
        <section>
          <h2>Long Description</h2>
          <p
            v-if="
              idData.plprogram$longDescription !== '' &&
              idData.plprogram$longDescription !== null
            "
          >
            {{ idData.plprogram$longDescription }}
          </p>
          <p v-else>
            <i>Long description are missing!</i>
          </p>
        </section>
        <section>
          <h2>Genre(s):</h2>
          <ul id="genreUL">
            <li v-for="genre in genreArray" :key="genre">
              <genre-tag :title="genre"></genre-tag>
            </li>
          </ul>
        </section>
        <section>
          <h2>Actors:</h2>
          <ul id="actorUL">
            <li v-for="actor in actorArray" :key="actor">
              {{ actor }}
            </li>
          </ul>
        </section>
      </section>
    </section>

    <!-- V-if is used insted of v-else, because it shouldn't be loaded before the GET-request is done and that there is an error -->
    <error-get
      id="errorArea"
      v-if="!foundData && idData"
      :errorObject="updateError"
    ></error-get>
  </main>
</template>

<script>
import axios from "axios";
import ErrorGET from "../components/global/ErrorGET.vue";
import GenreTag from "../components/buttons/GenreTag.vue";
import WishBtn from "../components/buttons/WishlistButton.vue";
export default {
  name: "Template",
  props: {
    programId: {
      type: String,
      required: true,
    },
  },
  components: {
    "error-get": ErrorGET,
    "genre-tag": GenreTag,
    "wish-btn": WishBtn,
  },
  computed: {
    updateError: function () {
      // Just a tiny thing to change in the error message, should the user not know what is meant with an object.
      let obj = {
        title: "Homepage",
        description: this.idData.description.replace("object", "a program"),
        returnLink: "/",
      };
      return obj;
    },
    genreArray: function () {
      // These [3]Array's are for sorting through the content and pick out what should be displayed.
      let newArray = [];
      this.idData.plprogram$tags.forEach((genre) => {
        // To make sure we only catch genres and other other things, like editorial.
        if (genre.plprogram$scheme == "genre") {
          newArray.push(genre.plprogram$title);
        }
      });
      return newArray;
    },
    directorArray: function () {
      let newArray = [];
      this.idData.plprogram$credits.forEach((director) => {
        if (director.plprogram$creditType == "director") {
          newArray.push(director.plprogram$personName);
        }
      });
      return newArray;
    },
    actorArray: function () {
      let newArray = [];
      this.idData.plprogram$credits.forEach((actor) => {
        if (actor.plprogram$creditType == "actor") {
          newArray.push(actor.plprogram$personName);
        }
      });
      return newArray;
    },
    posterImg: function () {
      let poster = null;

      // This worked to find the poster img / Backdrop, but it seems a lot of the URL's are either missing or not working, so I choose a image-size all programs should have.
      // for(const key in this.idData.plprogram$thumbnails) {
      //     if(this.idData.plprogram$thumbnails[key].plprogram$assetTypes[0] == "Poster") {
      //         poster = this.idData.plprogram$thumbnails[key].plprogram$url;
      //     }
      // }
      // Loops through all the keys in the object looking for a match, and then pick the URL from the correct key.
      for (const key in this.idData.plprogram$thumbnails) {
        if (key == "orig-594x408") {
          poster = this.idData.plprogram$thumbnails[key].plprogram$url;
        }
      }
      return poster;
    },
    backdrop: function () {
      let backdrop = null;
      for (const key in this.idData.plprogram$thumbnails) {
        // Using key to look through thumbnails object for the correct img format.
        if (key == "orig-324x1280") {
          let path = this.idData.plprogram$thumbnails[key];
          // Using an object to be able to have things like max-width
          backdrop = {
            url: path.plprogram$url,
            width: path.plprogram$width,
            height: path.plprogram$height,
          };
        }
      }
      return backdrop;
    },
    runtimeMin: function () {
      // Turn seconds in to min to show on the front-end, for runtime.
      return this.idData.plprogram$runtime / 60;
    },
  },
  data() {
    return {
      foundData: false,
      idData: false,
      getError: false,
    };
  },
  methods: {
    loadData() {
      axios
        .get(
          "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" +
            this.programId +
            "?form=json"
        )
        .then((response) => {
          this.idData = response.data;

          //Error Handling
          // Tried beforeEnter, and beforeRouteEnter, but it wont work with Axios.
          // It is needed to check the middleware if the ID is true, that the error is handled with a v-if inside the component.
          if (response.data.responseCode === 404) {
            //Should the route have changed to something that can not be found after finding a program, then we need to reset foundData.
            this.foundData = false;
            console.log("Error", response.data);
          } else {
            this.foundData = true;
          }
        });
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    // Since the Template is used by all programs, and when the programId changes it wont run the lifecycle again. That is why we watch programId,
    // and if it changes use our method to re-render the program.data.
    programId: function () {
      this.loadData();
    },
  },
};
</script>

<style scoped>
/* Text */
* {
  font-weight: 300;
}
h1,
h2,
h3,
h5,
h6,
span {
  font-weight: 700;
}
h1 {
  font-size: 3rem;
  margin: 0;
}
p {
  max-width: 65ch;
  margin: 1rem 0;
}

/* Misc */
ul {
  margin: 1rem 0;
  padding: 0;
}

#main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  justify-content: center;
}
#outer,
#errorArea {
  background-position: top center;
  background-repeat: no-repeat;
  background-size: contain;

  /* text-align: center; */
  justify-self: center;

  grid-area: 1 / 2 / 2 / 12;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;

  max-width: 1280px;
}

#programPoster_container {
  display: flex;
  /* justify-content: space-evenly; */
  width: 100%;
}
#programShortInfo_container {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}
#programShortInfo_container p {
  margin: 0;
}
#programPoster {
  width: 408px;
  height: 594px;
}

#genreUL,
#actorUL {
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
}
#genreUL li {
  display: block;
}
#actorUL li {
  margin: 0 1rem 1rem 0;
}

#backdrop {
  width: 100%;
  /* Height is set to px, because we know the height of our image */
  height: 324px;
  background-repeat: no-repeat;
  background-position: center;
  margin: 1rem 0;
}

/* Media Queries */
@media screen and (max-width: 1024px) {
  #main {
    grid-template-columns: repeat(8, 1fr);
  }
  #outer,
  #errorArea {
    grid-area: 1 / 2 / 2 / 8;
  }
  #programPoster_container {
    flex-direction: column;
  }
  #programShortInfo_container {
    padding: 0;
  }
}
</style>