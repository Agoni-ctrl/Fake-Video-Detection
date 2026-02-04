<script setup>
import MainHome from './components/MainHome.vue';
import Header from './components/Header.vue';
// import Login from './components/Login.vue';

import { useRoute } from 'vue-router';

// 获取当前路由实例
const currentRoute = useRoute();

</script>

<template>
    <Header v-if="currentRoute.path !== '/login'"></Header>
    <router-view />
</template>

<style scoped>

</style>
