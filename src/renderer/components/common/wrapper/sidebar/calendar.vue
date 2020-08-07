<template>
  <div class="calendar">
    <table>
      <tr class="borderbtm">
        <td>
          <div class="col button prev" @click="changeDate(0, -1)"><</div>
        </td>
        <td colspan="5">{{ calendarData.year }}/{{ calendarData.month }}</td>
        <td>
          <div class="col button next" @click="changeDate(0, 1)">></div>
        </td>
      </tr>
      <tr class="borderbtm">
        <td v-for="str in weekStrings">
          <div class="col">{{ str }}</div>
        </td>
      </tr>
      <tr v-for="week in calendarData.calendar">
        <td v-for="date in week">
          <div class="col button"
            v-if="date"
            @click="setSchedule(date)"
            :class="{
              today: date.isToday,
              selected: isSelected(date)
            }"
          >
          {{ date.date }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {
    default as Calendar,
    WEEK_STRINGS
  } from '@/modules/Calendar'
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        calendarData: null,
        weekStrings: WEEK_STRINGS
      }
    },
    computed: {
      ...mapState('calendar', [
        'calendar',
        'selected'
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
      ...mapActions('calendar', [
        'setCalendar',
        'setSelected'
      ]),
      setCalendarData() {
        this.calendarData = new Calendar(this.calendar.year, this.calendar.month)
      },
      setSchedule(d) {
        this.setSelected({
          year : d.year,
          month: d.month,
          date : d.date
        })
      },
      isSelected(d) {
        return d.year  === this.selected.year
            && d.month === this.selected.month
            && d.date  === this.selected.date
      },
      changeDate(mcy, mcm) {
        let d = new Date(this.calendar.year, this.calendar.month) 
        d.setYear(d.getFullYear() + mcy)
        d.setMonth(d.getMonth() - 1 + mcm)
        this.setCalendar({
          year : d.getFullYear(),
          month: d.getMonth() + 1
        })
      }
    }
  }
</script>

<style lang="scss">
  tr {
    transition: all 1s;
  }
  .cal-dates-enter, .cal-dates-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  .cal-dates-leave-active {
    position: absolute;
  }
 
  .calendar {
    font-size: 12px;
    text-align: center;

    .button {
      @include button-hover($color-sidebar);
    }

    table {
      display: inline-block;
      border-collapse: collapse;
      border-spacing: 0;
      color: #FAFAFA;
    }

    .borderbtm {
      border-bottom: solid 1px #FAFAFA;

    }
    td {
      .col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;

        a {
          text-decoration: none;
        }

        &.today {
          color: #fffa5c;
        }

        &.selected {
          background-color: #2ba316;
        }
      }
    }
  }
</style>