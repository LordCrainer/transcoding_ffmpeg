<template>
  <div class="inputFile">
    <v-file-input
      color="deep-purple accent-4"
      :rules="[v => !!v || 'Escoga un archivo para subir']"
      required
      counter
      label="File input"
      placeholder="Seleccione un archivo"
      prepend-icon="mdi-paperclip"
      outlined
      :show-size="1000"
      @change="fileData"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 2"
          color="deep-purple accent-4"
          dark
          label
          small
          >{{ text }}</v-chip
        >
        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
          >+{{ value.length - 2 }} File(s)</span
        >
      </template>
    </v-file-input>
  </div>
</template>
<script>
export default {
  name: "file",
  props: ["value", "field"],
  methods: {
    fileData(event) {
      console.log("Files:", event);
      this.$emit("input", event);
    }
  }
};
</script>
