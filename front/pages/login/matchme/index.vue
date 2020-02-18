<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <div>
      <br>
      <v-container
        class="font-weight-black"
      >
        Let's find the one !
      </v-container>
      <div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col>
                <v-radio-group
                  :rules="interestedinRules"
                  v-model="loadedUsers.interested_in"
                  row="row"
                  max="1"
                  label="I am interested in..."
                >
                  <v-radio :value="3" label="Women" />
                  <v-radio :value="2" label="Men" />
                  <v-radio :value="1" label="Both" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-slider
                  v-model="proximity"
                  :thumb-size="38"
                  :rules="distanceRules"
                  thumb-label="always"
                  thumb-color="deep-purple accent-3"
                  label="Distance (in km)"
                  track-color="purple lighten-3"
                  track-fill-color="purple accent-4"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-range-slider
                  :value="scoreValue"
                  :rules="scoreRules"
                  :thumb-size="38"
                  track-fill-color="purple accent-4"
                  thumb-label="always"
                  thumb-color="indigo accent-2"
                  track-color="purple lighten-3"
                  min="0"
                  max="100"
                  label="Target popularity"
                />
              </v-col>
            </v-row>
            <v-row
              style="background-color: rgba(0, 0, 0, 0)"
            >
              <v-col cols="10">
                <v-select
                  v-model="tags"
                  :items="hobbies"
                  attach
                  chips
                  label="Tags"
                  multiple
                />
              </v-col>
            </v-row>
            <br>
            <v-row>
              <v-col>
                <v-btn
                  @click="matchme"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  FIND the one !
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      proximity: 10,
      scoreValue: [0, 100],
      scoreName: [
        'New',
        'Acknowledged',
        'Famous',
        'VIP'
      ],
      scoreIcons: 'mdi-snowflake',
      tags: [],
      hobbies: ['#gamer', '#surfer', '#hacker', '#starwars', '#meditation', '#42', '#geek', '#fashion', '#hipster', '#horse', '#vegan', '#meat', '#', '#coding', '#C', '#python', '#anime', '#yachting', '#matcha', '#macron'],
      scoreRules: [
        v => !!v || 'Target popularity required',
        v => (v[1] < 201) || 'Target popularity max too high',
        v => (v[0] >= 0) || 'Target popularity minimum is 0'
      ],
      distanceRules: [
        v => !!v || 'Target distance required',
        v => (v < 101) || 'Distance max is 100 km',
        v => (v >= 0) || 'Distance minimum is 0 km'
      ],
      interestedinRules: [
        v => !!v || 'Target gender required',
        v => (v > 0 && v < 4) || 'Pick one of the 3 target gender choices'
      ]
    }
  },
  computed: {
    serverMessage () {
      return this.$store.getters.serverMessage
    },
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    matchme () {
      if (this.$refs.form.validate()) {
        /* eslint-disable */
        console.log('store', this.$store)
        this.$axios ({
          method: 'post',
          url: process.env.serverUrl + '/matchme',
          data: {
            interested_in: this.interested_in,
            proximity: this.proximity,
            tags: this.hobbies,
            popularity: this.popularity,
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_matchme', response)
            console.log('response_client', response.client)
            this.$store.dispatch('setMessage', response.client)
            this.$router.push('/')
          })
          .catch((error) => {
            console.log ('error_axios_matchme', error)
            console.log('error_client', error.response.data.client)
            this.$store.dispatch('setMessage', error.response.data.client)
          })
        this.$router.push('/settings')
      }
    },
    scoreIcon (value) {
      return this.scoreIcons[value]
    },
  }
}
</script>
