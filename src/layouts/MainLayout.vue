<template>
  <q-layout view="hHh lpr fff">
    <!--  HEADER  -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/invoicify_logo.svg">
          </q-avatar>
          Invoicify Hub
        </q-toolbar-title>
        <q-space />
        <div class="row">
          <router-link v-for="({ title, route }) of essentialLinks" :key="title" :to="route">
            {{ title }}
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <!--  DRAWER  -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
     <router-view name="LeftSidebar"></router-view>
    </q-drawer>

    <!--  PAGE  -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!--  FOOTER  -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface EssentialLink {
  title: string;
  route: string;
}
const essentialLinks: EssentialLink[] = [
  {
    title: 'Settings',
    route: '/settings'
  },
  {
    title: 'Invoices',
    route: '/'
  },
  {
    title: 'Partners',
    route: '/partners'
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
