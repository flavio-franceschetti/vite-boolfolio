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
      paginatorData: {
        current_page: 1,
        links: [],
      },
      projectNum: 0,
      inLoading: true,
    };
  },
  methods: {
    // creo la richiesta alla mia API con axios
    getApi(apiUrl) {
      // ogni volta che chiamo l'api il loading diventa true quindi anche quando cambio pagina ci sarà il loading
      this.inLoading = true;
      axios
        .get(apiUrl)
        .then((response) => {
          // recupero i dati della richiesta e li inserisco dentro l'array projects
          this.projects = response.data.projects.data;
          // recupero il numero totale dei progetti presenti
          this.projectNum = response.data.projects.total;
          //recupero i dati per il paginator
          this.paginatorData.current_page = response.data.projects.current_page;
          this.paginatorData.links = response.data.projects.links;
          console.log(response.data.projects.links);
          // data per il loading
          this.inLoading = false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  // nel mounthed utilizzo il metodo getApi a cui passo l'url per la prima pagina dei progetti
  mounted() {
    this.getApi(store.apiUrl + "projects");
  },
};
</script>

<template>
  <div v-if="!inLoading">
    <h1 v-if="projectNum > 0">Ci sono {{ projectNum }} progetti :</h1>
    <h1 v-else>"Non ci sono progetti disponibili !!!</h1>
    <ul>
      <!-- eseguo un ciclo v-for per stampare tutti i progetti in pagina -->
      <li class="project" v-for="project in projects" :key="project.id">
        <div>Progetto n. {{ project.id }}</div>
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

    <!-- PAGINATOR -->
    <div class="paginator">
      <!-- con v-html transformo tutte le entità html del testo nei sinboli -->
      <button
        @click="getApi(link.url)"
        v-for="(link, index) in paginatorData.links"
        :key="index"
        v-html="link.label"
        :disabled="link.active || !link.url"
      ></button>
    </div>
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
