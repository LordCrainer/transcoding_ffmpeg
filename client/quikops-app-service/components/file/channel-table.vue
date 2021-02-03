<template>
  <div>
    <v-data-table
      v-model="selected"
      :items="channels"
      :headers="headers"
      fixed-header
      height="275"
      v-bind="options"
      item-key="id"
      :sort-by="['CALIDAD', 'TITLE']"
      :sort-desc="[false, false]"
      class="elevation-1"
      group-by="calidad"
      show-group-by
      disable-pagination
      @input="emitChannelsSelected"
    >
      <template #top />
    </v-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'MEDIO',
          align: 'start',
          value: 'title',
          sortable: true
        },
        { text: 'CALIDAD', value: 'calidad' },
        { text: 'AUDIO', value: 'audio' }
      ],
      label: 'Medios',
      options: {
        'hide-default-footer': true,
        'show-select': true,
        dense: true
      },
      selected: [],
      channels: [
        {
          id: 0,
          title: 'YOUTUBE',
          audio: -3,
          formato: 'H264',
          calidad: 'HD'
        },
        {
          id: 1,
          title: 'INSTAGRAM',
          audio: -12,
          formato: 'H264',
          calidad: 'HD'
        },
        {
          id: 2,
          title: 'WHATSAPP',
          audio: -3,
          formato: 'H264',
          calidad: 'HD'
        },

        {
          id: 3,
          title: 'SONY',
          audio: -12,
          formato: 'XDCAM',
          calidad: 'HD'
        },
        {
          id: 4,
          title: 'YOUTUBE',
          audio: -3,
          formato: 'H264',
          calidad: 'SD'
        },
        {
          id: 5,
          title: 'INSTAGRAM',
          audio: -12,
          formato: 'H264',
          calidad: 'SD'
        },
        {
          id: 6,
          title: 'WHATSAPP',
          audio: -3,
          formato: 'H264',
          calidad: 'SD'
        }

      ]
    }
  },
  methods: {
    emitChannelsSelected (selected) {
      this.$emit('input', [...selected])
    }
  }
}
</script>
