<script>
import { store } from "../store/store";
import axios from "axios";
export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    getApi() {
      axios.get(store.apiUrl + "projects").then((response) => {
        this.projects = response.data.result;
        // console.log(response.data.result);
      });
    },
  },
  mounted() {
    this.getApi();
  },
};
</script>

<template>
  <h1>Progetti</h1>
  <ul>
    <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
