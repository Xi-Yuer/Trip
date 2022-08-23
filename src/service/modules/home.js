import request from '../axios'

export const getHotCity = async () => {
    const result = await request.get({
        url: '/home/hotSuggests'
    })
    return result.data
}
export const getHomeCategories = async () => {
    const result = await request.get({
        url: '/home/categories'
    })
    return result.data
}