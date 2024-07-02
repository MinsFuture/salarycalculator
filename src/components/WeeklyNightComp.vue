<template>
  <div class="weekly-night-comp">
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label class="col-form-label">1주일동안 일한 총 근로시간</label>
      </div>
      <div class="col-auto">
        <input v-model="$store.state.weeklyHour" type="number" class="form-control">
      </div>
      <div class="col-auto">
        <p>시간</p>
      </div>
      <div class="col-auto">
        <input v-model="$store.state.weeklyMinute" type="number" class="form-control">
      </div>
      <div class="col-auto">
        <p>분</p>
      </div>
    </div>

    <div class="row g-3 align-items-center mt-3">
      <div class="col-auto">
        <label class="col-form-label">그 중 야간에 일한 시간</label>
      </div>
      <div class="col-auto">
        <input v-model="$store.state.nightHour" type="number" class="form-control">
      </div>
      <div class="col-auto">
        <p>시간</p>
      </div>
      <div class="col-auto">
        <input v-model="$store.state.nightMinute" type="number" class="form-control" aria-describedby="nightHelpInline">
      </div>
      <div class="col-auto">
        <p>분</p>
      </div>
      <span id="nightHelpInline" class="form-text">
          • 22시 ~ 06시까지 일한 시간을 말해요
        </span>
    </div>

    <div class="row g-3 align-items-center mt-3">
      <div class="col-auto">
        <label class="col-form-label">나의 시급</label>
      </div>
      <div class="col-auto">
        <input v-model="$store.state.wage" type="text" placeholder="9,860" class="form-control">
      </div>
      <div class="col-auto">
        <p>원</p>
      </div>
      <span class="form-text">
          • 2024년 최저 시급은 9,860원 입니다
      </span>
    </div>

    <button @click="calculate" class="btn btn-primary mt-3">계산하기</button>

    <div>
      <div>
        <h3>내가 일주일에 받는 주휴수당은 <span :class="{ 'text-danger': weeklyAllowance >= 0 }">{{
            weeklyAllowance.toLocaleString()
          }}</span> 원 입니다</h3>
        <h3>내가 일주일에 받는 야간수당은 <span :class="{ 'text-danger': nightAllowance >= 0 }">{{
            nightAllowance.toLocaleString()
          }}</span> 원 입니다</h3>
        <h3>내가 이번주에 받는 주급은 <span :class="{ 'text-danger': weeklySalary >= 0 }">{{
            weeklySalary.toLocaleString()
          }}</span> 원 입니다</h3>
        <h3>내가 받는 총 월급은 <span :class="{ 'text-danger': monthSalary >= 0 }">{{ monthSalary.toLocaleString() }}</span> 원
          입니다</h3>
        <span class="form-text">
          • 위 월급은 한 달을 4.345주로 계산한 예상 급여입니다.
        </span>
        <div class="form-check">
          <input @click="보험클릭" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
          <label class="form-check-label" for="flexRadioDefault1">
            4대보험 적용 9.4%
          </label>
        </div>
        <div class="form-check">
          <input @click="원천징수클릭" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
          <label class="form-check-label" for="flexRadioDefault2">
            원천징수 적용 3.3%
          </label>
        </div>
        <div class="form-check">
          <input @click="미적용클릭" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
          <label class="form-check-label" for="flexRadioDefault3">
            미적용 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "WeeklyNightComp",
  created() {
    this.$store.commit('init');
    this.init();
  },
  data() {
    return {
      weeklyAllowance: 0,
      nightAllowance: 0,
      weeklySalary : 0,
      monthSalary: 0,
      insuranceCheck: true,
      noInsurance : false,
    }
  },
  methods: {
    init(){
      this.weeklyAllowance = 0;
      this.nightAllowance = 0;
      this.weeklySalary = 0;
      this.monthSalary = 0;
      this.insuranceCheck = true;
      this.noInsurance = false;
    },

    calculate() {
      this.주휴수당계산();
      this.야간수당계산();
      this.주급계산();
      this.월급계산();
    },

    주휴수당계산() {
      let totalHour = this.$store.state.weeklyHour + this.$store.state.weeklyMinute / 60;

      if (totalHour >= 40) {
        totalHour = 40;
      }

      this.weeklyAllowance = Math.round((totalHour / 40) * 8 * this.$store.state.wage);
      console.log(this.weeklyAllowance);
    },

    야간수당계산() {
      let totalHour = this.$store.state.nightHour + this.$store.state.nightMinute / 60;

      this.nightAllowance = Math.round(totalHour * this.$store.state.wage * 0.5);
      console.log(this.nightAllowance);
    },

    주급계산(){
      // 일주일 총 근로시간
      let totalHour = (this.$store.state.weeklyHour + this.$store.state.weeklyMinute / 60);

      // 주급
      this.weeklySalary = totalHour * this.$store.state.wage + this.weeklyAllowance + this.nightAllowance;
    },

    월급계산() {
      // 일주일 총 근로시간
      let totalHour = (this.$store.state.weeklyHour + this.$store.state.weeklyMinute / 60);

      // 주급
      let totalWeekSalary = totalHour * this.$store.state.wage + this.weeklyAllowance + this.nightAllowance;

      // 월급
      if (this.insuranceCheck === true) {
        this.monthSalary = Math.round((totalWeekSalary * 4.345) * ((100 - 9.4) / 100));
      } else{
        this.monthSalary = Math.round((totalWeekSalary * 4.345) * ((100 - 3.3) / 100));
      }

      if(this.noInsurance === true){
        this.monthSalary = Math.round(totalWeekSalary * 4.345);
      }
    },

    보험클릭() {
      this.insuranceCheck = true;
      this.noInsurance = false;
      this.월급계산();
    },

    원천징수클릭() {
      this.insuranceCheck = false;
      this.noInsurance = false;
      this.월급계산();
    },

    미적용클릭(){
      this.noInsurance = true;
      this.월급계산();
    }
  },

}
</script>

<style scoped>
.weekly-night-comp {
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.col-form-label {
  font-weight: bold;
}

input[type="number"] {
  width: 140px;
  font-size: 1.25rem
}

button {
  display: block;
  width: 100%;
  font-size: 1.25rem; /* Increase button font size */
}

.form-text {
  font-size: 1.1rem; /* Increase font size for helper text */
  color: #6c757d;
}

.text-danger {
  font-size: 2.0rem;
  color: red; /* 빨간색으로 설정 */
}
</style>
