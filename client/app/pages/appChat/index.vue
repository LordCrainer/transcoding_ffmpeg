<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <v-card min-width="290" color="#424242">
        <Snackbar v-model="snackbar" :message="message" />

        <v-card-title>
          <h2>Login</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="isValid"
            lazy-validation
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="userData.name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            />
            <v-text-field
              v-model="userData.room"
              :counter="16"
              :rules="roomRules"
              label="Enter the room"
              required
            />
            <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-3"
              type="submit"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Snackbar from "@/components/Snackbar";
import messageDict from "@/lib/messageDict";

export default {
  name: "Home",
  layout: "login",
  components: {
    Snackbar
  },
  data: () => ({
    isValid: true,
    userData: {
      name: "",
      room: "",
      typingStatus: false
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 16) || "Name must be less than 16 characters"
    ],
    roomRules: [
      v => !!v || "Enter the room",
      v => (v && v.length <= 16) || "Room must be less than 16 characters"
    ],
    snackbar: false
  }),
  computed: {
    ...mapState({ user: state => state.users.user }),
    message() {
      const { message } = this.$route.query;
      return messageDict[message] || "";
    }
  },
  mounted() {
    this.snackbar = !!this.message;
  },

  methods: {
    ...mapActions({ createUser: "users/createUser" }),
    async submit() {
      if (this.$refs.form.validate()) {
        await this.createUser(this.userData);
        this.$router.push("/appChat/chat");
      }
    }
  },

  head: {
    title: "nuxt-chat-app"
  }
};
</script>
