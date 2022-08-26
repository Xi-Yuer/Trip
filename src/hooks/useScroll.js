import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { throttle } from 'lodash'

export const useScroll = () => {

    const isBottom = ref(false)

    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const clientHeight = ref(0)

    const scrollListenrHandler = throttle(() => {   // 节流
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight

        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            isBottom.value = true
        }
    }, 100)

    onMounted(() => window.addEventListener('scroll', scrollListenrHandler))
    onActivated(() => window.addEventListener('scroll', scrollListenrHandler))

    onUnmounted(() => window.removeEventListener('scroll', scrollListenrHandler))
    onDeactivated(() => window.removeEventListener('scroll', scrollListenrHandler))

    return { isBottom, scrollTop, scrollHeight, clientHeight }
}