import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '@/plugins/firebase'

export const state = () => ({
    events: []
})
  
export const mutations = mutationTree(state, {
    addEvent(state: { events: any[] }, { event }: any) {
        state.events.push(event)
    },
    updateEvent(state: { events: any[] }, { event }: any) {
        state.events = state.events.map(e => (e.id === event.id ? event : e))
    },
    deleteEvent (state: { events: any[] }, { id }: any) {
        const index = state.events.findIndex(event => event.id === id)
        state.events.splice(index, 1)
    }
})

export const getters = getterTree(state, {
    events: (state: { events: any[] }) => state.events
})

  
export const actions = actionTree(
    { state, getters, mutations },{
    addAddress ({ getters, commit }, events) {
        //if (getters.uid) {
            firestore.collection("Events").add(events).then(doc => {
            commit('addEvent', { id: doc.id, events })
          })
        //}
    },
    updateAddress ({ getters, commit }, { id, events }) {
        //if (getters.uid) {
            firestore.collection("Events").doc(id).update(events).then(() => {
            commit('updateEvent', { id, events })
            })
        //}
    },
    deleteAddress ({ getters, commit }, { id }) {
        //if (getters.uid) {
            firestore.collection("Events").doc(id).delete().then(() => {
            commit('deleteEvent', { id })
            })
        //}
    }
})
