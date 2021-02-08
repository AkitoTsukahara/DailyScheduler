import { auth } from '~/plugins/firebase.ts'

export const strict = false

export const state = () => ({
    user: null,
})

export const mutations = {
    setUser(state: { user: any } , payload: any ) {
        state.user = payload
    }
}

export const actions = {
    signUp({ commit }: {commit: any}, { email , password  }: {email:string, password: string}) {
        return auth().createUserWithEmailAndPassword(email , password )
    },

    signInWithEmail({ commit }: {commit: any}, { email, password }: {email:string, password: string}) {
        return auth().signInWithEmailAndPassword(email, password)
    },

    // signInWithTwitter({ commit }: {commit: any}){
    //     return auth().signInWithPopup(new auth.TwitterAuthProvider())
    // },

    // signInWithFacebook({ commit }: {commit: any}){
    //     return auth().signInWithPopup(new auth.FacebookAuthProvider())
    // },

    signInWithGoogle({ commit }: {commit: any}){
        return auth().signInWithPopup(new auth.GoogleAuthProvider())
    },

    signOut() {
        return auth().signOut()
    }
}

export const getters = {
    user(state: any){
        return state.user
    },
    isAuthenticated (state: any) {
        return !!state.user
    }
}