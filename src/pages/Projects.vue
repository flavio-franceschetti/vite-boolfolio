<script>
// importo store per recuperare l'apiUrl
import { store } from "../store/store";
import { DateTime } from "luxon";

// importo axios per effettuare la richiesta
import axios from "axios";
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
                    .toFormat("dd LL yyyy");
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
    // funzione per modificare i nomi dei bottoni
    customLabel(label) {
      if (label == "&laquo; Previous") {
        return (label = "&larr;");
      } else if (label == "Next &raquo;") {
        return (label = "&rarr;");
      } else {
        return label;
      }
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

h1 {
  font-size: 35px;
}

ul {
  list-style: none;
}

.card {
  font-size: 20px;
  margin: 30px 0;
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  box-shadow: rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
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

.filters {
  display: flex;
  justify-content: space-between;
}
</style>
