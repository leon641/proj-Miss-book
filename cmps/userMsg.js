import {eventBusService} from '../services/event-bus.service.js'

export default {
    template: `
        <div class="user-msg" :class="msg.type" v-if="msg">
            <button @click="msg=null">x</button>
            <p>
                {{msg.txt}}
            </p>
        </div>
    `,

    data() {
        return {
            msg : null
        }
    },
    created() {
        eventBusService.on('show-msg', (msg)=>{
            this.msg = msg
        })

    }
}