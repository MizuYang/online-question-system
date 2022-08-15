<template>
  <ul>
    <li v-for="question in questions" :key="question.排序">
      {{ question.排序 }}
      {{ randomSort(question.選項) }}
    </li>
  </ul>
  <button type="button" @click="randomSortQuestion">隨機排序題目</button>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      questions: [
        {
          排序: '題目1',
          題目: '我是標題',
          選項: ['X', 'X', '我是答案', 'X'],
          答案: 'A'
        },
        {
          排序: '題目2',
          題目: '我是標題',
          選項: ['X', 'X', '我是答案', 'X'],
          答案: 'B'
        },
        {
          排序: '題目3',
          題目: '我是標題',
          選項: ['X', 'X', '我是答案', 'X'],
          答案: 'D'
        },
        {
          排序: '題目4',
          題目: '我是標題',
          選項: ['X', 'X', '我是答案', 'X'],
          答案: 'A'
        },
        {
          排序: '題目5',
          題目: '我是標題',
          選項: ['X', 'X', '我是答案', 'X'],
          答案: 'C'
        }
      ]
    }
  },

  watch: {
  },

  methods: {
    randomSort (arr) {
      for (let i = 0, l = arr.length; i < l; i++) {
        const rc = parseInt(Math.random() * l)
        // 让当前循环的数组元素和随机出来的数组元素交换位置
        const empty = arr[i]
        arr[i] = arr[rc]
        arr[rc] = empty
      }
      return arr
    },
    randomSortQuestion () {
      this.randomSort(this.questions)
    }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
