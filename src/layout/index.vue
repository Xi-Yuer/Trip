<script setup>
import TabBar from '@/components/tab-bar/index.vue'
</script>

<template>
  <router-view v-slot="props">
    <keep-alive>
      <component :is="props.Component"/>
    </keep-alive>
  </router-view>
  <TabBar />
</template>

<style scoped lang="less"></style>
