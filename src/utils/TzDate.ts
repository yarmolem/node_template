import moment from 'moment-timezone'
import { type Moment, type MomentInput } from 'moment'

export const enum TimeZones {
  LIMA = 'America/Lima'
}

export default class TzDate {
  hasProps = false
  isValid: boolean = false
  innerDate: Moment | null = null

  constructor(date?: MomentInput) {
    try {
      if (typeof date === 'undefined') {
        this.hasProps = true
        this.isValid = moment(date).isValid()
        this.innerDate = this.isValid ? moment(date) : null
      }

      if (typeof date !== 'undefined') {
        this.isValid = true
        this.innerDate = moment()
      }
    } catch (error) {
      console.log(error)
    }
  }

  get lima() {
    return this.innerDate?.tz(TimeZones.LIMA)
  }
}
