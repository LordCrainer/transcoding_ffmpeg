<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <v-card min-width="500" tile>
        <v-app-bar color="blue darken-3">
          <v-spacer />
          <v-toolbar-title>SUBIDA DE ARCHIVO FTP</v-toolbar-title>
          <v-spacer />
          <v-btn text fab @click.prevent="exit"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-app-bar>
        <v-card light tile>
          <v-card-text>
            <v-img :src="imagenURL(logo.src)" height="100" contain=""> </v-img>
          </v-card-text>
          <v-card-text>
            <v-card flat>
              <v-app-bar dark dense flat color="blue darken-1">
                <v-spacer />
                <v-toolbar-title>INFORMACIÓN {{ ftp.status }} </v-toolbar-title>
                <v-spacer />
              </v-app-bar>
              <v-divider />
              <v-list dense>
                <v-list-item v-for="(item, index) in headers" :key="index">
                  <v-list-item-content class="font-weight-black">
                    {{ item.text }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    v-if="item.value === 'size'"
                    v-text="formatSize(items[item.value])"
                  >
                  </v-list-item-content>
                  <v-list-item-content class="align-end" v-else>
                    {{ items[item.value] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="d-flex justify-center font-weight-black">
                PROGRESO
              </v-col>
              <v-col>
                <v-progress-linear
                  rounded
                  v-model="ftp.progress"
                  color="green darken-2"
                  height="25"
                  reactive
                >
                  <template v-slot="{ value }">
                    <strong class="white--text">{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn outlined color="error" rounded @click="cancel">
              CANCELAR</v-btn
            >
            <v-btn color="primary" rounded @click="send">
              SUBIR ARCHIVO
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ftp",
  data: () => ({
    asyncData(context) {
      return { apiResult: context.req.data };
    },
    headers: [
      { text: "Status", value: "status" },
      { text: "Nombre Original", value: "filename" },
      { text: "Ruta destino", value: "destinyPath" },
      { text: "Tamaño", value: "size" }
    ],
    items: {
      status: false,
      originPath: "",
      filename: "",
      destinyPath: "",
      destinyName: "",
      size: 0,
      user_id: "",
      archivo_id: "",
      entrada_id: "",
      title: "",
      usuario: ""
    },
    logo: {
      src: "logo.png"
    },
    tempQueries:
      "?originPath=upload%2F2020-07-08-012824_1_Ecuavisa.mov&filename=2020-07-08-012824_1_Ecuavisa.mov&destinyPath=%2Flanube%2Fquincenazo-marca-propia-julio-aki-movil.mov&size=113962668&user_id=19&archivo_id=11713&entrada_id=12825&title=QUINCENAZO%20MARCA%20PROPIA%20JULIO%20%28AKI%20MOVIL%29&user=Continuidad%20%20Ecuavisa"
  }),
  computed: {
    ...mapState({ ftp: state => state.module.ftp.ftp })
  },

  mounted() {
    this.items = this.$route.query;
    this.initconfiguration(this.items);
  },
  methods: {
    ...mapActions({
      upload: "module/ftp/upload",
      test: "module/ftp/test",
      connection: "module/ftp/connectionFtp",
      disconnect: "module/ftp/disconnect"
    }),
    formatSize(size, mode) {
      const GIGA = 1024 * 1024 * 1024;
      const MEGA = 1024 * 1024;
      const relationSize = size / GIGA;
      const unit = relationSize > 1 ? GIGA : MEGA;
      const value = (size / unit).toFixed(2);
      const format = relationSize > 1 ? `${value} GB` : `${value} MB`;
      return format;
    },
    convertObjectToQueryString(obj) {
      const queries = new URLSearchParams(obj);
      return queries;
    },
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    validator(object, ...args) {
      return args.every(arg => object[arg]);
    },
    selectedDataNoEmpty(temp, data) {
      return this.isEmptyObject(data) ? temp : data;
    },
    async initconfiguration(queries, isValidated) {
      try {
        const isValidated = this.validator(queries, "archivo_id");
        if (!isValidated) throw "QUERY INCOMPLETE";
        const file_id = queries.archivo_id;
        queries = Object.assign(queries, {
          file_id,
          status: true
        });
        const id = await this.connection(queries);
        console.log("SOCKET ID:", id, "Archivo ID: ", file_id);
        const response = await this.upload({ file_id, data: queries });
        console.log("response upload", response);
      } catch (err) {
        console.log("ERROR_INIT_CONFIGURATION_FTP: ", err);
        this.$router.push("/");
      }
    },
    send() {
      console.log("CLIENT: ", this.ftp.status);
      this.test({ status: this.ftp.status, id: this.items.archivo_id });
    },
    cancel() {
      this.test({ status: this.ftp.status, id: this.items.archivo_id });
    },
    exit() {
      this.disconnect();
    },
    unitSize(value) {
      const giga = 1024;
      const relacion = parseInt(value / giga);
      return relacion > 1 ? `${value} GB` : `${value} MB`;
    }
  }
};
</script>

<style></style>
