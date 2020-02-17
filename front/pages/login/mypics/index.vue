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
                @change="displayImage(uploadPics.mypics1, 0)"
                :rules="mypicsRules"
                v-model="uploadPics.mypics1"
                accept="image/*"
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
                @change="displayImage(uploadPics.mypics2, 1)"
                :rules="mypicsRules"
                v-model="uploadPics.mypics2"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 2"
                label="Picture 2"
                truncate-length="42"
              />
            </v-row>
            <v-row>
              <v-file-input
                @change="displayImage(uploadPics.mypics3, 2)"
                :rules="mypicsRules"
                v-model="uploadPics.mypics3"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 3"
                label="Picture 3"
                truncate-length="42"
              />
            </v-row>
            <v-row>
              <v-file-input
                @change="displayImage(uploadPics.mypics4, 3)"
                :rules="mypicsRules"
                v-model="uploadPics.mypics4"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 4"
                label="Picture 4"
                truncate-length="42"
              />
            </v-row>
            <v-row>
              <v-file-input
                @change="displayImage(uploadPics.mypics5, 4)"
                :rules="mypicsRules"
                v-model="uploadPics.mypics5"
                accept="image/*"
                counter
                show-size
                filled
                prepend-icon="mdi-camera"
                placeholder="Picture 5"
                label="Picture 5"
                truncate-length="42"
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
        <v-card
          :hover="true"
          v-ripple="{ class: `purple--text` }"
          class="mx-auto"
          max-width="434"
        >
          <v-img
            :src="`data:image/*;base64,${showPictures[1]}`"
            aspect-ratio="2"
            class="spacer purple lighten-4"
            no-gutters
          >
            <v-row
              align="end"
              class="fill-height"
            >
              <v-col
                align-self="start"
                class="pa-0"
                cols="12"
              >
                <v-avatar
                  class="profile purple purple darken-1"
                  size="164"
                >
                  <v-img
                    :src="`data:image/*;base64,${showPictures[0]}`"
                  />
                </v-avatar>
              </v-col>
            </v-row>
          </v-img>
          <v-card-subtitle
            class="headline font-weight-bold purple--text text--accent-4 red lighten-5"
          >
            {{ loadedUsers.username }}
          </v-card-subtitle>
          <v-card-subtitle
            class="title font-italic purple--text text--accent-3 red lighten-5"
          >
            {{ loadedUsers.gender_id }}, {{ loadedUsers.birth_date }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>&nbsp;</div>
            <div>Ville/Arrondissement</div>
            <div>Autre</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="pink"
              text
            >
              Like
            </v-btn>
            <v-btn
              color="pink"
              text
            >
              Follow
            </v-btn>
          </v-card-actions>
        </v-card>
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
                        :src="`data:image/*;base64,${showPictures[2]}`"
                        aspect-ratio="1"
                        class="purple lighten-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`data:image/*;base64,${showPictures[3]}`"
                        aspect-ratio="1"
                        class="purple lighten-4"
                        alt=""
                      />
                    </v-card>
                  </v-col>
                  <v-col
                    class="d-flex child-flex"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="`data:image/*;base64,${showPictures[4]}`"
                        aspect-ratio="1"
                        class="purple lighten-4"
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
import axios from 'axios'

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      mypicsRules: [
        // value => value.size < 10000000 || 'Picture size should be less than 10 MB!'
      ],
      uploadPics: {
        mypics1: null,
        mypics2: null,
        mypics3: null,
        mypics4: null,
        mypics5: null
      },
      upload: 'false',
      imgone: '',
      showPictures: {
        '0': '', // || this.loadedPictures[0],
        '1': '', // || this.loadedPictures[1],
        '2': '', // || this.loadedPictures[2],
        '3': '', // || this.loadedPictures[3],
        '4': '' // || this.loadedPictures[4]
      }
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
    loadedPictures () {
      return this.$store.getters.loadedPictures
    }
  },
  async asyncData (context) {
    const usermypics = await axios
      .get(process.env.serverUrl + '/users/photos', {
        headers: {
          Authorization: 'Bearer ' + context.app.store.getters.token
        }
      })
      .then((response) => {
        /* eslint-disable */
        console.log('GET response_async_mypics', response)
        context.store.dispatch('setPictures', response.data.client)
        context.store.dispatch('setMessage', response.statusText)
      })
      .catch((error) => {
        console.log('GET error_async_mypics', error)
        // TO TEST
        // console.log('GET error_client', error.response.data.client)
        // context.store.dispatch('setMessage', error.response.data.client)
      })
    return {
      usermypics
    }
  },
  methods: {
    displayImage (File, number) {
      // console.log('this.refs:', this.$refs)
      if (!File) {
        return
      }// {this.alert = "No File Chosen"}
      // eslint-disable-next-line
      console.log('number:', number)
      let renamed = ''
      const reader = new FileReader()
      reader.readAsDataURL(File)
      reader.onload = () => {
        // this.$store.dispatch('setOnePicture', reader.result) //, number)
        renamed = reader.result.split(';base64,')
        this.showPictures[number] = renamed[1]
        // eslint-disable-next-line
        // console.log('this.showPictures. + number:', this.$store.getters.showPictures[number])
        // eslint-disable-next-line
        console.log('this.showPictures. + number:', this.showPictures[number])
      }
    },
    validate () {
      if (this.$refs.mypicsform.validate()) {
        const data = new FormData()
        // this.uploadPics.forEach(mypics => {
        //   data.append('image', mypics)
        // })
        if (this.uploadPics.mypics1) {
          data.append('images', this.uploadPics.mypics1, 1)
        }
        if (this.uploadPics.mypics2) {
          data.append('images', this.uploadPics.mypics2, 2)
        }
        if (this.uploadPics.mypics3) {
          data.append('images', this.uploadPics.mypics3, 3)
        }
        if (this.uploadPics.mypics4) {
          data.append('images', this.uploadPics.mypics4, 4)
        }
        if (this.uploadPics.mypics5) {
          data.append('images', this.uploadPics.mypics5, 5)
        }
        const xhr = new XMLHttpRequest()
        xhr.withCredentials = true
        const self = this
        // Returns an unsigned short, the state of the request.
        xhr.addEventListener('readystatechange', function () {
          // 4 means the request is DONE, operation completed
          if (this.readyState === 4) {
            // eslint-disable-next-line
            console.log('this.status', this.status)
            // eslint-disable-next-line
            console.log('this.responseText', this.responseText)
            // eslint-disable-next-line
            console.log('this.responseText.client', this.responseText.client)
            // eslint-disable-next-line
            console.log('self.$store', self.$store)
            self.$store.dispatch('setMessage', this.responseText.client)
          }
        })
        xhr.open('POST', process.env.serverUrl + '/users/upload')
        // xhr.open('POST', '/t/bd05h-1581710318/post')
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.$store.getters.token)
        xhr.setRequestHeader('Accept', '*/*')
        xhr.setRequestHeader('Cache-Control', 'no-cache')
        xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate')
        xhr.setRequestHeader('Connection', 'keep-alive')
        xhr.send(data)
      }
      this.$router.push('/login/mypics')
    }
  }
}
</script>
