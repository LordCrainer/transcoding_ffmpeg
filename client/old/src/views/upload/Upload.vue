<template>
  <div class="about">
    <v-container grid-list-xs,sm,md,lg,xl fill-height>
      <v-layout row wrap>
        <v-row>
          <v-col cols="12">
            <v-row justify="space-around" align="center">
              <v-card width="450">
                <v-form ref="formSubida" v-model="dataForm" lazy-validation>
                  <v-card-text class="title">
                    <h4 class="text-center">SUBIR ARCHIVOS</h4>
                  </v-card-text>
                  <v-card-text>
                    <input-file v-model="model.files"></input-file>
                  </v-card-text>
                  <v-card flat class="pa-3">
                    <v-card-text>
                      <div class="pb-2">
                        <v-btn fab color="success" small="" @click="addConfig">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                      <v-expansion-panels flat>
                        <v-expansion-panel
                          v-for="(config, i) in model.configuration"
                          :key="i"
                        >
                          <v-expansion-panel-header>
                            <div>
                              <v-btn
                                fab
                                x-small
                                color="error"
                                icon
                                dark
                                @click="eliminateConfig(i)"
                              >
                                <v-icon>mdi-minus</v-icon>
                              </v-btn>
                            </div>
                            <div>
                              {{ config.titulo }}
                            </div>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content>
                            <div
                              v-for="configValues in Plantilla.configuration
                                .values"
                              :key="configValues.title"
                            >
                              <v-text-field
                                v-if="configValues.type == 'text'"
                                v-model="config[configValues.model]"
                                :label="configValues.label"
                                :required="configValues.required"
                                :placeholder="
                                  configValues.placeholder || 'Escriba aquí'
                                "
                              ></v-text-field>

                              <input-radio-group
                                v-else
                                v-model="config[configValues.model]"
                                :field="configValues"
                              ></input-radio-group>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                  <v-card-actions>
                    <v-btn
                      color="primary"
                      :disabled="!valid"
                      @click="uploadFile"
                      >Subir</v-btn
                    >
                    <v-btn
                      color="primary"
                      :disabled="!valid"
                      @click="uploadFile"
                      >Guardar Plantilla</v-btn
                    >
                    <v-btn color="error" outlined="" @click="resetForm"
                      >Cancelar</v-btn
                    >
                    <v-btn
                      fab
                      medium
                      dark=""
                      color="red"
                      @click="activeMonitoring = !activeMonitoring"
                      ><v-icon dark>mdi-playlist-check</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-row>
          </v-col>
          <v-col cols="12" v-if="activeMonitoring">
            <v-row justify="space-around" align="center">
              <v-card width="450">
                <v-card-text class="title">
                  <h4 class="text-center ">MONITOREO</h4>
                </v-card-text>
                <v-card-text>
                  <v-row>
                    <v-col cols="10">
                      <h3>Archivo</h3>
                      <v-progress-linear
                        color="deep-orange"
                        height="20"
                        :value="uploadPercentage"
                        rounded=""
                        reactive
                      >
                        <template v-slot="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h3>{{ uploadTime }}</h3>
                    </v-col>
                    <v-col>
                      <v-icon color="success">mdi-check-outline</v-icon>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text
                  class="py-0"
                  v-for="conversion in model.configuration"
                  :key="conversion.titulo"
                >
                  <v-row>
                    <v-col cols="10">
                      <h3>{{ conversion.titulo }}</h3>
                      <v-progress-linear
                        color="blue"
                        height="20"
                        value="100"
                        rounded=""
                        reactive
                      >
                        <template v-slot="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h3>{{ conversion.tiempo }}</h3>
                    </v-col>
                    <v-col>
                      <v-icon color="success">mdi-check-outline</v-icon>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { mdiHighDefinition, mdiVolumeHigh } from "@mdi/js";
import inputFile from "../../components/upload/inputFile";
import inputRadioGroup from "../../components/form/RadioGroup";
//import generatorForm from "../../components/form/generatorForm";
export default {
  components: {
    inputFile,
    inputRadioGroup
    //generatorForm
  },
  data: () => ({
    activeMonitoring: true,
    uploadPercentage: "",
    uploadTime: "",
    modoTiempo: "seg",
    intervalFunction: "",
    apiUrl: "http://localhost:3000/",
    model: {
      files: [],
      configuration: [
        {
          titulo: "Facebook HD",
          definition: "HD",
          format: "XDCAM",
          volumen: "-12",
          videoCodec: "",
          audioCodec: "",
          extension: ".mp4",
          dimension: "1920x1080",
          tiempo: "1:37 min"
        },
        {
          titulo: "Youtube HD",
          definition: "HD",
          format: "XDCAM",
          volumen: "-12",
          videoCodec: "H264",
          audioCodec: "PCM",
          extension: ".mxf",
          dimension: "1920x1080",
          tiempo: "1:57 min"
        },
        {
          titulo: "Whatsapp HD",
          definition: "HD",
          format: "DV 25",
          volumen: "-12",
          videoCodec: "",
          audioCodec: "",
          extension: ".mxf",
          dimension: "720x486",
          tiempo: "0:56 min"
        }
      ]
    },
    Plantilla: {
      files: [],
      configuration: {
        values: [
          {
            type: "text",
            title: "titulo",
            model: "titulo",
            icono: mdiHighDefinition,
            label: "Título",
            requiered: true,
            values: ""
          },
          {
            type: "radioGroup",
            title: "definition",
            model: "definition",
            icono: mdiHighDefinition,
            label: ["16:9", "4:3"],
            values: ["HD", "SD"]
          },
          {
            type: "radioGroup",
            title: "format",
            model: "format",
            icono: mdiHighDefinition,
            label: ["XDCAM", "DIVCPRO", "DV 25"],
            values: ["XDCAM", "DIVCPRO", "DV 25"]
          },
          {
            type: "radioGroup",
            title: "volumen",
            model: "volumen",
            icono: mdiVolumeHigh,
            label: ["-12", "-14"],
            values: ["-12", "-14"]
          }
        ]
      }
    },
    valid: true,
    dataForm: true
  }),
  created() {
    //this.sendData();
    //this.getData();
  },
  methods: {
    addConfig() {
      this.model.configuration.push({});
    },
    eliminateConfig(index) {
      console.log(index);
      this.model.configuration.splice(index, 1);
    },
    sendData(ruta, data, option) {
      const timeBefore = new Date();

      let metadata = axios
        .post(this.apiUrl + ruta, data, option)
        .then(res => {
          console.log("Response on Server:", res);
          const timeNow = new Date();
          const duracion = new Date(timeNow - timeBefore);
          const segundos =
            duracion.getSeconds() < 10
              ? "0" + duracion.getSeconds()
              : duracion.getSeconds();
          const minutos = duracion.getMinutes();
          if (minutos !== 0) this.modoTiempo = "min";
          this.uploadTime = `${minutos}:${segundos} ${this.modoTiempo}`;
          return res;
        })
        .catch(error => console.log("Error sendData:", error));
      return metadata;
    },
    getData(ruta) {
      axios
        .get(this.apiUrl + ruta)
        .then(res => console.log("Respuesta:", res))
        .catch(error => console.log("Error getData, Upload:", error));
    },
    async uploadFile() {
      if (this.$refs.formSubida.validate()) {
        let formData = new FormData();
        console.log(this.model);
        formData.append("file", this.model.files);
        const option = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            /* this.intervalFunction = setInterval(() => {
              this.uploadTime = this.uploadTime + 1;
            }, 1000); */
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this)
        };
        const { data } = await this.sendData("videos", formData, option);
        let metada = {
          configuration: this.model.configuration,
          path: data.path
        };
        await this.sendData("videos/transcoding", metada);
      }
    },
    resetForm() {
      this.$refs.formSubida.reset();
    },
    resetValidation() {
      this.$refs.formSubida.resetValidation();
    }
  }
};
</script>
<style lang="css" scoped></style>
