<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getHouseDetail } from '@/service/modules/house.js'

import Swipe from './components/swipe.vue'
import Infos from './components/infos.vue'
import Facility from './components/facility.vue'
import Landlord from './components/landlord.vue'
import Comment from './components/comment.vue'
import Notice from './components/notice.vue'
import Map from './components/map.vue'
import Intro from './components/intro.vue'
import TabControl from '@/components/tab-control/tab-control.vue'

import { computed, ref, watch } from 'vue'
import { useScroll } from '@/hooks/useScroll'

const route = useRoute()
const router = useRouter()
// 房屋id
const routeParamsHouseId = route.params.id || 51953704

const { mainPart } = await getHouseDetail(routeParamsHouseId)

const sectionEls = []
const getSectionRef = val => {
  sectionEls.push(val.$el)
}

// tab控制
const { scrollTop } = useScroll()
const showTabControl = computed(() => scrollTop.value > 300)

const currentTab = ref(0)
const tabBarRef = ref()

// 页面滚动匹配对应的tabBar
watch(scrollTop, newValue => {
  // 获所有区域的 offsetTop 值

  const values = sectionEls.map(item => item.offsetTop)
  // 使用 newvalue 匹配最新的索引
  let index = values.length - 1 // 默认索引
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= newValue + 44) {
      index = i - 1
      break
    }
  }
  currentTab.value = index
  tabBarRef?.value?.setCurrentIndex(index)
})

const tabItemClick = index => {
  window.scrollTo({
    top: sectionEls[index].offsetTop - 44,
    behavior: 'smooth',
  })
}

// 返回
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <Transition>
    <TabControl
      :titles="['房屋', '房东', '设施', '周边', '须知', '评论']"
      v-if="showTabControl"
      class="tabs"
      ref="tabBarRef"
      @tabItemClick="tabItemClick"
    />
  </Transition>
  <van-nav-bar
    title="房屋详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <Swipe :swipe="mainPart?.topModule?.housePicture?.housePics" />
  <!-- 房屋 -->
  <Infos :house="mainPart.topModule" :ref="getSectionRef" />
  <!-- 房东 -->
  <Landlord
    :landlord="mainPart.dynamicModule.landlordModule"
    :ref="getSectionRef"
  />
  <!-- 设施 -->
  <Facility
    :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"
    :ref="getSectionRef"
  />
  <!-- 地图 -->
  <Map :position="mainPart.dynamicModule.positionModule" :ref="getSectionRef" />
  <!-- 提示 -->
  <Notice
    :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
    :ref="getSectionRef"
  />
  <!-- 评论 -->
  <Comment
    :comment="mainPart.dynamicModule.commentModule"
    :ref="getSectionRef"
  />
  <!--  -->
  <Intro :price-intro="mainPart.introductionModule" :ref="getSectionRef" />
  <div class="footer">
    <img src="@/assets/img/detail/icon_ensure.png" alt="" />
    <div class="text">弘源旅途, 永无止境!</div>
  </div>
</template>

<style scoped lang="less">
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
