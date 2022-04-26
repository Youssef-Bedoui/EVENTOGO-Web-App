//  import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
import { createStore } from 'vuex';
const store = createStore({
// const store = new Vuex.Store({
    state: {
        events: []
    },
    getters: {
        EVENTS: state => state.events
    },
    mutations: {
        ADD_EVENT: (state, event) => {
            state.events.push(event)
        },
        UPDATE_EVENT: (state, {id, title, start, end}) => {
            let index = state.events.findIndex(_event => _event.id == id)
            
            state.events[index].title = title;
            state.events[index].start = start;
            state.events[index].end = end;
        }
    },
    actions: {}
})

export default store;