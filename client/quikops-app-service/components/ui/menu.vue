<template>
  <v-menu
    v-model="selected"
    bottom
    left
    :close-on-content-click="false"
    offset-y
    :nudge-width="200"
  >
    <template #activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list v-show="items.length > 0" class="px-3">
        <v-list-item v-for="(item, i) in items" :key="i">
          <slot name="pre" :data="item" />
          <slot name="title" :data="item" />
          <slot name="post" :data="item" />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'UiMenu',
  props: {
    items: { type: Array, default: () => [] }
  },
  data: () => ({
    selected: ''
  })
}
</script>

<style></style>
