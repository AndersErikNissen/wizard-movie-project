<template>
  <main id="main">
    <section v-if="foundData" id="outer">
      <!-- <div
        id="imgTest"
        :style="'background-image: url(' + backdrop.url + ');'"
      ></div> -->

      <section id="programPoster_container">
        <img id="programPoster" :src="posterImg" alt="Program Poster" />
        <section id="programShortInfo_container">
          <h1>
            {{ idData.title }}
          </h1>
          <section id="programShortInfo">
            <h4><span>Year: </span> {{ idData.plprogram$year }}</h4>
            <h4><span>Director: </span>{{ directorArray[0] }}</h4>
            <h4><span>Runtime: </span> {{ runtimeMin }}min</h4>
          </section>
          <p>
            {{ idData.description }}
          </p>
        </section>
      </section>
      <section id="programLongInfo_container">
          <section>
              <h2>Long Description</h2>
        <p>
          {{ idData.plprogram$longDescription }}
        </p>
          </section>
        <section>
          <h2>Genres</h2>
          <ul id="genreUL">
            <li v-for="genre in genreArray" :key="genre">
              <genre-tag :title="genre"></genre-tag>
            </li>
          </ul>
        </section>
        <section>
          <h2>Actors</h2>
          <ul id="actorUL">
            <li v-for="actor in actorArray" :key="actor">
              {{ actor }}
            </li>
          </ul>
        </section>
      </section>

      <!-- <div v-for="(image, index) in idData.plprogram$thumbnails" :key="index">
                <img :src="image.plprogram$url" :alt="index">
            </div> -->
    </section>

    <!-- V-if is used insted of v-else, because it should be loaded before the GET-request is done and that there is an error -->
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
/* Misc */
p {
  max-width: 65ch;
  margin: 1rem 0;
}
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

  grid-area: 1 / 3 / 2 / 11;
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

#imgTest {
  /* mask-image: linear-gradient(123deg, rgba(0,134,255,1) 0%, rgba(0,134,255,.1) 100%);
     mask-mode: luminance; */
  width: 100vw;
  height: 30vh;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  font-size: 4rem;
}
</style>