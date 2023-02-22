import { Moment } from 'moment'
import moment from 'moment-timezone'

export const enum TimeZones {
  LIMA = 'America/Lima'
}

export default class TzDate {
  isValid: boolean = false
  date: Moment | null = null

  constructor(date?: moment.MomentInput) {
    try {
      if (date) {
        this.isValid = moment(date).isValid()
        this.date = this.isValid ? moment(date) : null
      }

      if (!date) {
        this.isValid = true
        this.date = moment()
      }
    } catch (error) {
      console.log(error)
    }
  }

  get lima() {
    return this.date?.tz(TimeZones.LIMA)
  }
}
