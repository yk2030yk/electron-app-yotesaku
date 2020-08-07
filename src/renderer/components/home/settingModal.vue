<template>
  <modal-wrapper :close="close">
    <div class="contentBox-top contentBox-tab">
      <div v-for="tab in tabs"
        class="tab"
        :class="{ selected: checkSelected(tab.id) }"
        @click="setSelectedTab(tab.id)">
        {{ tab.label }}
      </div>
    </div>

    <div class="contentBox contentBox-tabContent">
      <transition name="tab-content" mode="out-in">
        <component
          :is="tab.contentView" 
          v-for="tab in tabs"
          v-if="checkSelected(tab.id)"
        />
      </transition>
    </div>
            
    <div class="contentBox">
      <div class="content-horizontal content-closeButton">
        <div class="button-flat"
          @click="close"
        >閉じる</div>
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
  import ModalWrapper from '@/components/common/modal/Wrapper'
  import CategoryA from '@/components/home/SettingModal/CategoryA'
  import CategoryB from '@/components/home/SettingModal/CategoryB'
  import CategoryC from '@/components/home/SettingModal/CategoryC'
  import { mapActions } from 'vuex'

  export default {
    components: {
      ModalWrapper,
      CategoryA,
      CategoryB,
      CategoryC
    },
    data() {
      const tabs = {
        tab1: { id: 1, label: '項目1', contentView: 'category-a' },
        tab2: { id: 2, label: '項目2', contentView: 'category-b' },
        tab3: { id: 3, label: '項目3', contentView: 'category-c' },
      }
      return {
        selectedTab: tabs.tab1.id,
        tabs: tabs
      }
    },
    methods: {
      ...mapActions('modal', [
        'toggleSettingModal'
      ]),
      setSelectedTab(tab) {
        this.selectedTab = tab
      },
      checkSelected(tab) {
        return this.selectedTab === tab
      },
      close() {
        this.toggleSettingModal()
      }
    }
  }
</script>

<style scoped lang="scss">
  .contentBox-tab {
    position: relative;
    top: 5px;
    margin: $space 0 $space $space;
    font-weight: bold;

    .tab {
      @include button-hover(#DDD);
      color: #333;
      text-align: center;
      width: 130px;
      padding: 10px;
      position: relative;
      margin-right: 5px;
      
      &.selected {
        @include set-shadow;
        background-color: $color-sidebar;
        color: $white;
      }
    }
  }

  .contentBox-tabContent {
    padding-top: $space;
    height: 500px;
    position: relative;
    background-color: white;
    margin: 0 $space $space $space;
    @include set-shadow;

    tab-content-enter-active, .tab-content-leave-active {
      transition: opacity .3s;
    }
    .tab-content-enter, .tab-content-leave-to {
      opacity: 0;
    }
  }

  .content-closeButton {
    justify-content: flex-end;
  }
</style>