<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <Snackbar
        v-model="snackbar.status"
        :message="snackbar.message"
        @input="snackbar.status = false"
      />
      <v-card min-width="500" max-width="500">
        <v-app-bar color="deep-purple darken-4 ">
          <v-spacer />
          <v-toolbar-title>SUBIDA DE ARCHIVO POR HTTP</v-toolbar-title>
          <v-spacer />
          <uiMenu :items="menu">
            <template #pre="{item}">
              <v-list-item-icon>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <template #post="{item}">
              <v-list-item-action>
                <v-switch v-model="item.action" color="purple"></v-switch>
              </v-list-item-action>
            </template>
          </uiMenu>
        </v-app-bar>
        <v-card light="" tile>
          <v-form
            id="uploadForm"
            @submit.prevent="upload"
            v-model="form.validForm"
            ref="form"
            lazy-validation
          >
            <v-card-text>
              <v-img :src="imagenURL(logo.src)" height="80" contain=""> </v-img>
            </v-card-text>
            <v-card-text>
              <v-file-input
                v-model="form.file"
                color="deep-purple accent-4"
                label="Entrada de Archivos"
                placeholder="Selecciona tus archivos a subir"
                prepend-icon="mdi-paperclip"
                outlined
                ref="inputUpload"
                :rules="validatedFiles"
                @change="onFilePicked"
                :show-size="1000"
                counter-size-string
                error-count="2"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ form.file.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-card-text>
            <!--  <v-card-text>
              <channelList @channels-selected="form.metaData" />
            </v-card-text> -->
            <v-card-text class="pt-0">
              <h4>LISTA DE MEDIOS</h4>
              <div class="pa-0 pt-2">
                <client-only
                  ><channelTable @input="channelsSelected" />
                </client-only>
              </div>
            </v-card-text>
            <v-card-text>
              <v-row dense>
                <v-col
                  cols="12"
                  class="d-flex justify-center font-weight-black"
                >
                  PROGRESO DE SUBIDA
                </v-col>
                <v-col>
                  <v-progress-linear
                    rounded
                    v-model="progressUpload"
                    color="green darken-2"
                    height="25"
                    reactive
                  >
                    <template v-slot="{ value }">
                      <strong class="white--text"
                        >{{ Math.ceil(value) }}%</strong
                      >
                    </template>
                  </v-progress-linear>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row align="right" justify="space-around">
                <v-btn
                  rounded=""
                  outlined=""
                  @click="cancelUpload"
                  color="error"
                >
                  CANCELAR
                </v-btn>
                <v-btn dark rounded="" type="submit" color="blue darken-3">
                  SUBIR
                </v-btn>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
//import channelList from "@/components/file/select-channel";
import channelTable from "@/components/file/channel-table";
import Snackbar from "@/components/Snackbar";
import uiMenu from "@/components/ui/menu";

import messageDict from "@/lib/messageDict";
export default {
  name: "file",
  components: {
    //channelList,
    channelTable,
    Snackbar,
    uiMenu
  },
  name: "file",
  data: () => ({
    menu: [{ title: "redirect", icon: "cog", action: false }],
    snackbar: {
      status: false,
      message: ""
    },
    form: {
      metaData: [],
      file: [],
      files: [],
      validForm: false,
      uploadTypes: {
        types: [
          { title: "multer", path: "upload" },
          { title: "formidable", path: "uploadFormidable" }
        ],
        selected: "formidable"
      }
    },
    formRules: {
      file: [true]
    },
    formValidate: [
      {
        property: "file",
        type: "array",
        isRequired: true
      }
    ],
    logo: {
      src: ""
    },
    progressUpload: 0
  }),
  computed: {
    modeItems() {
      const mode = this.form.uploadTypes.types.map(mode => mode.title);
      return mode;
    },
    validatedFiles() {
      const rule = this.fileRule(this.form.file, "size");
      return rule;
    }
  },
  methods: {
    fileRule(value = [], property) {
      const GIGA = 1000 * 1000 * 1000;
      const MAX_SIZE = 1 * GIGA;
      const rule = [
        !!value.toString() || "No existe ningún archivo seleccionado",
        value.length <= 0 ||
          value.size < MAX_SIZE ||
          `El archivo es superior a ${MAX_SIZE / GIGA} Gb`
      ];
      return rule;
    },
    channelsSelected(value) {
      this.form.metaData = value;
    },
    async sendData(path, data, config) {
      const response = this.$axios.$post(path, data, config);
      return response;
    },
    porcentProgress(progressEvent) {
      const progressUpload = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );
      return progressUpload;
    },
    async addFormData({ file, metaData }) {
      let formData;
      try {
        formData = new FormData();
        formData.append("files", file, file.title);
        formData.append("metaData", JSON.stringify(metaData));
      } catch (error) {
        console.log("ERROR", error);
      }
      return formData;
    },
    async validationForm(rule) {
      try {
        this.$refs.form.validate();
        const isTrue = value => value === true;
        const someError = ![...rule].every(isTrue);
        if (someError) throw "";
      } catch (err) {
        throw "Falta un parámetro";
      }
    },
    async upload(e) {
      const mode = mode => mode.title === this.form.uploadTypes.selected;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: function(progressEvent) {
          this.progressUpload = this.porcentProgress(progressEvent);
        }.bind(this)
      };
      try {
        await this.validationForm(this.validatedFiles);
        const { path } = this.form.uploadTypes.types.find(mode);
        const formData = await this.addFormData(this.form);
        const response = await this.sendData(`/file/${path}`, formData, config);
      } catch (err) {
        console.log("ERROR_UPLOAD_FILE", err);
      }
    },
    cancelUpload() {
      this.form = Object.assign(this.form, { file: [], metaData: [] });
    },
    onFilePicked(value) {
      this.validatedFiles;
    }
  }
};
</script>
