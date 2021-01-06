<template>
  <div class="checkbox">
    <v-checkbox
      v-for="dato in data"
      :key="dato.label"
      :label="dato.label"
      :value="dato.value"
      @change="inputCheckbox"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  props: ["value", "data"],
  methods: {
    inputCheckbox(e) {
      this.$emit("input", e);
    }
  }
};
</script>
