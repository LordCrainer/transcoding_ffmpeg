<template>
  <v-app-bar app color="#001049">
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" src="@/assets/logo.svg">
        <v-img src="@/assets/logo.svg" width="200"></v-img>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/" color="white">
      <span class="mr-2 white--text">{{ init }}</span>
    </v-btn>
    <v-btn text to="/upload" color="white">
      <span class="mr-2 white--text">SUBIR</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  props: ["init"]
};
</script>
