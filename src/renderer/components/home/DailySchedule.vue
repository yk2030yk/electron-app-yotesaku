<template>
  <div>
    <div class="contentBox-top">
      <div class="title">{{ title }}</div>
    </div>
    <div class="contentBox"
      :class="{ isDeadlineError: workTimes.project < 7.75 }">
        <div class="content-horizontal">
          <div class="content-card content-workTime">
            <div>プロジェクト</div>
            <div class="time">{{ workTimes.project }} h</div>
          </div>
          <div class="content-card content-workTime">
            <div>社内作業</div>
            <div class="time">{{ workTimes.zatsumu }} h</div>
          </div>
          <div class="content-card content-workTime">
            <div>合計</div>
            <div class="time">{{ workTimes.total }} h</div>
          </div>
        </div>
    </div>
    <div class="contentBox">
      <div class="content-horizontal">
        <div class="button-flat" @click="save">保存</div>
        <div class="button-flat" @click="saveAsTemplete">テンプレート保存</div>
        <div class="button-flat" @click="loadTemplete">テンプレートを使用</div>
      </div>
    </div>
    <div class="contentBox-card">
      <div class="content-scheduleTable">
        <table>
          <thead>
            <tr class="row-head">
              <th><div class="scheduleItem-time">開始時刻</div></th>
              <th><div class="scheduleItem-time">終了時刻</div></th>
              <th><div class="scheduleItem-workTime">作業時間</div></th>
              <th><div class="scheduleItem-selectGroup">項目1</div></th>
              <th><div class="scheduleItem-selectGroup">項目2</div></th>
              <th><div class="scheduleItem-selectGroup">項目3</div></th>
              <th><div class="scheduleItem-comment">コメント</div></th>
              <th><div class="scheduleItem-button">操作</div></th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="ani-table-row">
            <tr v-for="(schedule, index) in schedules"
              :class="[ index % 2 === 0 ? 'row-odd' : 'row-even' ]"
              :key="schedule.id">
              <td :class="{ timeError: !schedule.checkConsistencyTime() }">
                <div class="scheduleItem scheduleItem-time">
                  <input type="time"
                    v-model.lazy="schedule.startTime"
                    @change="changeStartTime()"
                    step="900"
                  />
                </div>
              </td>
              <td :class="{ timeError: !schedule.checkConsistencyTime() }">
                <div class="scheduleItem scheduleItem-time"
                  v-if="!isLastSchedule(index)">
                  <input type="time"
                    v-model="schedule.endTime"
                    readonly 
                  />
                </div>
              </td>
              <td :class="{ timeError: !schedule.checkConsistencyTime() }">
                <div class="scheduleItem scheduleItem-workTime"
                  v-if="!isLastSchedule(index)">
                  {{ schedule.workTime() }}h
                </div>
              </td>
              <td>
                <div class="scheduleItem scheduleItem-selectGroup"
                  v-if="!isLastSchedule(index)">
                  <select v-model="schedule.category_a_id">
                    <option value="">未選択</option>
                    <option v-for="item in CategoryA.data"
                      :value="item._id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="scheduleItem scheduleItem-selectGroup"
                  v-if="!isLastSchedule(index)">
                  <select v-model="schedule.category_b_id">
                    <option value="">未選択</option>
                    <option v-for="item in CategoryB.data"
                      :value="item._id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="scheduleItem scheduleItem-selectGroup"
                  v-if="!isLastSchedule(index)">
                  <select v-model="schedule.category_c_id">
                    <option value="">未選択</option>
                    <option v-for="item in CategoryC.data"
                      :value="item._id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <div class="scheduleItem scheduleItem-comment">
                  <input type="text"
                    v-model="schedule.comment"
                  />
                </div>
              </td>
              <td>
                <div class="scheduleItem scheduleItem-button">
                  <div class="button" @click="deleteItem(index)">-</div>
                  <div class="button" @click="addItem(index)">+</div>
                </div>
              </td>
            </tr>
          </transition-group>
        </table>
      </div>
    </div>
    <div class="contentBox">
      <div class="button-flat" @click="addItem(undefined)">+</div>
    </div>
  </div>
</template>

<script>
  import DailySchedule from '@/modules/DailySchedule'
  import CategoryA from '@/modules/models/CategoryA'
  import CategoryB from '@/modules/models/CategoryB'
  import CategoryC from '@/modules/models/CategoryC'
  import { paddingTime } from '@/modules/util/time'
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        dailySchedule: null,
        CategoryA: CategoryA,
        CategoryB: CategoryB,
        CategoryC: CategoryC,
        workTimes: {
          project: 0,
          zatsumu: 0,
          total: 0
        }
      }
    },
    computed: {
      ...mapState('calendar', ['selected']),
      title() {
        return `${this.selected.year}/${this.selected.month}/${this.selected.date}の作業詳細`
      },
      schedules() {
        return this.dailySchedule.getItems()
      }
    },
    watch: {
      'selected.year': 'updateSchedule',
      'selected.month': 'updateSchedule',
      'selected.date': 'updateSchedule'
    },
    created() {
      this.updateSchedule()
    },
    methods: {
      ...mapActions('message', [
        'setMessage'
      ]),
      addItem(index) {
        this.dailySchedule.pushNewItem(index)
      },
      deleteItem(index) {
        this.dailySchedule.deleteItem(index)
      },
      save() {
        if (this.dailySchedule.hasTimeAdjustmentError()) {
          this.setMessage("時間に入力エラーがあります")
        } else {
          this.dailySchedule.save()
          this.setMessage('保存に成功しました。')
        }
      },
      saveAsTemplete() {
        this.dailySchedule.saveAsTemplete()
        this.setMessage('テンプレートとして保存しました。')
      },
      loadTemplete() {
        this.dailySchedule.loadTemplete()
      },
      updateSchedule() {
        this.dailySchedule = new DailySchedule(this.selected.year,
          this.selected.month, this.selected.date)
      },
      changeStartTime() {
        this.dailySchedule.adjustTime()
        const workTimes = this.dailySchedule.clacWorkTimes()
        console.log(workTimes)
        this.workTimes = {
          project: paddingTime(workTimes.project, 2),
          zatsumu: paddingTime(workTimes.zatsumu, 2),
          total: paddingTime(workTimes.total, 2)
        }
      },
      isLastSchedule(index) {
        return this.dailySchedule.getSize() - 1 === index
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-workTime {
    @include set-padding;
    @include set-font-size-large(true);
    width: 200px;
    margin-right: $margin-space;

    .time {
      color: $color-normal-font;
    }
    .isDeadlineError {
      color: $color-error-font;
    }
  }

  .content-scheduleTable {
    @include set-scroll-x;
    @include set-padding;
    tr {
      transition: all 1s;
      &.row-head {
        border-bottom: solid 1px #BBB;
      }
      &.row-odd {
        background-color: #FAFAFA;
      }
      &.row-even {
        background-color: darken(#FAFAFA, 15%)
      }
    }
    th {
      padding: 5px;
      text-align: left;
    }
    td, th {
      position: relative;
      .scheduleItem {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 5px;

        &-time {
          width: 80px;
          input {
            @include reset-input-text;
            height: 20px;
          }
        }

        &-workTime {
          width: 80px;
          text-align: right;
        }

        &-selectGroup {
          select {
            width: 150px;
            @include reset-select;
          }
        }

        &-comment {
          width: 200px;
          input {
            width: 100%;
            @include reset-input-text;
          }
        }

        &-button {
          width: 100px;
          justify-content: space-around;
          .button {
            text-align: center;
            color: #FFF;
            width: 30px;
            padding: 5px;
            border-radius: 3px;
            @include button(#a0443a)
          }
        }
      }

      &.timeError {
        background-color: #fdd;
      }
    }

    .ani-table-row-enter, .ani-table-row-leave-to {
      opacity: 0;
      transform: translateX(50px);
    }
    .ani-table-row-leave-active {
      position: absolute;
    }
  }
</style>