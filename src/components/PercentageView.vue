<template>
  <!-- 分數上限 -->
  <div class="border-bottom my-2 pb-2">
    <label for="分數上限">分數上限：</label>
    <input type="text" v-model="scoreCap" id="分數上限" style="width: 35px">分

    <span class="ms-3" :class="{'text-danger': allotScore>scoreCap}">{{ allotScore }} / {{ scoreCap }}</span>
  </div>
  <br>

  <!-- 群組配分、題目數量、占分比 -->
  <label for="是非題">是非題：</label>
  <input type="text" id="是非題" v-model="scorePercentage.是非題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="是非題">題目數量：</label>
  <input type="text" id="是非題" v-model="questionsNumList.是非題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>
  <label for="單選題">單選題：</label>
  <input type="text" id="單選題" v-model="scorePercentage.單選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="單選題">題目數量：</label>
  <input type="text" id="單選題" v-model="questionsNumList.單選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>
  <label for="複選題">複選題：</label>
  <input type="text" id="複選題" v-model="scorePercentage.複選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="複選題">題目數量：</label>
  <input type="text" id="複選題" v-model="questionsNumList.複選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>
  <label for="克漏字">克漏字：</label>
  <input type="text" id="克漏字" v-model="scorePercentage.克漏字" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="克漏字">題目數量：</label>
  <input type="text" id="克漏字" v-model="questionsNumList.克漏字" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>
  <label for="重組題">重組題：</label>
  <input type="text" id="重組題" v-model="scorePercentage.重組題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="重組題">題目數量：</label>
  <input type="text" id="重組題" v-model="questionsNumList.重組題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>
  <label for="問答題">問答題：</label>
  <input type="text" id="問答題" v-model="scorePercentage.問答題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分，
  <label for="問答題">題目數量：</label>
  <input type="text" id="問答題" v-model="questionsNumList.問答題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">題

  <br>

  <ul class="my-2">
    <template v-for="(val, keys) in questionsList" :key="keys">
      <li v-if="val.queNum && val.score">{{ keys }}：{{ val.queNum }} 題, 每題 {{ val.score }} 分</li>
    </template>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {

  computed: {
    ...mapState(['questionsList']),
    //* 分配分數
    allotScore () {
      let useScore = 0 //* 初始化
      Object.keys(this.scorePercentage).forEach(score => {
        const queScore = this.scorePercentage[score] //* 題目分數
        const queNum = this.questionsNumList[score] //* 題目數量
        if (queScore > 0) {
          useScore += queScore * queNum
        }
        return useScore
      })

      return useScore
    }
  },

  watch: {
    //* 監聽:用戶先輸入"分數"再輸入"題目數量" => 把值傳回 Store
    questionsNumList: {
      handler () {
        const obj = {}
        Object.keys(this.questionsNumList).forEach(keys => {
          const score = parseInt(this.scorePercentage[keys])
          const queNum = parseInt(this.questionsNumList[keys])
          //* 若有設定"分數"、"數量"，才傳到 Store
          if (score && queNum) {
            obj[keys] = {
              queNum,
              score
            }
          } else {
            obj[keys] = {
              queNum: 0
            }
          }
        })
        this.GET_QUESTIONS_NUM(obj)
      },
      deep: true
    },
    //* 監聽:用戶先輸入"題目數量"再輸入"分數" => 把值傳回 Store
    scorePercentage: {
      handler (val) {
        const obj = {}
        Object.keys(val).forEach(keys => {
          const score = parseInt(this.scorePercentage[keys])
          const queNum = parseInt(this.questionsNumList[keys])
          //* 若有設定"分數"、"數量"，才傳到 Store
          if (score && queNum) {
            obj[keys] = {
              queNum,
              score
            }
          } else {
            obj[keys] = {
              queNum: 0
            }
          }
        })
        this.GET_QUESTIONS_NUM(obj)
      },
      deep: true
    }
  },

  data () {
    return {
      scoreCap: 100,
      scorePercentage: {
        是非題: 0,
        單選題: 0,
        複選題: 0,
        克漏字: 0,
        重組題: 0,
        問答題: 0
      },
      questionsNumList: {
        是非題: 0,
        單選題: 0,
        複選題: 0,
        克漏字: 0,
        重組題: 0,
        問答題: 0
      }
    }
  },

  methods: {
    ...mapMutations(['GET_QUESTIONS_NUM'])
  }

}
</script>
