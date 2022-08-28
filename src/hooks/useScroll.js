import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import { throttle } from 'lodash'

export const useScroll = (elRef) => {
    const el = elRef ? elRef.value : window

    const isBottom = ref(false)

    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const clientHeight = ref(0)

    const scrollListenrHandler = throttle(() => {   // 节流
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            isBottom.value = true
        }
    }, 100)

    onMounted(() => el.addEventListener('scroll', scrollListenrHandler))
    onActivated(() => el.addEventListener('scroll', scrollListenrHandler))

    onUnmounted(() => el.removeEventListener('scroll', scrollListenrHandler))
    onDeactivated(() => el.removeEventListener('scroll', scrollListenrHandler))

    return { isBottom, scrollTop, scrollHeight, clientHeight }
}