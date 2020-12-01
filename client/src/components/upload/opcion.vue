<template>
  <div class="opcionUpload">
    <v-card>
      <v-card-text>
        {{ items.title }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["items"]
};
</script>

<style></style>
