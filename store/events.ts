import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '@/plugins/firebase'

export const state = () => ({
    events: [],
    results: null
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
    },
    setResults(state, results: any) {
        state.results = results
    },
})

export const getters = getterTree(state, {
    events: (state: { events: any[] }) => state.events
})

  
export const actions = actionTree(
    { state, getters, mutations },{
    async fetchEvent ({ getters, commit }): Promise<void> {
        firestore.collection("Events").get().then(snapshot => {
            snapshot.forEach(doc => commit('addEvent', { events:  doc.data() }))
        })
        const eventData = await firestore.collection("Events").get()
        // const results = eventData.docs.reduce(
        //     (accumulater: any, currentValueBase: any) => {
        //         const currentValue = currentValueBase.data()
        //         Object.keys(currentValue).forEach((key) => {
        //             if (!accumulater[key]) {
        //                 accumulater[key] = [
        //                     {
        //                     memberId: currentValue[key],
        //                     count: 1,
        //                     },
        //                 ]
        //             }
        //         })
        //         return accumulater
        //     })

        //this.app.$accessor.events.setResults(results)
    },
    addEvent ({ getters, commit }, events) {
        //if (getters.uid) {
            firestore.collection("Events").add(events).then(doc => {
            commit('addEvent', { id: doc.id, events })
          })
        //}
    },
    updateEvent ({ getters, commit }, { id, events }) {
        //if (getters.uid) {
            firestore.collection("Events").doc(id).update(events).then(() => {
            commit('updateEvent', { id, events })
            })
        //}
    },
    deleteEvent ({ getters, commit }, { id }) {
        //if (getters.uid) {
            firestore.collection("Events").doc(id).delete().then(() => {
            commit('deleteEvent', { id })
            })
        //}
    }
})
