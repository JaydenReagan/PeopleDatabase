//Vue component for each person in "people"
Vue.component("person_card", {
  template: `
        <div class="container">
            <h3>{{name}}</h3>
            <div class="details">
                <p>{{bio}}</p>
                <img :src="this.picture" alt="">
            </div>
            <button type="button" @click=getDetails>Get Details</button>
            <hr>
        </div>`,
  props: ["name", "id", "bio", "picture"],
  methods: {
    getDetails() {
      axios     //axios call for more details
        .get(
          `https://api.themoviedb.org/3/person/${this.id}?api_key=b17296b767518c4d60479d11872ad243&language=en-US`
        )
        .then((response) => {
            //Assigning value to Bio and Picture 
          this.bio = response.data.biography;
          this.picture =
            "https://image.tmdb.org/t/p/w500/" + response.data.profile_path;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

//Establish new Vue instance
const app = new Vue({
  el: "#app",
  data: {
    message: "Popular People Database",
    people: [],
  },
  mounted() { //Function to call array of people on page load
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=b17296b767518c4d60479d11872ad243&language=en-US&page=1"
      )
      .then((response) => {
        //Assigning value to array "people"
        this.people = response.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
