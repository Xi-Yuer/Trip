import dayjs from 'dayjs'
export function formartMonthDay(date) {
    return dayjs(date).format("MM月DD日")
}
export function getDiffDate(startTime, endTime) {
    return dayjs(endTime).diff(startTime, 'day')
}