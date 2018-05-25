import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import Router from './router';
import Store from './store';
import { initializeApp, auth } from 'firebase';

Vue.config.productionTip = false;

initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: ""
});

Vue.use(Vuetify);

const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
    new Vue({
        el: '#app',
        router: Router,
        store: Store,
        ...App,
        created() {
            if (firebaseUser) {
                store.dispatch('autoSignIn', firebaseUser);
            }
        }
    });
    
    unsubscribe();
});
