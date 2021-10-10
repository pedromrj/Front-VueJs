<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro =  $event.target.value" placeholder="filtre por parte do titulo"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.5" :url="foto.url" :titulo="foto.titulo" />
          <router-link :to="{ name : 'cadastro', params: { id: foto._id } }">
            <meu-button tipo="button" rotulo="ALTERAR"/>
          </router-link>
          <meu-button 
            tipo="button" 
            rotulo="REMOVER" 
            @botaoAtivado="remove(foto)" 
            v-bind:confirmacao="true"
            estilo="perigo" />
        </meu-painel>|
      </li>
    </ul>
  </div>
</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Button from '../shared/button/Button.vue';

import FotoService from '../../domain/foto/FotoService.js';

export default {

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-button': Button
  },

  data() {
    return {
      titulo: 'Alurapic',
      fotos:[],
      filtro: '',
      mensagem: ''
    }
  },
  
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {
      this.service
        .apaga(foto._id)
        .then(
          () => {
             let indice = this.fotos.indexOf(foto);
             this.fotos.splice(indice, 1);
             this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = err.message
         }
       )
    }


      // this.resource.delete({
      //   id: foto_id
      // }).then(() => {
      //       let indice = this.fotos.indexOf(foto);
      //       this.fotos.splice(indice, 1);
      //       this.mensagem = 'Foto removida com sucesso'
            
      //     }, 
      //     err => {
      //       this.mensagem = 'Não foi possível remover a foto';
      //       console.log(err);
      //   }
      // )

      // this.$http
      //   .delete(`v1/fotos/${foto._id}`)
      //   .then(() => {
      //       let indice = this.fotos.indexOf(foto);
      //       this.fotos.splice(indice, 1);
      //       this.mensagem = 'Foto removida com sucesso'
            
      //     }, 
      //     err => {
      //       this.mensagem = 'Não foi possível remover a foto';
      //       console.log(err);
      //     }
      //   )
    },

  created() {

    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => {
        this.mensagem = err.message;
      });

    // let resource = this.$resource('v1/fotos{/id}');

    // resource
    //   .query()
    //   .then( res => { res.json()
    //   .then(fotos => this.fotos = fotos, err => console.log(err));
    // });
    
    // let promise = this.$http.get("v1/fotos");

    // promise.then( res => {
    //   res.json().then(fotos => this.fotos = fotos, err => console.log(err));
    // });
  }
}

</script>

<style>
.centralizado {
        text-align: center;
    }
.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width:96%;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display:inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
