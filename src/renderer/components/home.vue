<template>
  <wrapper>
    <div class="contentbox">
      <daily-schedule />
    </div>
    <setting-modal v-if="isVisible.setting" />
    <monthly-schedule-modal v-if="isVisible.scheduleOfMonth" />
  </wrapper>
</template>

<script>
  import Wrapper from '@/components/common/Wrapper'
  import DailySchedule from '@/components/home/DailySchedule'
  import SettingModal from '@/components/home/SettingModal'
  import MonthlyScheduleModal from '@/components/home/MonthlyScheduleModal'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Wrapper,
      DailySchedule,
      SettingModal,
      MonthlyScheduleModal
    },
    computed: {
      ...mapState('modal', ['isVisible']),
    }
  }
</script>

<style scoped lang="scss">
</style>