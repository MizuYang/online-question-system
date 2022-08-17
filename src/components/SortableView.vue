<template>
  <transition-group class="list my-5" tag="ul" name="drag">
    <!-- 拖動屬性使用 draggable="true" 和 draggable 畫面呈現不一樣 -->
    <li v-for="(q,index) in questions" :key="q.title"
        class="list-unstyled box" draggable="true"
        @dragstart="getDragItemIndex(index)"
        @dragenter.prevent="changePosition($event,index)">
        {{ index+1 }}. {{ q.title }}
    </li>
  </transition-group>
</template>

<script>
export default {

  data () {
    return {
      questions: [
        {
          title: '是非題'
        },
        {
          title: '單選題'
        },
        {
          title: '複選題'
        },
        {
          title: '克漏字'
        },
        {
          title: '重組題'
        },
        {
          title: '問答題'
        }
      ],
      currentDragIndex: 0 //* 當前拖動對象的索引
    }
  },

  methods: {
    //* 開始拖動: 取得拖動對象的索引
    getDragItemIndex (index) {
      this.currentDragIndex = index
    },
    //* 移動到目標位置: 交換位置
    changePosition (e, index) {
      //* 將當前目標先存起來
      const tempCurrentEl = this.questions[this.currentDragIndex]
      //* 將拖動目標刪除，直接插隊到目標位置
      this.questions.splice(this.currentDragIndex, 1)
      this.questions.splice(index, 0, tempCurrentEl)

      //* 因拖動元素移到目標位置了，所以要將自己原先索引改為目標索引
      this.currentDragIndex = index
    }
  }

}
</script>

<style lang='scss' scope>
.box {
  cursor: move;
  padding: 15px;
  width: 150px;
  background: #000;
  color: #fff;
  text-align: center;
  margin-bottom: 5px;
}
//* 列表拖曳時漸變效果
.list {
  .drag-move {
    transition: transform .3s;
  }
}
//* 隱藏圈選文字時的顏色
::selection {
background:none;
color: none;
}
</style>
