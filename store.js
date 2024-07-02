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
        init(state){
            state.weeklyHour = 15;
            state.weeklyMinute = 0;
            state.nightHour = 0;
            state.nightMinute = 0;
            state.wage = 9860;
        }
    },
    actions : {
    }
})
export default store