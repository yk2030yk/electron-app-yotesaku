<template>
  <transition name="sidebar">
    <div class="sidebar"
      v-if="isVisible"
      @click.self="toggleSidebar">
      
      <div class="sidebarContent">
        <div class="btnarea">
          <div class="close"
            @click="toggleSidebar"></div>
        </div>

        <div class="contentBox subtitle">
          <div>Calendar</div>
        </div>
        <div>
          <calendar class="calendar"></calendar>
        </div>
        <div class="contentBox">
          <div class="button"
            @click="toggleScheduleOfMonthModal">詳細を見る</div>
        </div>
        
        <div class="contentBox subtitle">
          <div>Settings</div>
        </div>
        <div class="contentBox settings">
          <div class="button"
            @click="toggleSettingModal">項目管理</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import calendar from './sidebar/calendar'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      calendar
    },
    computed: {
      ...mapState('sidebar', [
        'isVisible'
      ])
    },
    methods: {
      ...mapActions('modal', [
        'toggleSettingModal',
        'toggleScheduleOfMonthModal'
      ]),
      ...mapActions('sidebar', [
        'toggleSidebar'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .sidebar {
    z-index: 10;
    position: fixed;
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    transition: all 500ms 0s ease;
    cursor: pointer;
  }

  .sidebarContent {
    $width: 300px;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: $width;
    height: 100%;
    background-color: $color-sidebar;
    filter: drop-shadow(0px 0px 0px rgba(0,0,0,0.6));
    transition: all 500ms 0s ease;
    color: #FAFAFA;
    cursor: default;

    .button {
      @include button-hover($color-sidebar);
      padding: 10px;
    }
  }

  .subtitle {
    font-size: $font-size-large;
    margin: 0 $space;
    padding: 10px;
    border-bottom: solid 1px #FAFAFA;
  }

  .btnarea {
    text-align: right;
    .close {
      @include icon-close;
      @include button-hover($color-sidebar);
      margin: $space-small;
    }
  }

  .settings{
    display: flex;
    flex-direction: column;
  }

  .sidebar-enter {
    opacity: 0;
  }

  .sidebar-leave-active {
    opacity: 0;
  }

  .sidebar-enter .sidebarContent,
  .sidebar-leave-active .sidebarContent {
    left: -300px;
  }
</style>