<template>
  <div></div>
</template>
  <script>
export default {
  data() {
    return {};
  },
  created() {
    let url = this.$route.query;
    let str = "";
    for (let i in url) {
      str += url[i];
    }
    const path = this.$route.query;
    this.$router.push({
      path: str
    });
  }
};
</script>
  <style>
</style>