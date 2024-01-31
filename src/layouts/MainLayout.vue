<template>
  <q-layout view="hHh lpr fff">
    <!--  HEADER  -->
    <q-header bordered class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/invoicify_logo.svg">
          </q-avatar>
          Invoicify Hub
        </q-toolbar-title>
        <q-space />
        <q-item
          v-for="({ title, route }) of essentialLinks"
          :key="title"
          :to="route"
          clickable
          active-class="text-accent"
          class="items-center">
          {{ title }}
        </q-item>
      </q-toolbar>
    </q-header>

    <!--  DRAWER  -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated :breakpoint="867">
     <router-view name="LeftSidebar"></router-view>
    </q-drawer>

    <!--  PAGE  -->
    <q-page-container>
      <router-view />
    </q-page-container>
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
    title: 'Invoices',
    route: '/'
  },
  {
    title: 'Settings',
    route: '/settings'
  },
  {
    title: 'Partners',
    route: '/partners'
  }
];

const leftDrawerOpen = ref(true);
</script>
