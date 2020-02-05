<template>
  <div class="generadorFormulario">
    <div v-for="(campo, index) in template" :key="index">
      <div v-if="campo.type == 'subFields'">
        <div v-for="(subCampo, index) in modelo[campo.model]" :key="index">
          <generator-form
            :template="campo.template.fields"
            :modelo="modelo[campo.model][index]"
          >
          </generator-form>
        </div>
      </div>
      <div v-else>
        <component
          :is="campo.type"
          @input="value => (datos = value)"
          :field="campo"
        />
        {{ datos }}
      </div>
    </div>
  </div>
</template>

<script>
import file from "../upload/inputFile";
import radioGroup from "./RadioGroup";
//import generatorForm from "./generatorForm";
export default {
  name: "generatorForm",
  props: { modelo: Object, template: Array, options: Object },
  data: () => ({
    datos: ""
  }),
  components: {
    file,
    radioGroup
  }
};
</script>
