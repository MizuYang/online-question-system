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
  <input type="text" id="是非題" v-model="percentage.是非題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>
  <label for="單選題">單選題：</label>
  <input type="text" id="單選題" v-model="percentage.單選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>
  <label for="複選題">複選題：</label>
  <input type="text" id="複選題" v-model="percentage.複選題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>
  <label for="克漏字">克漏字：</label>
  <input type="text" id="克漏字" v-model="percentage.克漏字" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>
  <label for="重組題">重組題：</label>
  <input type="text" id="重組題" v-model="percentage.重組題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>
  <label for="問答題">問答題：</label>
  <input type="text" id="問答題" v-model="percentage.問答題" style="width: 30px" oninput="value=value.replace(/[^\d]/g,'')">分
  <br>

</template>

<script>

export default {
  components: {
  },

  computed: {
    //* 分配分數
    allotScore () {
      let useScore = 0 //* 初始化
      Object.values(this.percentage).forEach(score => {
        if (score) {
          useScore += parseInt(score)
        }
        return useScore
      })
      return useScore
    }
  },

  data () {
    return {
      scoreCap: 100,
      percentage: {
        是非題: 0,
        單選題: 0,
        複選題: 0,
        克漏字: 0,
        重組題: 0,
        問答題: 0
      }
    }
  },

  watch: {
  },

  methods: {
    // //* 分配分數
    // allotScore () {
    //   this.useScore = 0 //* 初始化
    //   Object.values(this.percentage).forEach(score => {
    //     if (score) {
    //       this.useScore += parseInt(score)
    //     }
    //   })
    // }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
