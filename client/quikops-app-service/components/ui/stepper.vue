<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            Step {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          />
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          />

          <v-btn
            color="primary"
            @click="nextStep(n)"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      e1: 1,
      steps: 2
    }
  },

  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    }
  },

  methods: {
    nextStep (n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    }
  }
}
</script>
