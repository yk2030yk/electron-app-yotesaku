<template>
  <div>
    <div class="contentBox">
      <div class="content-horizontal content-register">
        <input type="text" v-model="name"/>
        <div class="button-flat" @click="insert">登録</div>
      </div>
    </div>
    <div class="contentBox">
      <div class="content content-category">
        <div v-for="data in CategoryC.data" class="item-category">
          <label class="checkbox">
            <input type="checkbox"
              v-model="checkedIds"
              :value="data._id">
            <span>{{ data.name }}</span>
          </label>
        </div>
      </div>
      <div class="content content-remove">
        <div class="button-flat" @click="remove">削除</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryC from '@/modules/models/CategoryC'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        CategoryC: CategoryC,
        checkedIds: [],
        name: ''
      }
    },
    methods: {
      insert() {
        let item = {
          name: this.name
        }
        this.CategoryC.insert(item)
      },
      remove() {
        this.CategoryC.remove(this.checkedIds)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-register {
    justify-content: center;
    align-items: center;
    input[type=text] {
      width: 250px;
      height: 20px;
      font-size: $font-size;
    }
    .checkbox {
      margin-left: 5px;
    }
    .button-flat {
      margin-left: auto;
    }
  }

  .content-category {
    @include set-scroll-y;
    height: 300px;
    .item-category {
      display: flex;
      align-items: center;
      .icon-zatsu {
        margin-left: 5px;
        color: #FF4444;
      }
    }
  }

  .content-remove {
    text-align: right;
  }
</style>