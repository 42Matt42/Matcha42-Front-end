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
          id="myForm"
          ref="mypicsform"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <br><br>
            <v-row>
              <v-file-input
                @change="displayImage(loadedPics.mypics1, 'one')"
                :rules="mypicsRules"
                v-model="loadedPics.mypics1"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 1"
                label="Picture 1"
                truncate-length="42"
                enctype="multipart/form-data"
              />
            </v-row>
            <v-row>
              <v-file-input
                @change="displayImage(loadedPics.mypics2, 'two')"
                :rules="mypicsRules"
                v-model="loadedPics.mypics2"
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
                @change="displayImage(loadedPics.mypics3, 'three')"
                :rules="mypicsRules"
                v-model="loadedPics.mypics3"
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
                @change="displayImage(loadedPics.mypics4, 'four')"
                :rules="mypicsRules"
                v-model="loadedPics.mypics4"
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
                @change="displayImage(loadedPics.mypics5, 'five')"
                :rules="mypicsRules"
                v-model="loadedPics.mypics5"
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
                        :src="`${imgone}`"
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
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`${imgtwo}`"
                        :lazy-src="`${imgtwo}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`${imgthree}`"
                        :lazy-src="`${imgthree}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`${imgfour}`"
                        :lazy-src="`${imgfour}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`${imgfive}`"
                        :lazy-src="`${imgfive}`"
                        aspect-ratio="1"
                        class="purple darken-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                </v-row>
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
        // value => value.size < 10000000 || 'Picture size should be less than 10 MB!'
      ],
      loadedPics: {
        mypics1: null,
        mypics2: null,
        mypics3: null,
        mypics4: null,
        mypics5: null
      },
      upload: 'false',
      imgone: '',
      imgtwo: '',
      imgthree: '',
      imgfour: '',
      imgfive: ''
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
      if (this.$refs.mypicsform.validate()) {
        /* eslint-disable */
        console.log('this.loadedPics.mypics1', this.loadedPics.mypics1)
        if (this.loadedPics.mypics1) {
          // let imageURL = URL.createObjectURL(this.loadedPics.mypics1)
          // this.createImage(files[0])
          // var image = new Image()
          // console.log('createImage', image)
          }
        }
        this.$axios ({
          method: 'post',
          // url: process.env.serverUrl + '/users/upload',
          url: '/t/bd05h-1581710318/post',
          data: {
            image1: this.imgone,
            image2: this.imgtwo,
            image3: this.imgthree,
            image4: this.imgfour,
            image5: this.imgfive
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token,
            'Content-Type': 'multipart/form-data'
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
    },
    displayImage(File, number) {
      // console.log('this.refs:', this.$refs)
      if (!File) {
        return
      }// {this.alert = "No File Chosen"}
      console.log('number:', number)
      var reader = new FileReader()
      reader.readAsDataURL(File)
      reader.onload = () => {
        this["img"+number] = reader.result
      console.log('this.img+number:', this["img"+number])
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
