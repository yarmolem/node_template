import moment from 'moment'
export const isDate = (date: Date) => moment(date).isValid()
