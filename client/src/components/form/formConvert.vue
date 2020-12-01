<template>
  <div class="formularioConversion">
    <v-card-text>
      <v-text-field
        v-model="value"
        :label="field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :rules="Rules.email"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
        @input="onInput"
      ></v-text-field>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["field"],
  methods: {
    onBlur: function() {
      this.$emit("blur");
    },
    onChange: function() {
      this.$emit("change");
    },
    onFocus: function() {
      this.$emit("focus");
    },
    onInput(e) {
      this.$emit("input", e);
    }
  }
};
</script>
