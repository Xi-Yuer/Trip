import request from '../axios'

export const getCity = async () => {
    const result = await request.get({
        url: '/city/all'
    })
    return result
}