<template>
  <div class="notification" :class="type">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
.notification {
  line-height: 20px;
  position: relative;
  padding: 22px 26px;
  margin-bottom: 15px;
  font-size: 12px;
  border-radius: 3px;

  &.info {
    background-color: #e9f7fe;
    color: #4587a9;
  }

  &.warning {
    background-color: #fbfadd;
    color: #8f872e;
  }

  &.success {
    background-color: #ebf6e0;
    color: #5f9025;
  }

  &.danger {
    background-color: #ffe9e9;
    color: #de5959;
  }
}
</style>

<script>
export default {
  props: {
    type: { type: String, required: true }
  }
}
</script>
