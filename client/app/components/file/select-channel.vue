<template>
  <div>
    <v-autocomplete
      v-model="channelsSelectedOrdered"
      @change="emitChannelsSelected"
      v-bind="channels.options"
      :label="channels.label"
      :items="channelsOrderedByGroup"
      color="blue-grey lighten-2"
      item-text="title"
      item-value="id"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          color="blue darken-3"
          close
          @click="data.select"
          @click:close="remove(data.item)"
          class="white--text font-weight-bold"
        >
          <!-- <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar> -->
          {{ data.item.title }}
          {{ data.item.calidad }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content>**** {{ data.item }}</v-list-item-content>
        </template>
        <template v-else>
          <!-- <v-list-item-avatar>
            <img :src="data.item.avatar" />
          </v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title v-html="data.item.title"></v-list-item-title>
            <v-list-item-subtitle>
              {{ data.item.calidad }}
              {{ data.item.audio }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    options: { type: Object }
  },
  data: () => ({
    channels: {
      selected: [],
      list: [
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
        }
      ],
      options: {
        multiple: true,
        chips: true,
        "menu-props": { maxHeight: "350" },
        hint: "Seleccione un medio para enviar",
        "persistent-hint": true
      },
      label: "Medios"
    }
  }),
  computed: {
    channelsSelectedOrdered: {
      get() {
        return this.channels.selected.sort();
      },
      set(value) {
        this.channels.selected = [...value].sort();
      }
    },
    channelsOrderedByGroup() {
      const groups = this.groupByProperty(this.channels.list, "audio");
      const items = this.appendNameGroup(groups, "----- GRUPO");
      return items;
    }
  },
  methods: {
    emitChannelsSelected(e) {
      console.log([...e]);
    },
    appendNameGroup(groups, appendText) {
      const entries = Object.entries(groups);
      const items = entries.reduce((acc, [key, value]) => {
        const array = [{ header: `${appendText} ${key}` }, ...value];
        return [...acc, ...array];
      }, []);
      return items;
    },
    groupByProperty(array, property) {
      const sortByTitle = [...array].sort(this.sortByProperty("title"));
      const groping = sortByTitle.reduce((acc, object) => {
        const key = object[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(object);
        return acc;
      }, {});
      return groping;
    },
    sortByProperty(property) {
      return (a, b) => {
        return a[property] > b[property]
          ? 1
          : a[property] < b[property]
          ? -1
          : 0;
      };
    },
    remove(item) {
      const index = this.channelsSelectedOrdered.indexOf(item.id);
      if (index >= 0) this.channelsSelectedOrdered.splice(index, 1);
    }
  }
};
</script>
