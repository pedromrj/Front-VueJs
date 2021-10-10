<template>
  <div>
    <h1 v-if="foto._id" class="centralizado">Alteração</h1>
    <h2 v-else class="centralizado">Inclusão</h2>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input data-vv-as="titulo" name="titulo" id="titulo" autocomplete="off" v-model="foto.titulo" v-validate data-vv-rules="required|min:3|max:30" >
        <span class="error" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input name="url" id="url" autocomplete="off" v-model="foto.url" v-validate data-vv-rules="required" > <!-- @input="foto.url = $event.target.value" :value="foto.url"-->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
        <span class="error" v-show="errors.has('url')">{{errors.first('url')}}</span>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Button from '../shared/button/Button.vue';

import Foto from '../../domain/foto/Foto.js';
import FotoService from '../../domain/foto/FotoService.js';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Button
  },

  data() {
    return {
      foto: new Foto(),

      id: this.$route.params.id
    }
  },

  methods: {
    grava() {
      this.$validator
      .validateAll()
      .then(success => {

        if (success) {
          this.service
            .cadastra(this.foto)
            .then(() => {
              if(this.id) this.$router.push({ name: 'home'});
              this.foto = new Foto() 
              },
              err => console.log(err));
        }
      });

      
      // this.resource.save(this.foto)
      // .then(() => this.foto = new Foto(), err => console.log(err));

      // this.$http
      //   .post('v1/fotos', this.foto)
      //   .then(() => this.foto = new Foto(),
      //    err => console.log(err));

    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    if(this.id) {
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
    }

  }
}
</script>

<style scoped>
  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .error {
    color: red
  }
</style>