<template>
  <div class="inputFile">
    <v-file-input
      color="deep-purple accent-4"
      :rules="[v => !!v || 'Escoga un archivo para subir']"
      required
      counter
      :label="label"
      placeholder="Seleccione un archivo"
      prepend-icon="mdi-paperclip"
      :show-size="1000"
      v-bind="option"
      @change="fileData"
    >
      {{ field }}
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
  props: ["value", "field", "label", "option"],
  methods: {
    fileData(event) {
      console.log("Files:", event);
      this.$emit("input", event);
    }
  }
};
</script>
