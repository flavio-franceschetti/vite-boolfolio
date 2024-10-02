<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <!-- con router-link creo i link alle pagine prendendo il nome specificato nel router -->
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about-me' }">About</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'projects' }">Progetti</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  gap: 10px;
  li {
    a {
      font-size: 18px;
      font-weight: 800;
      color: #540b0e;
      text-decoration: none;
      &:hover,
      &.active {
        color: lightsalmon;
      }
    }
  }
}
</style>
