<template>
  <!-- 設定考試時間 -->
  <section class="border-bottom mb-4 pb-3">
    <h2>設定考試時間</h2>
    <select v-model="setTime.h">
      <option selected="0">0</option>
      <option :value="time" v-for="time in 23" :key="time">{{ time }}</option>
    </select>
    時
    <select v-model="setTime.m">
      <option selected="0">0</option>
      <option :value="time" v-for="time in 59" :key="time">{{ time }}</option>
    </select>
    分
    <select v-model="setTime.s">
      <option selected="0">0</option>
      <option :value="time" v-for="time in 59" :key="time">{{ time }}</option>
    </select>
    秒

    <button type="button" @click="setExamTime">設定完成</button>
  </section>
  <!-- 考試時間倒數計時 -->
  <h3>
    {{ examTime }}
    <button type="button" class="ms-3" @click="startExam">開始測驗</button>
  </h3>
  <p class="text-danger" v-if="examStatus===2">考試時間結束!!</p>

  <h4>模擬學生考題</h4>
  <section class="my-2">
    <label for="txt1" class="me-2">請輸入答案</label>
    <input type="text" id="txt1" :disabled="examStatus===2">

    <section class="d-flex my-2">
      <h4 class="mb-0">選擇題：</h4>
      <select :disabled="examStatus===2">
        <option value="">請選擇答案</option>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
      </select>
    </section>

    <section class="d-flex my-2">
      <h4 class="mb-0">複選題：</h4>
      <input type="checkbox" name="checkbox" value="a" id="checkoxA" :disabled="examStatus===2">
      <label for="checkoxA" class="me-2">a</label>
      <input type="checkbox" name="checkbox" value="b" id="checkoxB" :disabled="examStatus===2">
      <label for="checkoxB" class="me-2">b</label>
      <input type="checkbox" name="checkbox" value="c" id="checkoxC" :disabled="examStatus===2">
      <label for="checkoxC" class="me-2">c</label>
    </section>

    <section class="d-flex my-2">
      <h4 class="mb-0">單選題：</h4>
      <input type="radio" value="a" name="radio" id="radioA" :disabled="examStatus===2">
      <label for="radioA" class="me-2">a</label>
      <input type="radio" value="b" name="radio" id="radioB" :disabled="examStatus===2">
      <label for="radioB" class="me-2">b</label>
      <input type="radio" value="c" name="radio" id="radioC" :disabled="examStatus===2">
      <label for="radioC" class="me-2">c</label>
    </section>

    <div class="text-center my-3">
      <button type="button">提交考卷</button>
    </div>
  </section>

</template>

<script>
export default {

  computed: {
    examTime () {
      const h = parseInt(this.time / 1000 / 60 / 60 % 24)
      const m = parseInt(this.time / 1000 / 60 % 60)
      const s = parseInt(this.time / 1000 % 60)
      return `考試時間剩餘：${h} 小時 ${m} 分 ${s} 秒`
    }
  },

  data () {
    return {
      // time: 3600000 //* 測試一小時
      setTime: {
        h: 0,
        m: 0,
        s: 0
      },
      time: localStorage.getItem('examTime') || 0,
      examStatusList: {
        setting: 0,
        start: 1,
        end: 2
      },
      examStatus: null
    }
  },

  methods: {
    //* 設定考試時間
    setExamTime () {
      this.time = 0 //* 初始化

      if (this.setTime.h) {
        this.time += this.setTime.h * 1000 * 60 * 60
      }
      if (this.setTime.m) {
        this.time += this.setTime.m * 1000 * 60
      }
      if (this.setTime.s) {
        this.time += this.setTime.s * 1000
      }
    },
    //* 開始測驗
    startExam () {
      const examTimer = setInterval(() => {
        this.time -= 1000
        if (this.time <= 0) {
          console.log('考試時間結束')
          this.examStatus = this.examStatusList.end
          clearInterval(examTimer) //* 清除倒數計時
          localStorage.setItem('examTime', 0) //* 清除 localStorage 紀錄
        }
        localStorage.setItem('examTime', this.time)
      }, 1000)
    }
  },

  mounted () {
    //* 若計時器有保存時間的紀錄,就直接繼續季時
    //* (學生先前可能按到關閉網頁，又重新登入線上考試)
    if (this.time > 0) {
      this.startExam()
    }
  }

}
</script>
