<template>
  <div>
    <v-file-input
      ref="inputUpload"
      v-model="form.files"
      color="deep-purple accent-4"
      counter
      label="Entrada de Archivos"
      multiple="false"
      placeholder="Selecciona tus archivos a subir"
      prepend-icon="mdi-paperclip"
      outlined
      :show-size="1000"
      @change="onFilePicked"
    >
      <template #selection="{ index, text }">
        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </v-file-input>
  </div>
</template>

<script>
export default {
  props: {
    files: { type: Array, default: () => [] }
  },
  methods: {
    onFilePicked (e) {
      if (!e) {
        // console.log('undefined', e)
        return 0
      }
      this.$emit('input', e)
      // console.log(this.files);

      // this.files = [...e];
    }
  }
}
</script>

<style></style>
