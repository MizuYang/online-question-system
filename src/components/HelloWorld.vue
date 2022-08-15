<template>
  <!-- 克漏字 -->
  <section>
    <textarea name="" id="" cols="30" rows="10" v-model="text" @change="addExamQuestions"></textarea>
    <br>
    <!-- 輸入題目答案 -->
    <div ref="answerContainer"></div>
    <button type="button" @click="getAnswer">取得題目、答案</button>
    <ul>
      <li v-for="que in question" :key="que">
        <h2>題目 {{ que.question }}</h2>
        <h3>答案</h3>
        <ol>
          <li v-for="ans in que.answer" :key="ans">
            {{ans}}
          </li>
        </ol>
      </li>
    </ul>
  </section>
</template>

<script>
export default {

  data () {
    return {
      text: '',
      question: {},
      answer: []
    }
  },
  methods: {
    //* 模擬用戶輸入的欄位，可能會有很多組
    //* 查看用戶輸入了幾個題目 (一個"(_)"或"( _ )"代表一題的答案欄位)
    addExamQuestions () {
      this.addQuestions()
    },
    //* 新增題目
    addQuestions () {
      this.question = {} //* 初始化
      let question = this.text.split('\n') //* 題目

      const answerContainer = this.$refs.answerContainer
      //* 初始化:刪除answer 底下所有元素
      answerContainer.innerHTML = ''

      //* 為了不讓空白元素破壞索引順序，所以先刪除空白元素，然後才建立題目 data
      question = question.filter(item => item !== '')

      question.forEach((question, index) => {
        //* 取得題目
        this.question[`question${index + 1}`] = {
          question,
          answerNum: 0,
          answer: []
        }
        //* 取得答案欄位
        question.split('').forEach((item, i, arr) => {
          // * 若是 (_) 增加一個答案欄位this.anwser[`question[${i}]`]
          if (item === '(' && arr[i + 1] === '_' && arr[i + 2] === ')') {
            const el = document.createElement('input')
            el.setAttribute('type', 'text')
            answerContainer.appendChild(el)
            this.question[`question${index + 1}`].answerNum++ //* 取得這一題答案數量
          // * 若是 ( _ ) 增加一個答案欄位
          } else if (item === '(' && arr[i + 1] === ' ' && arr[i + 2] === '_' && arr[i + 3] === ' ' && arr[i + 4] === ')') {
            const el = document.createElement('input')
            el.setAttribute('type', 'text')
            answerContainer.appendChild(el)
            this.question[`question${index + 1}`].answerNum++ //* 取得這一題答案數量
          }
        })
      })
    },
    //* 取得題目、答案
    getAnswer () {
      //* 初始化
      const answer = []
      //* 取得答案
      const answerText = this.$refs.answerContainer.childNodes
      answerText.forEach(ans => {
        answer.push(ans.value)
      })

      //* 該題目有幾個答案，就推幾個答案數放進去
      let index = 0 //* 要推送 answer 中第幾個索引的依據
      Object.keys(this.question).forEach(key => {
        //* 取得題目數量
        const ansNum = this.question[key].answerNum
        for (let i = 0; i < ansNum; i++) {
          this.question[key].answer[i] = answer[index] //* 新增答案進去
          index++
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
