<script setup>
import Loading from './components/loading/index.vue'
</script>
<template>
  <Suspense>
    <div>
      <router-view />
      <Loading />
    </div>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
