<template>
  <div class="paging-wrap" v-if="totalPages > 1">
    <ul class="mo-paging">
      <!-- prev -->
      <li :class="['paging-item', 'paging-item--pev', {'paging-item--disabled' : index === 1}]" @click="prev">&lt;&lt;</li>
      <!-- first -->
      <!-- <li :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]" @click="first">首页</li> -->
      <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">...</li>
      <li :class="['paging-item', {'paging-item--current' : index === pager}]" v-for="(pager, pindex) in pagers" :key="pindex" @click="go(pager)">{{ pager }}</li>
      <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">...</li>
      <!-- last -->
      <!-- <li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">尾页</li> -->
      <!-- next -->
      <li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">&gt;&gt;</li>
    </ul>
    <div class="to-page">
      <span class="to-text">跳至</span>
      <input type="number" class="to-input" @blur="toPage" :value="toPageNum" @input="checkPageNum">
      <span class="to-text">页</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: this.pageIndex, // 当前页码
      limit: this.pageSize, // 每页显示条数
      size: this.total || 1, // 总记录数
      showPrevMore: false,
      showNextMore: false,
      toPageNum: '',
      totalPages: Math.ceil(this.total / this.pageSize)
    }
  },
  // 通过props来接受从父组件传递过来的值
  props: {
    // 页面中的可见页码，其他的以...替代, 必须是奇数
    perPages: {
      type: Number,
      default: 5
    },
    // 当前页码
    pageIndex: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总记录数
    total: {
      type: Number,
      default: 1
    }
  },
  computed: {
    // 计算总页码
    pages () {
      return Math.ceil(this.size / this.limit)
    },
    // 计算页码，当count等变化时自动计算
    pagers () {
      let array = []
      let perPages = this.perPages
      let pageCount = this.pages
      let current = this.index
      let _offset = (perPages - 1) / 2
      let offset = {
        start: current - _offset,
        end: current + _offset
      }
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start)
        offset.start = 1
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount)
        offset.end = pageCount
      }
      if (offset.start < 1) offset.start = 1
      /* eslint-disable vue/no-side-effects-in-computed-properties */
      this.showPrevMore = (offset.start > 1)
      this.showNextMore = (offset.end < pageCount)
      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i)
      }
      return array
    }
  },
  methods: {
    prev () {
      if (this.index > 1) {
        this.go(this.index - 1)
      }
    },
    next () {
      if (this.index < this.pages) {
        this.go(this.index + 1)
      }
    },
    // first () {
    //   if (this.index !== 1) {
    //     this.go(1)
    //   }
    // },
    // last () {
    //   if (this.index !== this.pages) {
    //     this.go(this.pages)
    //   }
    // },
    go (page) {
      if (this.index !== page) {
        this.index = page
        // 父组件通过change方法来接受当前的页码
        this.$emit('change', this.index)
      }
    },
    // 手动跳转
    toPage () {
      let numreg = /^[0-9]+.?[0-9]*$/
      if (!numreg.test(this.toPageNum)) return
      let page = parseInt(this.toPageNum)
      if (page > this.totalPages) {
        return
      } else {
        this.go(page)
      }
      this.toPageNum = ''
    },
    checkPageNum ($event) {
      let val = $event.target.value
      const regex = /^[0-9]*[1-9][0-9]*$/
      let f = regex.test(val)
      if (!f) {
        this.toPageNum = ''
        $event.target.value = ''
      } else {
        this.toPageNum = val
      }
    }
  },
  watch: {
    pageIndex (val) {
      this.index = val || 1
    },
    pageSize (val) {
      this.limit = val || 10
    },
    total (val) {
      this.size = val || 1
      this.totalPages = Math.ceil(this.total / this.pageSize)
    }
  }
}
</script>

<style lang="less" scoped>
  .paging-wrap {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 25px;
    .to-page {
      display: flex;
      align-items: center;
      .to-text {
        margin: 0 5px;
        font-size: 12px;
        color: #666666;
        text-align: center;
      }
      .to-input {
        margin: 0 5px;
        width: 27px;
        height: 27px;
        background: #FFFFFF;
        border: 1px solid #E9E9E9;
        border-radius: 2px;
        text-align: center;
        line-height: 25px;
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }
  .mo-paging {
    display: flex;
    font-size: 12px;
    user-select: none;
    list-style: none;
    li.paging-item {
      width: 25px;
      height: 100%;
      line-height: 25px;
      text-align: center;
      background: #FFFFFF;
      border: 1px solid #E9E9E9;
      border-radius: 2px;
      cursor: pointer;
      font-size: 12px;
      color: #999999;
      user-select: none;
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
      // 更多和禁用
      &.paging-item--disabled,
      &.paging-item--more{
        background-color: #F6F7FB;
        color: #666;
        opacity: .75;
        &:hover {
          cursor: not-allowed;
        }
      }
      // 当前页和更多页
      &.paging-item--more,
      &.paging-item--current {
        cursor: default;
      }
      //选中和悬浮
      &.paging-item--current {
        background: #219AF2;
        color: #FFFFFF;
      }
    }
  }
</style>