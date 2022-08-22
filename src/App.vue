<script setup></script>
<template>
  <Suspense>
    <router-view />
    <template #fallback>
      <van-loading type="spinner" color="#1989fa" />
    </template>
  </Suspense>
</template>
