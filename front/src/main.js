import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidade from 'vee-validate';
import { routes } from './routes';
import './directives/Transform';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import msg from './pt_BR';
import './assets/css/Teste.css';
import './assets/js/Teste.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VeeValidade, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

Vue.http.interceptors.push((req, next) => {

  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    console.log(res.body);
  });

});

const router = new VueRouter({
  routes,
  mode: 'history' // Sem, a url fica :8080/#/cadastro
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
