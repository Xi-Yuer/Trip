<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const { PeopleCount, PriceFilter, stayTime, currentCity } = route.params
</script>

<template>
  <div>
    <h2>Search</h2>
  </div>
</template>

<style scoped lang="less"></style>
