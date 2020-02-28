<template>
  <v-app color="primary">
    <Toolbar init="INICIO" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./layout/Toolbar";
export default {
  name: "App",
  components: {
    Toolbar
  },
  data: () => ({
    datos: [1, 2, 3, 4]
  })
};
</script>
<style>
</style>
