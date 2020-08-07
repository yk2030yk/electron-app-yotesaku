<template>
  <div>
    <div class="contentBox">
      <div class="content-horizontal content-register">
      <input type="text" v-model="name"/>
      <label class="checkbox">
        <input type="checkbox" v-model="isZatsumu">
        <span>雑務</span>
      </label>
      <div class="button-flat" @click="insert">登録</div>
      </div>
    </div>
    <div class="contentBox">
      <div class="content content-category">
        <div v-for="data in CategoryA.data" class="item-category">
          <label class="checkbox">
            <input type="checkbox"
              v-model="checkedIds"
              :value="data._id">
            <span>{{ data.name }}</span>
          </label>
          <div v-if="data.isZatsumu" class="icon-zatsu">雑</div>
        </div>
      </div>
      <div class="content content-remove">
        <div class="button-flat" @click="remove">削除</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryA from '@/modules/models/CategoryA'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        CategoryA: CategoryA,
        checkedIds: [],
        name: '',
        isZatsumu: false,
      }
    },
    methods: {
      insert() {
        let item = {
          name: this.name,
          isZatsumu: this.isZatsumu ? true : false
        }
        this.CategoryA.insert(item)
      },
      remove() {
        this.CategoryA.remove(this.checkedIds)
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