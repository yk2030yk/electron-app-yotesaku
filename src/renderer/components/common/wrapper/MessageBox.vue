<template>
  <transition name="ani-message">
    <div class="bg">
      <div v-if="message" class="contentBox-card contentBox-message">
        <div class="content-message">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('message', ['message'])
    }
  }
</script>

<style scoped lang="scss">
  .bg {
    position: fixed;
    z-index: 20;
  }
  .contentBox-message {
    transition: all 500ms 0s ease;
    position: absolute;
    top: 0px;
    left: 0;
    width: 300px;
    height: 50px;
    @include set-padding;
  }
  
  .ani-message-enter,
  .ani-message-leave-active {
    opacity: 0;
  }

  .ani-message-enter .contentBox-message, 
  .ani-message-leave-active .contentBox-message {
    top: 100px;
  }
</style>