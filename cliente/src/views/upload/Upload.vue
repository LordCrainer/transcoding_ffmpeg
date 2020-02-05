<template>
  <div class="about">
    <v-container grid-list-xs,sm,md,lg,xl fill-height>
      <v-layout row wrap>
        <v-row>
          <v-col cols="12">
            <v-row justify="space-around" align="center">
              <v-card width="450">
                <v-form
                  ref="formSubida"
                  v-model="activeFlag.dataForm"
                  lazy-validation
                >
                  <v-card-text class="title">
                    <h4 class="text-center">SUBIR ARCHIVOS</h4>
                  </v-card-text>
                  <v-card-text>
                    <input-file
                      :option="inputFileOption.upload"
                      v-model="model.files"
                      @input="getFile"
                      label="Subir Archivo"
                    ></input-file>
                  </v-card-text>
                  <v-card flat class="pa-3">
                    <h3 class="text-center">CARGAR PLANTILLA</h3>
                    <v-card-text class="pa-0"> </v-card-text>
                    <v-card-text>
                      <v-row>
                        <v-col cols="2">
                          <v-btn
                            fab
                            color="success"
                            small=""
                            @click="addConfig"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="8">
                          <input-file
                            v-model="model2"
                            label="Importar Plantilla"
                            v-on:input="importData"
                          ></input-file>
                        </v-col>
                      </v-row>
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
                      :disabled="!activeFlag.valid"
                      @click="uploadFile"
                      >Subir</v-btn
                    >
                    <v-btn
                      color="primary"
                      :disabled="!activeFlag.valid"
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
                      @click="activeFlag.monitoring = !activeFlag.monitoring"
                      ><v-icon dark>mdi-playlist-check</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-row>
          </v-col>
          <v-col cols="12" v-if="activeFlag.monitoring">
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
                        :value="uploadVar.uploadPercentFile"
                        rounded=""
                        reactive
                      >
                        <template v-slot="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h3>{{ uploadVar.uploadTime }}</h3>
                    </v-col>
                    <v-col>
                      <v-icon color="success">mdi-check-outline</v-icon>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text
                  class="py-0"
                  v-for="(conversion, index) in model.configuration"
                  :key="conversion.titulo"
                >
                  <v-row>
                    <v-col cols="10">
                      <h3>{{ conversion.titulo }}</h3>
                      <v-progress-linear
                        color="blue"
                        height="20"
                        :value="uploadVar.configurationPercent[index]"
                        rounded=""
                        reactive
                      >
                        <template v-slot="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h3>{{ uploadVar.configurationDuration[index] }}</h3>
                    </v-col>
                    <v-col>
                      <v-icon color="success">mdi-check-outline</v-icon>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <h4 class="text-left">
                    DURACIÓN TOTAL: {{ uploadVar.totalDuration }}
                  </h4>
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

import inputFile from "../../components/upload/inputFile";
import inputRadioGroup from "../../components/form/RadioGroup";
import dataUpload from "../../data/data.json";
import template from "../../data/templateUploadFile.json";
//import generatorForm from "../../components/form/generatorForm";
export default {
  components: {
    inputFile,
    inputRadioGroup
    //generatorForm
  },
  data: () => ({
    apiUrl: "http://localhost:3000/",
    inputFileOption: { upload: { outlined: true }, template: {} },
    activeFlag: { monitoring: true, valid: true, dataForm: true },
    uploadVar: {
      uploadPercentFile: 0,
      configurationPercent: [],
      configurationDuration: [],
      totalDuration: "",
      uploadTime: "",
      timeMode: "seg",
      indexConfiguration: 0
    },
    intervalFunction: "",
    model: dataUpload,
    model2: "",
    Plantilla: template,
    porcentajeConversion: "",
    tempUploadVar: {}
  }),
  methods: {
    getFile(e) {
      console.log("EVENT:", e);
    },
    addConfig() {
      this.model.configuration.push({});
    },
    eliminateConfig(index) {
      console.log(index);
      this.model.configuration.splice(index, 1);
    },
    getDurationProcess(timeBefore, timeNow) {
      const duracion = new Date(timeNow - timeBefore);
      let timeMode = "";
      const segundos =
        duracion.getSeconds() < 10
          ? "0" + duracion.getSeconds()
          : duracion.getSeconds();
      const minutos = duracion.getMinutes();
      if (minutos !== 0) timeMode = "min";
      else timeMode = "seg";
      const durationProceso = `${minutos}:${segundos} ${timeMode}`;
      return durationProceso;
    },
    sendData(ruta, data, option) {
      let metadata = axios
        .post(this.apiUrl + ruta, data, option)
        .then(res => {
          console.log("Response on Server:", res);
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
        this.uploadVar = this.tempUploadVar;
        let formData = new FormData();
        const { files, configuration } = this.model;
        console.log(files);

        formData.append("file", files);
        const uploadOption = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            this.uploadVar.uploadPercentFile = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this)
        };
        const time = new Date();
        const { data } = await this.sendData("videos", formData, uploadOption);
        this.uploadVar.uploadTime = this.getDurationProcess(time, new Date());
        await this.sendData("videos/transcoding", {
          configuration: configuration,
          path: data.path
        });
        this.uploadVar.totalDuration = this.getDurationProcess(
          time,
          new Date()
        );
      }
    },
    resetForm() {
      this.$refs.formSubida.reset();
    },
    resetValidation() {
      this.$refs.formSubida.resetValidation();
    },
    importData(e) {
      if (e) {
        let reader = new FileReader();
        reader.readAsText(e, "UTF-8");
        reader.onload = evt => {
          this.model2 = evt.target.result;
          this.model = JSON.parse(this.model2);
        };
        reader.onerror = evt => {
          console.error(evt);
        };
      }
    },
    getDataBySockect() {
      this.sockets.subscribe("conversionVideoIndex", data => {
        this.uploadVar.configurationPercent.splice(data.index, 1, 0);
        this.uploadVar.indexConfiguration = data.index;
      });
      this.sockets.subscribe("conversionVideo", data => {
        this.uploadVar.configurationPercent.splice(
          this.uploadVar.indexConfiguration,
          this.uploadVar.indexConfiguration + 1,
          data.percentage
        );
      });
      this.sockets.subscribe("durationProcess", data => {
        this.uploadVar.configurationDuration.splice(
          this.uploadVar.indexConfiguration,
          this.uploadVar.indexConfiguration + 1,
          this.getDurationProcess(
            new Date(data.timeInit),
            new Date(data.timeFinal)
          )
        );
      });
    },
    sendMessage() {
      console.log("Enviando Mensaje");
      this.$socket.emit("message", "DATA"); // send the content of the message bar to the server
      this.message = ""; // empty the message bar
    }
  },
  mounted() {
    this.getDataBySockect();
    this.tempUploadVar = this.uploadVar;
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log("DATA:", data);
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>
<style lang="css" scoped></style>
