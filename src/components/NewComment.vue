<template>
  <form @submit.prevent="createComment">
    <div class="group">
      <textarea placeholder="enter comment" v-model="comment"></textarea>
    </div>

    <div class="group">
      <button type="submit">Send</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  margin-top: 50px;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    createComment() {
      const { comment } = this;
      this.$store.dispatch('createComment', { comment });
      this.comment = '';
    }
  }
}
</script>