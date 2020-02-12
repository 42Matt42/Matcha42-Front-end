<template>
  <div>
    pop-up:<br>
    {{ serverMessage }}
    <br><br>
    <v-container
      class="font-weight-black"
    >
      Update your pictures<br>
    </v-container>
    <div>
      <div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
            <br><br>
            <v-row>
              <v-file-input
                id="testbro"
                :rules="mypicsRules"
                accept="image/*"
                enctype="multipart/form-data"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 1"
                label="Picture 1"
                truncate-length="42"
              />
            </v-row>
            <v-row>
              <v-file-input
                :rules="mypicsRules"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 2"
                label="Ppicture 2"
              />
            </v-row>
            <v-row>
              <v-file-input
                :rules="mypicsRules"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 3"
                label="Picture 3"
              />
            </v-row>
            <v-row>
              <v-file-input
                :rules="mypicsRules"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 4"
                label="Picture 4"
              />
            </v-row>
            <v-row>
              <v-file-input
                :rules="mypicsRules"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 5"
                label="Picture 5"
              />
            </v-row>
            <v-row>
              <v-col
                cols="3"
              >
                <v-text-field
                  v-model="loadedUsers.location"
                  label="Location"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="3"
              >
                <v-text-field
                  v-model="loadedUsers.notification"
                  label="Notification"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row>
          <v-col cols="9" sm="6" offset-sm="3">
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`https://picsum.photos/500/300?image=777`"
                        aspect-ratio="1"
                        class="purple darken-4"
                      />
                      <v-card-actions>
                        <v-btn
                          @click="upload = !upload"
                          icon
                        >
                          <v-icon>{{ upload ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="n in 4"
                    :key="n"
                    class="d-flex child-flex"
                    cols="3"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 69}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 69}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular indeterminate color="purple darken-4" />
                          </v-row>
                        </template>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col
                    v-for="n in 4"
                    :key="n"
                    class="d-flex child-flex"
                    cols="3"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 69}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 69}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular indeterminate color="purple darken-4"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-card>
          </v-col>
        </v-row>
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
      mypicsRules: [
        value => !value || value.size < 10000000 || 'Picture size should be less than 10 MB!'
      ],
      loadedPics: {
        mypics1: '',
        mypics2: '',
        mypics3: '',
        mypics4: '',
        mypics5: ''
        // to add in the file inpu fields when the server is up:
        // v-model="loadedPics.mypics1" etc.
      },
      upload: 'false'
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
    validate () {
      if (this.$refs.form.validate()) {
        /* eslint-disable */
        console.log('store', this.$store)
        this.$axios ({
          method: 'post',
          url: process.env.serverUrl + '/users/upload',
          data: {
            mypics1: this.loadedPics.mypics1,
            mypics2: this.loadedPics.mypics2,
            mypics3: this.loadedPics.mypics3,
            mypics4: this.loadedPics.mypics4,
            mypics5: this.loadedPics.mypics5,
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token,
          }
        })
          .then((response) => {
          /* eslint-disable */
            console.log('response_axios_mypics', response)
            console.log('response_client', response.client)
            this.$store.dispatch('setMessage', response.client)
          })
          .catch((error) => {
            console.log ('error_axios_mypics', error)
            console.log('error_client', error.response.data.client)
            this.$store.dispatch('setMessage', error.response.data.client)
          })
        this.$router.push('/login/mypics')
      }
    }
  }
  // async asyncData (context) {
  //   const usermypics = await axios
  //     .get(process.env.serverUrl + '/users/mypics', {
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters.token
  //       }
  //     })
  //     .then((response) => {
  //       /* eslint-disable */
  //       console.log('response_async_mypics', response)
  //       context.store.dispatch('setUserData', response.data.userdata)
  //       context.store.dispatch('setMessage', response.client)
  //     })
  //     .catch((error) => {
  //       console.log('error_async_mypics', error)
  //       console.log('error_client', error.response.data.client)
  //       context.store.dispatch('setMessage', error.response.data.client)
  //     })
  //   return {
  //     usermypics
  //   }
  // }
}
</script>
