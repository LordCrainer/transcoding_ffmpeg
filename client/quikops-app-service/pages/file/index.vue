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
                <v-switch v-model="item.action" color="purple" />
              </v-list-item-action>
            </template>
          </uiMenu>
        </v-app-bar>
        <v-card light="" tile>
          <v-form
            id="uploadForm"
            ref="form"
            v-model="form.validForm"
            lazy-validation
            @submit.prevent="upload"
          >
            <v-card-text>
              <v-img :src="imagenURL(logo.src)" height="80" contain="" />
            </v-card-text>
            <v-card-text>
              <v-file-input
                ref="inputUpload"
                v-model="form.file"
                color="deep-purple accent-4"
                label="Entrada de Archivos"
                placeholder="Selecciona tus archivos a subir"
                prepend-icon="mdi-paperclip"
                outlined
                :rules="validatedFiles"
                :show-size="1000"
                counter-size-string
                error-count="2"
                @change="onFilePicked"
              >
                <template #selection="{ index, text }">
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
                <client-only>
                  <channelTable @input="channelsSelected" />
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
                    v-model="progressUpload"
                    rounded
                    color="green darken-2"
                    height="25"
                    reactive
                  >
                    <template #default="{ value }">
                      <strong
                        class="white--text"
                      >{{ Math.ceil(value) }}%</strong>
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
                  color="error"
                  @click="cancelUpload"
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
// import channelList from "@/components/file/select-channel";
import channelTable from '@/components/file/channel-table'
import Snackbar from '@/components/Snackbar'
import uiMenu from '@/components/ui/menu'

export default {
  name: 'File',
  components: {
    // channelList,
    channelTable,
    Snackbar,
    uiMenu
  },
  data: () => ({
    menu: [{ title: 'redirect', icon: 'cog', action: false }],
    snackbar: {
      status: false,
      message: ''
    },
    form: {
      metaData: [],
      file: [],
      files: [],
      validForm: false,
      uploadTypes: {
        types: [
          { title: 'multer', path: 'upload' },
          { title: 'formidable', path: 'uploadFormidable' }
        ],
        selected: 'formidable'
      }
    },
    formRules: {
      file: [true]
    },
    formValidate: [
      {
        property: 'file',
        type: 'array',
        isRequired: true
      }
    ],
    logo: {
      src: ''
    },
    progressUpload: 0
  }),
  computed: {
    modeItems () {
      const mode = this.form.uploadTypes.types.map(mode => mode.title)
      return mode
    },
    validatedFiles () {
      const rule = this.fileRule(this.form.file, 'size')
      return rule
    }
  },
  methods: {
    fileRule (value = [], property) {
      const GIGA = 1000 * 1000 * 1000
      const MAX_SIZE = 1 * GIGA
      const rule = [
        !!value.toString() || 'No existe ningún archivo seleccionado',
        value.length <= 0 ||
          value.size < MAX_SIZE ||
          `El archivo es superior a ${MAX_SIZE / GIGA} Gb`
      ]
      return rule
    },
    channelsSelected (value) {
      this.form.metaData = value
    },
    async sendData (path, data, config) {
      const response = await this.$axios.$post(path, data, config)
      return response
    },
    porcentProgress (progressEvent) {
      const progressUpload = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      )
      return progressUpload
    },
    addFormData ({ file, metaData }) {
      const formData = new FormData()
      formData.append('files', file, file.title)
      formData.append('metaData', JSON.stringify(metaData))
      return formData
    },
    validationForm (rule) {
      this.$refs.form.validate()
      const isTrue = value => value === true
      const someError = ![...rule].every(isTrue)
      if (someError) { throw new Error('Validación incompleta') }
    },
    async upload (e) {
      const mode = mode => mode.title === this.form.uploadTypes.selected
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          this.progressUpload = this.porcentProgress(progressEvent)
        }.bind(this)
      }
      try {
        this.validationForm(this.validatedFiles)
        const { path } = this.form.uploadTypes.types.find(mode)
        const formData = await this.addFormData(this.form)
        const response = await this.sendData(`/file/${path}`, formData, config)
        return response
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('ERROR_UPLOAD_FILE', err)
      }
    },
    cancelUpload () {
      this.form = Object.assign(this.form, { file: [], metaData: [] })
    },
    onFilePicked (value) {
      this.validatedFiles()
    }
  }
}
</script>
