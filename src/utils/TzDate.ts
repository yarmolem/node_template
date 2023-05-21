import moment from 'moment-timezone'
import { type Moment, type MomentInput } from 'moment'

export const enum TimeZones {
  LIMA = 'America/Lima'
}

export default class TzDate {
  hasProps = false
  isValid: boolean = false
  inner_date: Moment | null = null

  constructor(date?: MomentInput) {
    try {
      if (typeof date === 'undefined') {
        this.hasProps = true
        this.isValid = moment(date).isValid()
        this.inner_date = this.isValid ? moment(date) : null
      }

      if (typeof date !== 'undefined') {
        this.isValid = true
        this.inner_date = moment()
      }
    } catch (error) {
      console.log(error)
    }
  }

  get lima() {
    return this.inner_date?.tz(TimeZones.LIMA)
  }
}
