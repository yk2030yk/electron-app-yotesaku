<template>
  <transition name="modal">
    <div class="modalBox" @click.self="close">
      <div class="modalBoxContent">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['close']
  }
</script>

<style scoped lang="scss">
  .modalBox {
    z-index: 20;
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    transition: opacity .3s ease;
  }

  .modalBoxContent {
    background-color: #eee;
    height: 600px;
    width: 900px;
    margin: auto;
    border-radius: 5px;
    display: flex;
    flex-flow: column nowrap;
    transition: all .3s ease;
    filter: drop-shadow(5px 5px 8px rgba(0,0,0,0.6));
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modalBoxContent,
  .modal-leave-active .modalBoxContent {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
</style>