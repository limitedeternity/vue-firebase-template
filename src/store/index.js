import Vue from 'vue';
import Vuex from 'vuex';
import ls from 'store';
import { auth } from 'firebase';
import router from '../router';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        error: null,
        loading: false,
        appName: 'ExampleApp'
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        userSignUp ({commit}, payload) {
            commit('setLoading', true);
            auth().createUserWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
                commit('setUser', {email: firebaseUser.email});
                commit('setLoading', false);
                commit('setError', null);
                router.push('/home');

            }).catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);
            });
        },
        userSignIn ({commit}, payload) {
            commit('setLoading', true);
            auth().signInWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
                commit('setUser', {email: firebaseUser.email});
                commit('setLoading', false);
                commit('setError', null);
                router.push('/home');

            }).catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);
            });
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {email: payload.email});
        },
        userSignOut ({commit}) {
            auth().signOut();
            commit('setUser', null);
            router.push('/');
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});

export default store;
