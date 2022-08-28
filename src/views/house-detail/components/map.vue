<script setup>
import DetailSection from '@/components/detail-section/index.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
})

const mapRef = ref()

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value)
  const point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  )
  map.centerAndZoom(point, 15)
  const marker = new BMapGL.Marker(point) // 创建标注
  map.addOverlay(marker) // 将标注添加到地图中

  const scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
  map.addControl(scaleCtrl)
  const zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
  map.addControl(zoomCtrl)
  const cityCtrl = new BMapGL.CityListControl() // 添加城市列表控件
  map.addControl(cityCtrl)
})
</script>

<template>
  <detail-section titleText="位置周边" footerText="查看更多周边">
    <div class="map" ref="mapRef"></div>
  </detail-section>
</template>

<style scoped lang="less">
.map {
  height: 250px;
}
</style>
