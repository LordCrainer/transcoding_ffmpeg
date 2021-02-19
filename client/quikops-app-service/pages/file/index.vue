<template>
  <v-row no-gutters justify="center">
    <v-col cols="auto">
      <Snackbar
        v-model="snackbar.status"
        :message="snackbar.message"
        @input="snackbar.status = false"
      />
      <v-card min-width="500" max-width="500">
        <v-app-bar color="primary">
          <v-spacer />
          <v-toolbar-title>SISTEMA DE ENVÍOS</v-toolbar-title>
          <v-spacer />
          <uiMenu :items="menu">
            <template #pre="{data}">
              <v-list-item-icon>
                <v-icon>mdi-{{ data.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <template #title="{data}">
              <v-card-text class="pa-0">
                <v-list-item-title>{{ data.title }}</v-list-item-title>
              </v-card-text>

              <v-select
                v-model="form.uploadTypes.selected"
                :items="form.uploadTypes.types"
                label="MODE"
                dense
                color="white"
              >
                <template #item="{ item }">
                  <h4 style="color: white;">
                    {{ item.title }}
                  </h4>
                </template>
                <template #selection="{ item }">
                  <h4 style="color: white;">
                    {{ item.title }}
                  </h4>
                </template>
              </v-select>
            </template>
            <!--             <template #post="{item}">
              <v-list-item-action>
                <v-select v-model="item.action" color="purple" />
              </v-list-item-action>
            </template> -->
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
              <v-img :src="logo.src" height="80" contain="" />
            </v-card-text>
            <v-card-text>
              <v-file-input
                ref="inputUpload"
                v-model="form.file"
                color="deep-purple accent-4"
                placeholder="Selecciona un archivo"
                prepend-icon="mdi-paperclip"
                :rules="validatedFiles"
                :show-size="1000"
                counter-size-string
                filled
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
            <div v-if="form.uploadTypes.selected.title == 'predefined'">
              <v-card-text class="pt-0">
                <h4>LISTA DE MEDIOS</h4>
                <div class="pa-0 pt-2">
                  <client-only>
                    <channelTable @input="channelsSelected" />
                  </client-only>
                </div>
              </v-card-text>
            </div>
            <div v-else>
              <v-card-text class="pt-0 px-5">
                <h4>TRANSCODING PERSONALIZABLE</h4>
                <div>
                  <v-combobox
                    v-model="param.program"
                    :items="programs.items"
                    label="Seleccione un programa"
                    chips
                  >
                    <template #selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="data.item.slice(0, 1).toUpperCase()"
                        />
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </div>
                <div>
                  <v-text-field v-model="param.command" label="Escriba los comandos" />
                </div>
                <div>
                  <v-text-field v-model="param.destiny" label="Destino" />
                </div>
              </v-card-text>
            </div>
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
            <!--             <v-card-text>
              <stepper />
            </v-card-text> -->
            <v-card-text>
              <v-row justify="space-around">
                <v-btn
                  rounded=""
                  outlined=""
                  color="error"
                  @click="cancelUpload"
                >
                  CANCELAR
                </v-btn>
                <v-btn dark rounded="" type="submit" color="primary">
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
// import stepper from '@/components/ui/stepper'

export default {
  name: 'File',
  components: {
    // channelList,
    channelTable,
    Snackbar,
    uiMenu
    // stepper
  },
  data: () => ({
    programs: {
      items: ["ffmpeg", "ffmbc"],
      selected: ""
    },
    param: { program: "", commands: "", destiny: "" },
    menu: [{ title: 'MODE', icon: 'cog', action: false }],
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
          { title: 'predefined', path: 'transcoding/' },
          { title: 'custom', path: 'transcoding/custom/upload' }
        ],
        selected: { title: 'custom', path: 'transcoding/custom/upload' }
      },
      params: [

      ]
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
    examplesParams: [{
      origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
      destiny: "C:/Users/camog/Desktop/CONVERT/original_dvcpro.mov",
      metaData: {
        general: {
          profile: "dvcpro"
        },
        audio: { codec: "pcm_s16le" },
        video: { codec: "mpeg4", frameRate: "29970/1000", bitRate: "50M" }
      },
      filter: {
        normalizeVolume: {
          threshold: -12,
          marginError: -2,
          max: -10,
          min: -14,
          unit: "dB"
        }
      }
    },
    {
      origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
      destiny: "C:/Users/camog/Desktop/CONVERT/original_H264.mov",
      metaData: {
        general: {
          profile: "H264"
        },
        audio: { codec: "pcm_s16le" },
        video: { codec: "libx264", frameRate: "29970/1000", bitRate: "50M" }
      },
      filter: {
        normalizeVolume: {
          threshold: -14,
          marginError: -1,
          max: -13,
          min: -15,
          unit: "dB"
        }
      }
    }],
    logo: {
      src: 'logo.png'
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
        value => !!value || 'No existe ningún archivo seleccionado',
        value => !value || value.size < MAX_SIZE || `El archivo es superior a ${MAX_SIZE / GIGA} Gb`
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
    addFormData ({ file, metaData, params }) {
      const formData = new FormData()
      formData.append('files', file, file.title)
      formData.append('metaData', JSON.stringify(metaData))
      formData.append('params', JSON.stringify(this.param))
      return formData
    },
    validationForm (rule) {
      const isValidated = this.$refs.form.validate()
      // const isTrue = value => value === true
      // const someError = ![...rule].every(isTrue)
      if (!isValidated) { throw new Error('Validación incompleta') }
      return isValidated
    },
    async upload (e) {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function (progressEvent) {
            this.progressUpload = this.porcentProgress(progressEvent)
          }.bind(this)
        }
        this.validationForm(this.validatedFiles)
        const { path } = this.form.uploadTypes.selected
        const formData = await this.addFormData(this.form)
        const response = await this.sendData(`/${path}`, formData, config)
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
      // return this.validatedFiles
    }
  }
}
</script>
