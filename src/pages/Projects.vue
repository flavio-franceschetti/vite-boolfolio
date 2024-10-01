<script>
// importo store per recuperare l'apiUrl
import { store } from "../store/store";
// importo axios per effettuare la richiesta
import axios from "axios";
export default {
  data() {
    return {
      // creo l'array dove inserirò tutti i dati che arrivano dalla richiesta dell'API
      projects: [],
    };
  },
  methods: {
    // creo la richiesta alla mia API con axios
    getApi() {
      axios.get(store.apiUrl + "projects").then((response) => {
        // recupero i dati della richiesta e li inserisco dentro l'array projects
        this.projects = response.data.result;
        // console.log(response.data.result);
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
  <h1>Progetti</h1>
  <ul>
    <!-- eseguo un ciclo v-for per stampare tutti i progetti in pagina -->
    <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
