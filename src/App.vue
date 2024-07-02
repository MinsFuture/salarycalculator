<template>
  <div class="app-container">
    <h1 class="app-title">주휴수당 야간수당 중복 계산기</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped>
@import "@/assets/bootstrap.min.css";

.app-container {
  text-align: center; /* 내용을 가운데 정렬 */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 2.5rem; /* 제목의 글꼴 크기 */
  margin-top: 20px; /* 위쪽 여백 */
  margin-bottom: 20px; /* 아래쪽 여백 */
}
</style>
