<script>
export default {

}
</script>

<template>
 <nav>
  <ul>
    <li>
      <router-link :to="{name: 'home'}">Home</router-link>
    </li>
    <li>
      <router-link :to="{name: 'projects'}">Progetti</router-link>
    </li>
  </ul>
 </nav>
 <div>
  <router-view></router-view>
 </div>
</template>



<style>

</style>