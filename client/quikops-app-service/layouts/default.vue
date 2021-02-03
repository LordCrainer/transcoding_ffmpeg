<template>
  <v-app style="background: #f9f9f9">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>QUIKOPS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title>
        QUIKOPS
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon class="mx-1" to="/">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      // { title: 'FTP', icon: 'folder-upload', to: '/ftp' },
      { title: 'UPLOAD', icon: 'cloud-upload', to: '/file' }
      // { title: 'CHAT', icon: 'chat', to: '/appChat' }
    ]
  })
}
</script>
