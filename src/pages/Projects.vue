<script>
// importo store per recuperare l'apiUrl
import { store } from "../store/store";
// importo axios per effettuare la richiesta
import axios from "axios";
export default {
  name: "Projects",
  data() {
    return {
      // creo l'array dove inserirò tutti i dati che arrivano dalla richiesta dell'API
      projects: [],
      inLoading: true,
    };
  },
  methods: {
    // creo la richiesta alla mia API con axios
    getApi() {
      axios.get(store.apiUrl + "projects").then((response) => {
        // recupero i dati della richiesta e li inserisco dentro l'array projects
        this.projects = response.data.projects;
        // console.log(response.data.projects);
        this.inLoading = false;
      });
    },
  },
  // nel mounthed utilizzo il metodo getApi
  mounted() {
    this.getApi();
  },
};
</script>

<template>
  <h1>Progetti :</h1>
  <div v-if="!inLoading">
    <ul>
      <!-- eseguo un ciclo v-for per stampare tutti i progetti in pagina -->
      <li class="project" v-for="project in projects" :key="project.id">
        <!-- nome del progetto -->
        <div>Nome del progetto: {{ project.name }}</div>
        <!-- info sul progetto  -->
        <div>
          {{
            `Status: ${project.status ? "Done" : "In progress"} | 
            Type: ${project.type ? project.type.name : "no type"}`
          }}
        </div>
        <!-- controllo sulle tecnologie utilizzate -->
        <div>
          Tecnologie utilizzate:
          <div v-if="project.technologies.length > 0">
            <ul>
              <li
                v-for="technology in project.technologies"
                :key="technology.id"
              >
                {{ technology.name }}
              </li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li>Nessuna tecnologia specificata</li>
            </ul>
          </div>
        </div>
        <!-- ************************* -->
      </li>
    </ul>
  </div>
  <div class="loading" v-else>
    <img src="../../public/loading.gif" alt="loading" />
    <span>loading...</span>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 35px;
}

ul {
  list-style: none;
}

.project {
  font-size: 20px;
  margin: 30px 0;
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
}

.loading {
  display: flex;
  align-items: center;
  span {
    align-self: flex-end;
  }
}
</style>
