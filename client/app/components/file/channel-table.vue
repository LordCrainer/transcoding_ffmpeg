<template>
  <div>
    <v-data-table
      v-model="selected"
      :items="channels"
      @input="emitChannelsSelected"
      :headers="headers"
      fixed-header
      height="275"
      v-bind="options"
      item-key="id"
      :sort-by="['calidad', 'title']"
      :sort-desc="[false, false]"
      class="elevation-1"
      group-by="calidad"
      show-group-by
      disable-pagination
    >
      <template v-slot:top> </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "MEDIO",
          align: "start",
          value: "title",
          sortable: true
        },
        { text: "CALIDAD", value: "calidad" },
        { text: "NIVEL", value: "audio" }
      ],
      label: "Medios",
      options: {
        "hide-default-footer": true,
        "show-select": true,
        dense: true
      },
      selected: [],
      channels: [
        {
          id: 0,
          title: "DISCOVERY",
          audio: -3,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 2,
          title: "ECUAVISA",
          audio: -12,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 1,
          title: "GRUPO_FOX",
          audio: -3,
          formato: "XDCAM",
          calidad: "HD"
        },

        {
          id: 4,
          title: "TC_TELEVISION",
          audio: -12,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 5,
          title: "TELEAMAZONAS",
          audio: -14,
          formato: "H264",
          calidad: "HD"
        },
        { id: 6, title: "RTS", audio: -20, formato: "XDCAM", calidad: "HD" },
        {
          id: 7,
          title: "TELEVICENTRO",
          audio: -20,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 8,
          title: "ESPN_DIRECTV",
          audio: -20,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 9,
          title: "GRUPO_TURNER",
          audio: -20,
          formato: "XDCAM",
          calidad: "HD"
        },
        {
          id: 3,
          title: "ECUAVISA",
          audio: -12,
          formato: "DVCPRO",
          calidad: "SD"
        },
        {
          id: 10,
          title: "RTS",
          audio: -12,
          formato: "DVCPRO",
          calidad: "SD"
        },
        {
          id: 11,
          title: "CANAL_UNO",
          audio: -20,
          formato: "DV25",
          calidad: "SD"
        },
        {
          id: 12,
          title: "OROMAR_TV",
          audio: -20,
          formato: "DV25",
          calidad: "SD"
        },
        {
          id: 13,
          title: "TELEVICENTRO",
          audio: -20,
          formato: "DV25",
          calidad: "SD"
        }
      ]
    };
  },
  methods: {
    emitChannelsSelected(selected) {
      this.$emit("input", [...selected]);
    }
  }
};
</script>
