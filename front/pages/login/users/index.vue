<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <!-- <p v-if="userId == ''">To access a specific user, enter a userId and click the button:</p>
        <p v-else>Type a userId first before to press the button</p> -->
        <!-- <input
          v-model="userId"
          type="text"
        /> -->
        <v-card-title
          class="headline"
        >
          Admin page
        </v-card-title>
        <v-card-text>
          <p
            v-if="username"
          >
            Hello,
          </p>
          <p
            v-else
          >
            The user is
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/"
          >
            Main Page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>
