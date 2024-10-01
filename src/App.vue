<script>
export default {};
</script>

<template>
  <nav>
    <ul>
      <li>
        <!-- con router-link creo i link alle pagine prendendo il nome specificato nel router -->
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'projects' }">Progetti</router-link>
      </li>
    </ul>
  </nav>
  <div>
    <!-- utilizzo router view per visualizzare le pagine collegate nel router -->
    <router-view></router-view>
  </div>
</template>

<style></style>
