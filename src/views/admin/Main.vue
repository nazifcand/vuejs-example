<template>
  <div id="admin-page">
    <div id="side-bar">
      <AdminSideBar />
    </div>
    <div id="admin-main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#admin-page {
  width: 100%;
  min-height: 100vh;
  display: flex;

  #side-bar {
    width: 250px;
    min-height: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #admin-main {
    padding: 25px;
    box-sizing: border-box;
    flex: 1;
  }
}
</style>

<script>
import AdminSideBar from '@/components/AdminSideBar.vue';

export default {
  components: { AdminSideBar }
}
</script>