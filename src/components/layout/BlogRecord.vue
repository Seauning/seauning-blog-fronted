<template>
  <footer class="blog_record">
    <div class="record_wrap">
      <div class="record_date">© 2021.12.1 - 2021.1.1 By Seauning</div>
      <div class="record_adr"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BlogRecord',
};
</script>

<style lang="scss" scoped>
.blog_record {
  margin: 40px auto 0;
  width: 12rem;
  min-width: 120px;
  height: 160px;
  background: linear-gradient(-45deg, #c471ed, #f64f59, #12c2e9, #29ffc6);
  background-size: 400% 400%;
  animation: BGC-Gradient 10s ease infinite;
  -webkit-animation: BGC-Gradient 10s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

@keyframes BGC-Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
