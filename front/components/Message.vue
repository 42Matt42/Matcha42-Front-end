<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p
        class="text-center font-italic"
      >
        {{ text }}
      </p>
    </div>
    <div v-else class="msg-wrapper">
      <div :class="{owner}" class="msg">
        <div class="msg__information">
          <span class="msg__name">{{ name }}</span>
          <span class="msg__date">{{ time }}</span>
        </div>
        <p
          class="msg__text"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: {
    name: String,
    text: String,
    time: String,
    owner: Boolean
  }
}
</script>
