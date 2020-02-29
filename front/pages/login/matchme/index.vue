<template>
  <div>
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
                  disabled
                  readonly
                >
                  <v-radio :value="3" label="Women" />
                  <v-radio :value="2" label="Men" />
                  <v-radio :value="1" label="Both" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-icon class="hidden-xs-only" right large>
                  mdi-flower
                </v-icon>
              </v-col>
              <v-col cols="10">
                <v-range-slider
                  v-model="ageValue"
                  :rules="ageRules"
                  :thumb-size="34"
                  track-fill-color="purple accent-4"
                  thumb-label="always"
                  thumb-color="indigo accent-2"
                  track-color="purple lighten-3"
                  min="18"
                  max="100"
                  label="Age"
                >
                  <v-text-field
                    :value="ageValue[0]"
                  />
                  <v-text-field
                    :value="ageValue[1]"
                  />
                </v-range-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-icon class="hidden-xs-only" right large>
                  mdi-map-marker-radius
                </v-icon>
              </v-col>
              <v-col cols="10">
                <v-slider
                  v-model="proximity"
                  :thumb-size="34"
                  :rules="distanceRules"
                  max="20000"
                  thumb-label="always"
                  thumb-color="deep-purple accent-3"
                  label="Distance (km)"
                  track-color="purple lighten-3"
                  track-fill-color="purple accent-4"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-icon class="hidden-xs-only" right large>
                  mdi-star-circle
                </v-icon>
              </v-col>
              <v-col cols="10">
                <v-range-slider
                  v-model="scoreValue"
                  :rules="scoreRules"
                  :thumb-size="34"
                  track-fill-color="purple accent-4"
                  thumb-label="always"
                  thumb-color="indigo accent-2"
                  track-color="purple lighten-3"
                  min="0"
                  max="1000"
                  label="Popularity"
                >
                  <v-text-field
                    :value="scoreValue[0]"
                  />
                  <v-text-field
                    :value="scoreValue[1]"
                  />
                </v-range-slider>
              </v-col>
            </v-row>
            <v-row
              style="background-color: rgba(0, 0, 0, 0)"
            >
              <v-col cols="1">
                <v-icon class="hidden-xs-only" right large>
                  mdi-pound-box
                </v-icon>
              </v-col>
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
                  FIND the one &nbsp;
                  <v-icon>
                    mdi-book-open-page-variant
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
    <div v-if="checker === true">
      <v-row>
        <v-col>
          <v-row>
            <v-range-slider
              v-model.lazy="filterAge"
              :thumb-size="32"
              thumb-label="always"
              track-fill-color="purple accent-4"
              thumb-color="indigo accent-2"
              track-color="purple lighten-3"
              min="18"
              max="100"
              label="Age"
            >
              <v-text-field
                :value="filterAge[0]"
              />
              <v-text-field
                :value="filterAge[1]"
              />
            </v-range-slider>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-slider
              v-model.lazy="filterDistance"
              :thumb-size="32"
              :rules="distanceRules"
              max="20000"
              thumb-label="always"
              thumb-color="deep-purple accent-3"
              label="Distance (km)"
              track-color="purple lighten-3"
              track-fill-color="purple accent-4"
            />
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-range-slider
              v-model="filterScore"
              :rules="scoreRules"
              :thumb-size="34"
              track-fill-color="purple accent-4"
              thumb-label="always"
              thumb-color="indigo accent-2"
              track-color="purple lighten-3"
              min="0"
              max="1000"
              label="Popularity"
            >
              <v-text-field
                :value="filterScore[0]"
              />
              <v-text-field
                :value="filterScore[1]"
              />
            </v-range-slider>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-text-field
              v-model.lazy="filterTags"
            />
            <v-select
              v-model.lazy="filterTags"
              :items="hobbies"
              label="Tag"
              outlined
            />
          </v-row>
        </v-col>
      </v-row>
      <v-container
        v-if="loadedUsers.profile_complete === 1 && token"
      >
        <v-carousel
          :hide-delimiters="true"
          continuous
        >
          <v-carousel-item
            v-for="(item,i) in filterAdvancedSearch(loadedAdvancedSearch)"
            :key="i"
            reverse-transition="fade-transition"
          >
            <v-card
              :hover="true"
              v-ripple="{ class: `purple--text` }"
              class="mx-auto"
              max-width="420"
            >
              <v-card-subtitle>
                <v-row justify="end">
                  Online&nbsp;
                </v-row>
                <div class="headline font-weight-bold purple--text text--accent-4">
                  {{ item.username }}
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  {{ myGender[item.gender_id - 1] }} AGE y/o
                </div>
                <div class="title font-italic purple--text text--accent-3">
                  Interested in {{ genderLF[item.interested_in - 1] }}
                </div>
                <v-row justify="end">
                  Score: SCORE&nbsp;
                </v-row>
                <v-card-text class="purple--text text--lighten-5">
                  <div>&nbsp;</div>
                  <div>{{ item.name }} {{ item.surname }}</div>
                  <div>&nbsp;</div>
                  <div>Tags: {{ item.hobbies.toString() }}</div>
                </v-card-text>
                <v-card-text class="purple--text text--lighten-5">
                  <div
                    v-if="item.location.country"
                  >
                    Country: {{ item.location.country }}
                  </div>
                  <div>City: {{ item.location.city }}</div>
                  <div
                    v-if="item.location.district"
                  >
                    District: {{ item.location.district }}
                  </div>
                  <div>
                    Distance: {{ item.distance }} km
                  </div>
                </v-card-text>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  @click="love(item.username)"
                  fab
                  color="pink lighten-3"
                  bottom
                  left
                  absolute
                  x-large
                >
                  <v-icon>mdi-cards-heart</v-icon>
                </v-btn>
                <v-btn
                  color="purple"
                  text
                />
              </v-card-actions>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      ageValue: [18, 100],
      proximity: 4200,
      scoreValue: [0, 1000],
      tags: [],
      hobbies: ['#gamer', '#surfer', '#hacker', '#starwars', '#meditation', '#42', '#geek', '#fashion', '#hipster', '#horse', '#vegan', '#meat', '#', '#coding', '#C', '#python', '#anime', '#yachting', '#matcha', '#macron'],
      myGender: ['Bi', 'Man', 'Woman'],
      genderLF: ['Men & Women', 'Men', 'Women'],
      filterAge: [18, 100],
      filterDistance: 20000,
      filterScore: [0, 1000],
      filterTags: '',
      ageRules: [
        v => !!v || 'Target age required',
        v => (v[1] < 101) || 'Target age too high',
        v => (v[0] > 17) || 'Target age minimum is 18',
        v => (/[0-9]+/.test(v[0]) && /[0-9]+/.test(v[1])) || 'Use the slider to pick a value'
      ],
      scoreRules: [
        v => !!v || 'Target popularity required',
        v => (v[1] < 1001) || 'Target popularity max too high',
        v => (v[0] >= 0) || 'Target popularity minimum is 0',
        v => (/[0-9]+/.test(v[0]) && /[0-9]+/.test(v[1])) || 'Use the slider to pick a value'
      ],
      distanceRules: [
        v => !!v || 'Target distance required',
        v => (v < 20001) || 'Distance max is 20 000 km',
        v => (v >= 0) || 'Distance minimum is 0 km',
        v => /[0-9]+/.test(v) || 'Use the slider to pick a value'
      ],
      interestedinRules: [
        v => !!v || 'Target gender required',
        v => (v > 0 && v < 4) || 'Pick one of the 3 target gender choices',
        v => /[0-9]+/.test(v) || 'Use the slider to pick a value'
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
    },
    checker () {
      return this.$store.getters.checker
    },
    loadedAdvancedSearch () {
      return this.$store.getters.loadedAdvancedSearch
    }
  },
  methods: {
    matchme () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('setChecker', false)
        axios
          .get(process.env.serverUrl + '/social/search', {
            params: {
              age: this.ageValue.toString(),
              popularity: this.scoreValue.toString(),
              distance: this.proximity,
              tags: this.tags.toString(),
              gender: this.loadedUsers.interested_in
            },
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.token
            }
          })
          .then((response) => {
            /* eslint-disable */
            console.log('response_GET_advancedSearch', response)
            this.$store.dispatch('setAdvancedSearch', response.data.client)
            this.$store.dispatch('setMessage', response.statusText)
            this.$store.dispatch('setChecker', true)
          })
          .catch((error) => {
            console.log('error_GET_advancedSearch', error)
            console.log('error_client', error.response.statusText)
            this.$store.dispatch('setMessage', error.response.statusText)
          })
      }
    },
    filterAdvancedSearch (item) {
      self = this
      return item.filter(function (item) {
        if (self.filterDistance) {
          // item.distance <= self.filterDistance && item.age >= self.filterAge[0] && item.age <= self.filterAge[1] && item.score >= self.filterScore[0] && item.score <= filterScore[1]
          return item.distance <= self.filterDistance && item.hobbies.includes(self.filterTags)// && item.age >= self.filterAge[0] && item.age <= self.filterAge[1] && item.score >= self.filterScore[0] && item.score <= filterScore[1]
          // filterTags
        }
      })
    },
    love (target) {
      // eslint-disable-next-line
      console.log('thisTEST', this)
      this.store.dispatch('setChecker', false)
      this.$axios({
        method: 'post',
        url: process.env.serverUrl + '/social/like',
        data: {
          username: target
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.token
        }
      })
        .then((response) => {
        /* eslint-disable */
          console.log('response_POST_like', response)
          console.log('response_client', response.client)
          this.$store.dispatch('setMessage', response.client)
          context.store.dispatch('setChecker', true)
        })
        .catch((error) => {
          console.log ('error_POST_like', error)
          console.log('error_client', error.response.data.client)
          this.$store.dispatch('setMessage', error.response.data.client)
        })
    }
  }
}
</script>
