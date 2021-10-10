//import Cadastro from './components/cadastro/Cadastro.vue';
//const Cadastro = () => System.import('./components/cadastro/Cadastro.vue');
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue').then(m => m.default);
//const Cadastro = () => import('./components/cadastro/Cadastro.vue');
import Home from "./components/home/Home.vue";

export const routes = [
    { path: "/home", name: 'home' , component: Home, titulo: 'Home', menu: true},
    { path: "/cadastro/:id", name: 'cadastro' , component: Cadastro, titulo: 'Cadastro', menu: false},
    { path: "/cadastro", name: 'cadastro' , component: Cadastro , titulo: 'Cadastro', menu: true},
    { path: '*', component: Home , menu: false }
];