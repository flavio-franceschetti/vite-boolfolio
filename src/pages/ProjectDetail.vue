<script>
import { store } from "../store/store";
import { getProjectType, getTechnologies } from "../data/utils";
import axios from "axios";

export default {
  name: "ProjectDetail",
  data() {
    return {
      project: {},

      getProjectType,
      getTechnologies,
    };
  },
  methods: {
    getApi(apiUrl, slug) {
      axios.get(apiUrl + "project-slug/" + slug).then((response) => {
        // se lo status della richiesta alla mia api è 200 allora mi mostra il progetto con lo slug selezionato altrimenti mi rimanda alla pagina errore404
        if (response.data.status == 200) {
          this.project = response.data.project;
          console.log(this.project);
        } else {
          // utilizzo il metodo push che a differenza di js puro in vue con il router installato è un metodo per poter cambiare pagina senza che l'utente intervenga quindi perfetto per reindirizzare sulla pagina errore 404 quando la richiesta è sbagliata
          this.$router.push({ name: "error404" });
        }
      });
    },
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.getApi(store.apiUrl, slug);
  },
};
</script>

<template>
  <div class="card">
    <div>Nome del progetto: {{ project.name }}</div>
    <div>Descrizione: {{ project.description }}</div>
    <div>Tipo di progetto: {{ getProjectType(project) }}</div>
    <div>Tecnologie utilizzate: {{ getTechnologies(project) }}</div>
    <div>
      <img :src="project.image_path" :alt="project.img_original_name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
</style>
