import request from '../axios'

export const getHouseDetail = async id => {
    const result = await request.get({
        url: '/detail/infos',
        params: {
            houseId: id
        }
    })
    return result.data
}