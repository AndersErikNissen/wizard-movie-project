<template>
  <main id="main">
    <div v-if="foundData" id="divOuter">
      <section id="contentContainer">
        <div>
          <img id="programPoster" :src="posterImg" alt="Program Poster" />
        </div>
        <section id="content">
          <section id="content_top">
            <h1>
              {{ idData.title }}
            </h1>
            <section>
              <ul id="genreUL">
                <li v-for="genre in genreArray" :key="genre">
                  <genre-tag :title="genre"></genre-tag>
                </li>
              </ul>
            </section>
            <p v-if="idData.description !== ''">
              {{ idData.description }}
            </p>
            <p
              v-else-if="
                /* If there are no normal description use the longdescription */
                idData.plprogram$longDescription !== '' &&
                idData.plprogram$longDescription !== null
              "
            >
              {{ idData.plprogram$longDescription }}
            </p>
            <p v-else>
              <i
                >The description for this program are missing. Come back
                later!</i
              >
            </p>
            <section id="iconDiv">
              <icon-div
                :title="idData.plprogram$year"
                path="assets/img/calender_icon_blue.png"
              ></icon-div>
              <icon-div
                :title="runtimeMin"
                path="assets/img/clock_icon_blue.png"
              ></icon-div>
            </section>
          </section>

          <section id="content_bottom">
            <section>
              <h2>Director</h2>
              <ul id="directorUL">
                <li v-for="director in directorArray" :key="director">
                  <h4 class="liH4">
                    {{ director }}
                  </h4>
                </li>
              </ul>
            </section>
            <section>
              <h2>Actors</h2>
              <ul id="actorUL">
                <li v-for="(actor, index) in actorArray" :key="index">
                  <h4 class="liH4">{{ actor }}</h4>
                </li>
              </ul>
            </section>
            <wish-btn id="wishBtn" :wishId="programId"></wish-btn>
          </section>
        </section>
      </section>
    </div>
    <div
      v-if="foundData"
      id="backdrop"
      :style="
        'background-image: linear-gradient(180deg, rgba(0,6,22,1) 0%, rgba(0,6,22,0) 100%), url(' +
        backdrop +
        ');'
      "
    ></div>
    <!-- V-if is used instead of v-else, because it shouldn't be loaded before the GET-request is done and that there is an error -->
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
import Icon from "../components/global/ProgramIcon.vue";

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
    "icon-div": Icon,
  },
  data() {
    return {
      foundData: false,
      idData: false,
      getError: false,
    };
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
      // for(let i = 0; i < this.actorRange; i++) {
      //   if (this.idData.plprogram$credits[i].plprogram$creditType == "actor") {
      //     newArray.push(this.idData.plprogram$credits[i].plprogram$personName);
      //   }
      // }
      this.idData.plprogram$credits.forEach((actor) => {
        if (actor.plprogram$creditType == "actor") {
          newArray.push(actor.plprogram$personName + ",");
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
          return poster;
        }
      }
      // If there was no match, use a noImg
      poster = "assets/img/noImg_v3_large.png";
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
          return backdrop.url;
        }
      }
      return "assets/img/noImg_v3_wide.png";
    },
    runtimeMin: function () {
      // Turn seconds in to min to show on the front-end, for runtime.
      let number = this.idData.plprogram$runtime / 60,
        returnNumber = number.toString();
      return returnNumber + "min";
    },
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
#contentContainer,
#errorArea {
  display: flex;
  max-width: 1280px;
}
#divOuter,
#errorArea {
  justify-self: left;

  grid-area: 1 / 2 / 2 / 12;
}

#errorArea {
  flex-direction: column;
  align-items: center;
}
#content {
  margin: 0 0 0 2rem;
}

#backdrop {
  width: 100%;
  /* Height is set to px, because we know the height of our image */
  grid-area: 2 / 2 / 3/ 12;
  height: 324px;
  background-repeat: no-repeat;
  background-position: center;
  margin: 3rem 0 0 0;
  max-width: 1280px;
  opacity: 0.5;
}

#programPoster {
  width: 408px;
  height: 594px;
}

#genreUL,
#actorUL,
#directorUL {
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
}

#iconDiv {
  display: flex;
}
.liH4 {
  margin: 0 1rem 1rem 0;
}
#wishBtn {
  position: relative;
  z-index: 1;
}

/* Media Queries */
@media screen and (max-width: 1024px) {
  #main {
    grid-template-columns: repeat(8, 1fr);
  }
  #divOuter,
  #errorArea {
    grid-area: 1 / 2 / 2 / 8;
  }
  #backdrop {
    grid-area: 2 / 1 / 3/ 8;
  }
  #contentContainer {
    flex-direction: column;
    padding: 0;
  }
  #content {
    margin: 0;
  }
}
@media screen and (max-width: 768px) {
  #main {
    grid-template-columns: repeat(4, 1fr);
  }
  #divOuter,
  #errorArea {
    grid-area: 1 / 1 / 2 / 5;
    padding: 0 2rem;
  }
  #backdrop {
    grid-area: 2 / 1 / 3/ 5;
  }
}
@media screen and (max-width: 468px) {
  #divOuter,
  #errorArea {
    padding: 0 10px;
  }
  #programPoster {
    width: 280px;
    height: auto;
  }
   h1 {
    font-size: 2rem;
  }
}
</style>