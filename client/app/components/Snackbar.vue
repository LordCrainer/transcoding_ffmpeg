<template>
  <div>
    <!--  <v-snackbar :value="value" :timeout="3000" top>
      {{ message }}
      <v-btn dark text @click="$emit('input', false)">
        Close
      </v-btn>
    </v-snackbar> -->
    <v-snackbar
      v-for="(snackbar, index) in showedSnackbars"
      :key="snackbar.message + Math.random()"
      :value="snackbar.showing"
      @input="removeSnackbar(snackbar)"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${index * 60 + 8}px`"
      top
    >
      {{ snackbar.message }}
      <v-btn text @click="removeSnackbar(snackbar)">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({ snackbars: state => state.module.snackbars.snackbars }),
    showedSnackbars() {
      return this.snackbars.filter(prop => prop.showing);
    }
  },
  methods: {
    ...mapActions({ remove: "module/snackbars/remove" }),
    removeSnackbar(snackbar) {
      this.remove(snackbar);
      this.$emit("input", false);
    }
  }
};
</script>
