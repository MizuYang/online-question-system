<template>
  <h2>線上考試</h2>
  <form @submit="submit">
    <section v-for="(exPaper,key, index) in teacherUseExPaper" :key="`exPaper${index}`">
      {{key}}
      <ol>
        <li v-for="(question,index) in exPaper" :key="`question${index}`">
            題目： {{ question.題目 }}
            <ul v-for="(items, i) in question.選項" :key="`items${i}`" class="list-unstyled ms-2">
              <li> <input type="radio" :id="`${question.題目}${i}`" :name="`${question.選項}${index}`" :value="items" v-model="examForm[`q${index+1}`]"> <label :for="`${question.題目}${i}`">{{ items }}</label></li>
            </ul>
        </li>
      </ol>
    </section>
    <button type="submit">提交考卷</button>
  </form>
</template>

<script>
import { mapState } from 'vuex'
export default {

  computed: {
    ...mapState(['teacherUseExPaper'])
  },

  data () {
    return {
      examForm: {}
    }
  },

  methods: {
    submit () {
      console.log(this.examForm)
    }
  },

  mounted () {
  }
}
</script>
