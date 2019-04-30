import moment from 'moment'

export default class Timeline {
    constructor(id, message, time) {
        this.id = id
        this.message = message
        this.time = moment(time).locale('ja').format('DD日 h:mm:ss a')
    }
}