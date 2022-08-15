<template>
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
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import QuestionSort from '@/components/QuestionSort.vue'
import ExamTime from '@/components/ExamTime.vue'
export default {
  components: {
    HelloWorld,
    QuestionSort,
    ExamTime
  },

  data () {
    return {
    }
  },

  mounted () {
  }
}
</script>
