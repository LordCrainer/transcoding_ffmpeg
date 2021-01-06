<template>
  <div class="radioGroup">
    <v-radio-group
      :value="value"
      :prepend-icon="field.icono"
      :rules="[v => !!v || 'Seleccione una opción']"
      required
      row
      @change="inputRadioGroup"
    >
      <v-radio
        v-for="(valor, index) in field.values"
        :key="index"
        :label="`${valor}`"
        :value="valor"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
<script>
export default {
  name: "radioGroup",
  props: ["value", "field"],
  data: () => ({
    data: ""
  }),
  methods: {
    inputRadioGroup(e) {
      this.$emit("input", e);
    }
  }
};
</script>
