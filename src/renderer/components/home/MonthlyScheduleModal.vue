<template>
  <modal :close="close">
    <div class="contentBox contentBox-top">
      <div class="title">{{ calendar.year }}/{{ calendar.month }}の詳細</div>
    </div>
    <div class="contentBox-card">
      <div class="content content-table">
        <table>
          <tr>
            <td>日付</td>
            <td>プロジェクト時間</td>
            <td>社内作業時間</td>
            <td>合計稼働時間</td>
          </tr>
          <tr v-for="item in monthlySchedule.items">
            <td><div>{{ item.year }}/{{ item.month }}/{{ item.date }}</div></td>
            <td><div class="time">{{ item.projectWorkTime() }} h</div></td>
            <td><div class="time">{{ item.zatsumuWorkTime() }} h</div></td>
            <td><div class="time">{{ item.totalWorkTime() }} h</div></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="contentBox contentBox-bottom">
      <div class="content-horizontal content-closeButton">
        <div class="button-flat"
          @click="close"
        >閉じる</div>
      </div>
    </div>
  </modal>
</template>

<script>
  import modal from '@/components/common/modal/wrapper'
  import monthlySchedule from '@/modules/MonthlySchedule'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      modal
    },
    data() {
      return {
        monthlySchedule: null,
      }
    },
    computed: {
      ...mapState('calendar', [
        'calendar'
      ])
    },
    watch: {
      'calendar.year' : 'setCalendarData',
      'calendar.month': 'setCalendarData'
    },
    created() {
      this.setCalendarData()
    },
    methods: {
      ...mapActions('modal', [
        'toggleScheduleOfMonthModal'
      ]),
      setCalendarData() {
        this.monthlySchedule = new MonthlySchedule(this.calendar.year, this.calendar.month)
      },
      close() {
        this.toggleScheduleOfMonthModal()
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-table {
    @include set-scroll-y;
    @include set-padding;
    height: 400px;

    table {
      border-collapse: collapse;
      text-align: center;
      td {
        border: solid 1px;
        div.time {
          width: 100px;
          padding: 5px;
        }
      }
    }
  }

  .contentBox-bottom {
    margin-top: auto;
    text-align: right;
  }

  .button {
    @include button($color-sidebar);
    color: #FFF;
    border-radius: 5px;
    padding: 10px;
    display: inline-block;
    text-align: center;
    width: 50px;
  }

  .content-closeButton {
    justify-content: flex-end;
  }
</style>