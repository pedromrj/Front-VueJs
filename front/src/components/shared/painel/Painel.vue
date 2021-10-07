<template>
    <div class="painel">
      <h2 class="painel-titulo" @dblclick="visivel = !visivel"> {{ titulo }} </h2> <!-- v-on-dblclick-->
        <transition name="painel-fade">
            <div v-show="visivel">
                <slot class="painel-conteudo" ></slot>
            </div>
        </transition>
    </div>
</template>

<script src="./script.js"></script>

<style scoped src="./style.css"></style>

<!--
<template>
    <div>
        <slot name="cabecalho" class="header" ></slot>
        <hr>
        <slot class="body"></slot>
        <hr>
        <slot name="rodape" class="footer"></slot>
    </div>
</template>
<script>
export default {}
</script>

<componente-qualquer>
    <div slot="cabecalho">
        <h1>Bem-vindo!</h1>
    </div>
    <p>Seja bem-vindo à Alura!</p>
    <div slot="rodape">
        <p>copyright 2017</p>
    </div>
</componente-qualquer>
-->