<script setup>
import MainHome from './components/MainHome.vue';

import { useRoute } from 'vue-router';

// 获取当前路由实例
const currentRoute = useRoute();

</script>

<template>
    <MainHome v-if="currentRoute.path !== '/login'" />
    <router-view />
</template>

<style scoped>

</style>
