<script>
// importo store per recuperare l'apiUrl
import { store } from "../store/store";
// importo luxon per formattare le date
import { DateTime } from "luxon";
// importo le funzioni che mi servono che ho raggruppato su un file esterno per avere un codice più pulito
import { customLabel, getTechnologies } from "../data/utils";

// importo axios per effettuare la richiesta
import axios from "axios";
// import ProjectDetail from "./ProjectDetail.vue";
export default {
  name: "Projects",
  data() {
    return {
      // creo l'array dove inserirò tutti i dati che arrivano dalla richiesta dell'API
      projects: [],
      types: [],
      technologies: [],
      paginatorData: {
        current_page: 1,
        links: [],
      },
      projectNum: 0,
      inLoading: true,

      // inserisco le funzioni importate da utils nei data per poterle utilizzare nel mio template le scrivo senza parametri perché sono impliciti e non cìè bisongno di specificarli
      customLabel,
      getTechnologies,
    };
  },
  methods: {
    // creo la richiesta alla mia API con axios
    getApi(apiUrl, type = "projects") {
      // ogni volta che chiamo l'api il loading diventa true quindi anche quando cambio pagina ci sarà il loading
      this.inLoading = true;
      axios
        .get(apiUrl)
        .then((response) => {
          // con switch case in base al valore della variabile passata eseguiamo il codice scritto per ogni caso
          switch (type) {
            case "projects":
              // recupero i dati della richiesta e li inserisco dentro l'array projects
              this.projects = response.data.projects.data;
              // recupero il numero totale dei progetti presenti
              this.projectNum = response.data.projects.total;
              //recupero i dati per il paginator
              this.paginatorData.current_page =
                response.data.projects.current_page;
              this.paginatorData.links = response.data.projects.links;
              // data per il loading
              this.inLoading = false;
              // con un map ciclo tutti i progetti e nella funzione che gli passo formatto tutte le date di creazione in modo tale da avere l'array aggiornato con le date formattate usando luxon e ritorno il progetto
              this.projects = this.projects.map((project) => {
                if (project.created_at) {
                  project.created_at = DateTime.fromISO(project.created_at)
                    .setLocale("it")
                    .toFormat("dd/LL/yyyy");
                  return project;
                }
              });
              console.log(this.projects);
              break;
            case "types":
              this.types = response.data.types;
              break;
            case "technologies":
              this.technologies = response.data.technologies;
              // console.log(response.data.technologies);
              break;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  // nel mounthed utilizzo il metodo getApi a cui passo l'url per la prima pagina dei progetti
  mounted() {
    this.getApi(store.apiUrl + "projects", "projects");
    this.getApi(store.apiUrl + "types", "types");
    this.getApi(store.apiUrl + "technologies", "technologies");
  },
};
</script>

<template>
  <div class="container" v-if="!inLoading">
    <h1 v-if="projectNum > 0">Ci sono {{ projectNum }} progetti :</h1>
    <h1 v-else>"Non ci sono progetti disponibili !!!</h1>
    <!-- Sezione dei filtri per tipi e per tecnologie -->
    <div class="card filters">
      <div>
        <div>Filtro per tipi di progetto:</div>
        <!-- Filtro per i tipi di progetto -->
        <button v-for="type in types" :key="type.id">
          {{ type.name }}
        </button>
      </div>
      <div>
        <div>Filtro per tecnologie:</div>
        <!-- Filtro per i tipi di progetto -->
        <button v-for="technology in technologies" :key="technology.id">
          {{ technology.name }}
        </button>
      </div>
    </div>
    <div>
      <!-- eseguo un ciclo v-for per stampare tutti i progetti in pagina -->
      <div class="card" v-for="project in projects" :key="project.id">
        <div>
          Progetto n. {{ project.id }}
          <span class="project-by">by: {{ project.user.name }}</span>
        </div>
        <div class="date">Data di creazione: {{ project.created_at }}</div>
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
        <div class="show">
          <div>Tecnologie utilizzate: {{ getTechnologies(project) }}</div>
          <span>
            <router-link
              :to="{ name: 'projectDetail', params: { slug: project.slug } }"
              ><img
                src="../../public/wired-outline-243-glasses-eye-blink-hover-searching.gif"
                alt="eye"
              /> </router-link
          ></span>
        </div>
        <!-- ************************* -->
      </div>
    </div>

    <!-- PAGINATOR -->
    <div class="paginator">
      <!-- con v-html transformo tutte le entità html del testo nei sinboli -->
      <button
        @click="getApi(link.url)"
        v-for="(link, index) in paginatorData.links"
        :key="index"
        v-html="customLabel(link.label)"
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
.container {
  padding: 40px 0;
}

.filters {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 35px;
}

ul {
  list-style: none;
}

.project-by {
  font-size: 14px;
  margin-left: 80%;
}

.date {
  font-size: 14px;
}

.loading {
  display: flex;
  align-items: center;
  span {
    align-self: flex-end;
  }
}

.show {
  display: flex;
  align-content: center;
  justify-content: space-between;

  div {
    text-align: center;
  }

  a {
    display: block;
    width: 30px;
    height: 30px;
    transition: all 0.5s;
    &:hover {
      scale: 1.3;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  button {
    cursor: pointer;
    background-color: #fff;
    border: none;
    padding: 5px;
    border-radius: 60% 40% 65% 45% / 55% 65% 35% 50%; // Irregolarità del cerchio
    height: 40px;
    width: 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease,
      border-radius 0.3s ease;

    &:hover {
      transform: scale(1.1);
      border-radius: 50% 60% 55% 45% / 65% 55% 50% 60%; // Cambia la forma
      box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px;
    }
  }
}
</style>
