<template>
  <!-- 題組 群組配分、題目數量、占分比 -->
  <PercentageView></PercentageView>

  <hr>

  <!-- 隨機產生考題 -->
  <AddQuestions></AddQuestions>

  <hr>

  <!-- 克漏字 -->
  <h2>克漏字</h2>
  <HelloWorld></HelloWorld>

  <hr>

  <!-- 題目隨機排序 -->
  <h2>題目隨機排序</h2>
  <QuestionSort></QuestionSort>

  <hr>

  <!-- 考試倒數計時 -->
  <ExamTime></ExamTime>

  <hr>

</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import QuestionSort from '@/components/QuestionSort.vue'
import ExamTime from '@/components/ExamTime.vue'
import PercentageView from '@/components/PercentageView.vue'
import AddQuestions from '@/components/AddQuestions.vue'
export default {
  components: {
    PercentageView,
    HelloWorld,
    QuestionSort,
    ExamTime,
    AddQuestions
  },

  data () {
    return {
    }
  },

  mounted () {
  }
}
</script>
