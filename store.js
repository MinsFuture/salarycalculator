import { createStore } from 'vuex'

const store = createStore({
    state(){
        return {
            weeklyHour : 15,
            weeklyMinute : 0,
            nightHour : 0,
            nightMinute : 0,
            wage : 9860,
        }
    },
    mutations : {
    },
    actions : {
    }
})
export default store