<template>
  <h2>線上考試</h2>
  <form @submit.prevent="submit">
    <section v-for="(exPaper,key, index) in teacherUseExPaper" :key="`${index}${key}`">
      {{key}}
      <ol>
        <li v-for="(question,index) in exPaper" :key="`question${question.題目}${index}`">
            題目： {{ question.題目 }}
            <ul v-for="(items,i,indexx) in question.選項" :key="`${question.題目}${items}${i}`" class="list-unstyled ms-2">
              <li>
                <input type="radio" :id="`${question.題目}${items}`" :name="`${question.題目}`"
                      :value="indexx" v-model="examForm[`q${key}${index+1}`]">
                <label :for="`${question.題目}${items}`">{{ items }}</label>
              </li>
            </ul>
        </li>
      </ol>
    </section>
    <button type="submit">提交考卷</button>
  </form>
  <hr>
  <h3>考試結果</h3>
  分數：{{ examStatus.score }} <br>
  答對：{{ examStatus.bingo }} 題<br>
  答錯：{{ examStatus.wrongAnswer }} 題
</template>

<script>
import { mapState } from 'vuex'
export default {

  computed: {
    ...mapState(['teacherUseExPaper'])
  },

  data () {
    return {
      examForm: {},
      examStatus: {
        score: 0,
        bingo: 0,
        wrongAnswer: 0
      }
    }
  },

  methods: {
    submit () {
      //* 初始化
      this.examStatus.bingo = 0
      this.examStatus.wrongAnswer = 0
      const arr = []

      //* 將所有題組(是非題、單選題..)的答案選項丟到 arr，方便逐一比對
      Object.keys(this.teacherUseExPaper).forEach(key => {
        this.teacherUseExPaper[key].forEach(items => {
          arr.push(items)
        })
      })
      //* 取出選項中答案的索引位置
      arr.forEach((items, index) => {
        const answerIndex = Object.values(items.選項).findIndex(item => {
          return item === '答案'
        })

        //* 和考生選擇的索引位置一樣(答對)，就將 examStatus.bingo+1，答錯 examStatus.wrongAnswer+1
        const studentAnsArr = []
        //* 先將學生答案拉出來
        Object.values(this.examForm).forEach(studentAnswer => {
          studentAnsArr.push(studentAnswer)
        })

        //* 比對學生答案索引和正確解答索引是否一致
        if (studentAnsArr[index] === answerIndex) {
          this.examStatus.bingo++
        } else {
          this.examStatus.wrongAnswer++
        }
      })
    }
  },

  mounted () {
  }
}
</script>
