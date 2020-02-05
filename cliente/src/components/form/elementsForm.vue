<template>
  <div class="elementosFormulario">
    <div v-if="field.type == 'email'">
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
    </div>
    <div v-else-if="field.type == 'select'">
      <v-select
        v-model="value"
        :items="field.values"
        :label="field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        single-line
        bottom
        @input="onInput"
      >
      </v-select>
    </div>
    <div v-else-if="field.type == 'checkbox'">
      <v-checkbox
        v-model="value"
        :label="field.label"
        :required="field.required"
        :disabled="field.disabled"
        @input="onInput"
      ></v-checkbox>
    </div>
    <div v-else-if="field.type == 'textarea'">
      <v-textarea
        v-model="value"
        :label="field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        v-bind:textarea="field.featured"
        auto-grow
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
        @input="onInput"
      ></v-textarea>
    </div>
    <div v-else>
      <v-text-field
        v-model="value"
        :label="field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :rules="Rules[field.rules]"
        :counter="field.counter"
        :mask="field.mask"
        :hint="field.hint"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
        @input="onInput"
      >
      </v-text-field>

      <v-alert
        v-if="field.type != 'text'"
        color="error"
        icon="warning"
        value="true"
      >
        <strong>The {{ field.type }} type is not yet implemented.</strong>
        <br />
        field: {{ field }}
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data: () => ({
    Rules: {
      required: [v => !!v || this.field.label + " es requerido"],
      nameRules: [
        v => !!v || this.field.label + " es requerido",
        v =>
          (v && v.length <= this.field.counter) ||
          this.field.label +
            "debe ser menor de " +
            this.field.counter +
            " carácteres"
      ],
      email: [
        v => !!v || this.field.label + " es requerido",
        v =>
          (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(v) ||
          this.validationErrorMessages.emailInvalid
      ]
    },
    mask: {
      phone: "phone",
      credit: "credit-card"
    },
    validationErrorMessages: {
      emailInvalid: "E-mail must be valid"
    }
  }),
  methods: {
    watch: {
      copyValue: function() {
        console.log(this.value);
        return this.value;
      }
    },
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
      },
      appendPasswordIconCheckbox() {
        return () => (this.field.passwordVisible = !this.field.passwordVisible);
      }
    }
  }
};
</script>

<style></style>
