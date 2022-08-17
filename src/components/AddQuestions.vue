<template>
  <!-- 產生幾組考卷 -->
  <h2 class="h5">設定要自動產生多少份考卷</h2>
  我要產生 <input type="number" v-model="examPaperNum" style="width:45px"> 組考卷
  <button type="button" @click="getExamPaper">產生題目</button>

  <br>
  <br>

  <!-- 選單:選擇使用的考卷 -->
  <select @change="changePreviewExPaper" v-if="Object.keys(teacherUseExPaper).length===0 && Object.keys(previewQueList).length>0">
    <option :value="keys" v-for="(val,keys) in previewQueList" :key="`perview${keys}`">
      {{ keys }}
    </option>
  </select>

  <button type="button" class="mx-5 my-4" @click="confirmExPaper" v-if="Object.keys(teacherUseExPaper).length===0&& Object.keys(previewQueList).length>0">確定使用此考卷</button>
  <button type="button" class="mx-5 my-4" @click="resetExPaper" v-if="Object.keys(teacherUseExPaper).length>0">重選考卷</button>

  <br>

  <!-- 考卷選擇:渲染題組、題目選項 -->
  <ul class="mb-2" v-if="Object.keys(teacherUseExPaper).length===0">
    <li v-for="(val, keys) in perviewExamPaper" :key="keys">
      <p class="mb-0">
        {{ keys }} <small>(每題 {{ questionsList[keys].score }} 分, 共 {{ val.length }}題)</small>
      </p>
      <ul>
        <li v-for="(val) in val" :key="val">
          題目:{{ val.題目 }}, <span class="bg-hightLight">答案：{{ getAnsPosition(val.選項) }}</span>, {{ val.選項 }}
        </li>
      </ul>
    </li>
  </ul>

  <!-- 渲染已選擇的考卷題目 -->
  <button type="button" @click="randomSort" v-if="Object.keys(teacherUseExPaper).length>0">隨機排序答案選項</button>
  <ul class="mb-2" v-if="Object.keys(teacherUseExPaper).length>0">
    <li v-for="(val, keys) in teacherUseExPaper" :key="keys">
      <p class="mb-0">
        {{ keys }} <small>(每題 {{ questionsList[keys].score }} 分, 共 {{ val.length }}題)</small>
        <span class="bg-hightLight ms-5">答案各佔比：{{ ansPercentage(val) }}</span>
      </p>
      <ul>
        <li v-for="(val) in val" :key="val">
          題目:{{ val.題目 }}, <span class="bg-hightLight">答案：{{ getAnsPosition(val.選項) }}</span>, {{ val.選項 }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import QuestionsView from '@/mixins/QuestionsBank.vue'
export default {

  mixins: [QuestionsView], //* 題庫匯入

  computed: {
    ...mapState(['questionsList'])
  },

  data () {
    return {
      previewQueList: {}, //* 給用戶選要哪一組考卷
      perviewExamPaper: {},
      examPaperNum: 1,
      teacherUseExPaper: {} //* 老師選擇的考卷

    }
  },

  methods: {
    ...mapMutations(['CONFIRM_EX_PAPER', 'RESET_EX_PAPER']),

    //* 切換預覽考卷
    changePreviewExPaper (e) {
      const currentExPaper = e.target.value
      this.perviewExamPaper = this.previewQueList[currentExPaper]
    },
    //* 新增*組考卷
    getExamPaper () {
      //* 若產生考卷數量大於 0
      const exPaperNum = this.examPaperNum
      if (exPaperNum > 0) {
        this.previewQueList = {} //* 初始化
        for (let i = 0; i < exPaperNum; i++) {
          this.previewQueList[`考卷${i + 1}`] = this.getRandomQuestions()
        }
        this.perviewExamPaper = this.previewQueList['考卷1'] //* 預設顯示考卷1
      }
    },
    //* 重選考卷
    resetExPaper () {
      //* 初始化
      this.teacherUseExPaper = {}
      this.previewQueList = {}
      this.perviewExamPaper = {}
      this.RESET_EX_PAPER()
    },
    //* 生成用戶選擇的各題組 指定數量的隨機題目
    getRandomQuestions () {
      const obj = {}
      Object.keys(this.questionsList).forEach((queKeys) => {
        //* 若題目數量大於 0
        if (this.questionsList[queKeys].queNum) {
          const queNum = this.questionsList[queKeys].queNum
          const shuffled = this.questions[queKeys].slice(0)
          let i = this.questions[queKeys].length
          const min = i - queNum
          let temp
          let index
          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random())
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
          }
          obj[queKeys] = shuffled.slice(min)
        }
      })
      return obj
    },
    //* 亂數排序答案選項
    randomSort () {
      let newArr = []
      Object.keys(this.teacherUseExPaper).forEach(keys => {
        this.teacherUseExPaper[keys].forEach(item => {
          const arr = []
          Object.keys(item.選項).forEach(keys => {
            arr.push(item.選項[keys])
            newArr = sort(arr)
          })

          item.選項 = {
            A: newArr[0],
            B: newArr[1],
            C: newArr[2],
            D: newArr[3]
          }
        })
      })
      //* 將答案順序打亂
      function sort (arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
          const rc = parseInt(Math.random() * l)
          // 让当前循环的数组元素和随机出来的数组元素交换位置
          const empty = arr[i]
          arr[i] = arr[rc]
          arr[rc] = empty
        }
        return arr
      }
    },
    //* 取得答案選項位置
    getAnsPosition (ansObj) {
      const ansOptions = ['A', 'B', 'C', 'D']
      const position = Object.keys(ansObj).findIndex(keys => {
        return ansObj[keys] === '答案'
      })
      return ansOptions[position]
    },
    //* 答案各佔比
    ansPercentage (ans) {
      const answerCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
      }
      ans.forEach(item => {
        const ansIndex = Object.keys(item.選項).findIndex(optionABCD => {
          return item.選項[optionABCD] === '答案'
        })
        if (ansIndex === 0) {
          answerCount.A++
        } else if (ansIndex === 1) {
          answerCount.B++
        } else if (ansIndex === 2) {
          answerCount.C++
        } else if (ansIndex === 3) {
          answerCount.D++
        }
      })
      return `A：${answerCount.A}, B：${answerCount.B}, C： ${answerCount.C}, D：${answerCount.D}`
    },
    //* 確定考卷
    confirmExPaper () {
      this.teacherUseExPaper = this.perviewExamPaper
      this.CONFIRM_EX_PAPER(this.perviewExamPaper)
    }
  },

  mounted () {
    //* 計算答案各佔比
    const answerCount = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
    }
    //* 自動生成題庫類型:是非題、單選題、複選題、克漏字、重組題、問答題
    const data = []
    function random (type, num) {
      for (let i = 0; i < num; i++) {
        const obj = {
          題目: `${type} ${i + 1}`,
          選項: {
            A: '選項 1',
            B: '選項 2',
            C: '選項 3',
            D: '答案'
          },
          答案: getRandomAns()
        }
        data.push(obj)
      }
      // console.log(data)
      // console.log(answerCount) //* 查看答案各占比
    }
    random('問答題', 100) // ? 自動產生 100 筆 假資料

    //* 隨機產生答案 A-D
    function getRandomAns () {
      const answerList = ['A', 'B', 'C', 'D']
      const answer = answerList[Math.floor(Math.random() * answerList.length)]
      answerCount[answer]++

      return answer
    }
  }

}
</script>

<style lang='scss' scope>
.bg-hightLight{
  background: rgba(189, 253, 255, 0.665);
}
</style>
