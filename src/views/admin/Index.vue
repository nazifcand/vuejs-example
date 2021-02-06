<template>
  <Notification type="info">Welcome</Notification>
  <Notification type="warning">Example Notification</Notification>
  <Notification type="danger">Example Danger Notification</Notification>
  <Notification type="success">Example Success Notification</Notification>
</template>

<script>
import Notification from '@/components/Notification.vue';

export default {
  components: { Notification }
}
</script>