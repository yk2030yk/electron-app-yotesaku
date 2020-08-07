<template>
  <div class="header">
    <div class="button" @click="toggleSidebar">
      <img src="static/img/hamb2.svg">
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions('sidebar', ['toggleSidebar'])
    }
  }
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #FAFAFA;
    filter: drop-shadow(0px 1px 1px rgba(0,0,0,0.6));
  }
  .app_icon {
    width: auto;
    height: 30px;
  }
  .button {
    @include button(#FAFAFA);
    box-sizing: border-box;
    margin: 0 $space;
    padding: 5px;
    width: 30px;
    height: 30px;
    img { width: 25px;}
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }
</style>