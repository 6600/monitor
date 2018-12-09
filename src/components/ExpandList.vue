<template>
  <!--下拉展开模块-->
  <div class="expand-list-box" :class="{ active: showExpand }">
    <div class="list" @click.stop="listClick($el)">
      <div class="expand-left">{{title}}</div>
      <div class="right">
        <div class="right-icon icon">
          <svg t="1544236174812" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21961" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M511.96131555 809.05102222L1021.23406222 275.34449778l-57.67850667-60.39438223-451.54190222 473.24387556L60.44444445 214.98311111l-57.67850667 60.35228444L511.96131555 809.05102222z" p-id="21962"></path></svg>
        </div>
      </div>
    </div>
    <div class="expand" :style="{height: slotHeight}">
      <!-- 要根据这层dom计算高度 -->
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    listClick () {
      if (this.showExpand) {
        this.slotHeight = 0
      } else {
        this.slotHeight = this.$el.childNodes[1].childNodes[0].clientHeight + 'px'
      }
      this.showExpand = !this.showExpand
    },
    calculation () {
      if (this.showExpand) {
        this.slotHeight = this.$el.childNodes[1].childNodes[0].clientHeight + 'px'
      } else {
        this.slotHeight = 0
      }
      this.changeing = false
    }
  },
  data () {
    return {
      showExpand: false,
      slotHeight: 0,
      changeing: false
    }
  },
  mounted () {
    // 插件DOM发生改变自动调整大小
    console.log(this.$el.childNodes)
    const DOM = this.$el.childNodes[1]
    DOM.addEventListener('DOMSubtreeModified', () => {
      if (this.changeing) return
      this.changeing = true
      setTimeout(() => {
        this.calculation()
      }, 0.5)
      // console.log('列表中子元素被修改')
    }, false)
  },
  beforeDestroy () {
    const DOM = this.$el.childNodes[1]
    DOM.removeEventListener('DOMSubtreeModified', () => {
      console.log('取消监听!')
    })
  }
}
</script>

<style scoped>
  .expand-list-box {
    position: relative;
    overflow: hidden;
    user-select: none;
    cursor: default;
  }
  .list {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    height: 49px;
    line-height: 50px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    background-color: #ffffff;
    border-bottom: 1px solid #e9e9e9;
    cursor: pointer;
  }
  .expand-left .icon{
    height: 20px;
    line-height: 20px;
    width: 20px;
    margin: 0;
  }
  .expand-left {
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 55px);
    text-align: left;
    margin: 0 10px;
  }
  .right{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
  }
  .right svg{
    margin: 11px;
  }
  .right-icon {
    transition: transform .4s;
    color:  #999999;
    transform: rotate(-90deg);
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .active .right-icon{
    transform: rotate(0deg);
  }
  .expand {
    overflow: hidden;
    transition: height .4s;
    background: #F7F8FA;
  }
</style>