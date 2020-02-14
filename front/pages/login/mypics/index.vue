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
      <v-content>
        <v-container>
          <v-row justify="center">
            <v-col cols="auto">
              <v-card width="600" height="300" raised>
                <v-card-title>Vuetify v-file-input Example:</v-card-title>
                <br>
                <v-card-text>
                  <v-file-input
                    id="myone"
                    :rules="mypicsRules"
                    v-model="chosenFile"
                    accept="image/*"
                    counter
                    show-size
                    filled
                    prepend-icon="mdi-camera"
                    placeholder="Picture 1"
                    label="Picture 1"
                    truncate-length="42"
                    type="file"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="displayImage"
                    right
                  >
                    Read File
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-card width="600" height="300" raised>
                <v-card-title>File contents:</v-card-title>
                <img :src="lastone" alt="">
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
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
                id="myone"
                @change="onFileChange"
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
    <img :src="image"></img>
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
        // to add in the file inpu fields when the server is up:
        // v-model="loadedPics.mypics1" etc.
      },
      upload: 'false',
      file: null,
      imageUrl: null,
      chosenFile: null, // <- initialize the v-model prop
      lastone: null,
      image: ''
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
        console.log('store', this.$store)
        console.log('this.loadedPics.mypics1', this.loadedPics.mypics1)
        if (this.loadedPics.mypics1) {
          // let myForm = document.getElementById('myform')
          // console.log('myForm', myForm)
          let yoo = new FormData()
          // yoo.append('yoo', this.loadedPics.mypics1, this.loadedPics.mypics1.name)
          // yoo.append('yoo', 'foo bar')
          let imageURL = URL.createObjectURL(this.loadedPics.mypics1)
          yoo.append('image', this.loadedPics.mypics1)
          console.log('yoo', yoo)
          var files = this.loadedPics.mypics1
          console.log('onFileChange', files)
          if (!files.size)
            return
          this.createImage(files[0])
          console.log('imageCreated')
          var image = new Image()
          console.log('createImage', image)
          var reader = new FileReader()
          var vm = this
          reader.onload = (e) => {
            vm.image = this.loadedPics.mypics1.result
          }
          reader.readAsDataURL(file)
        }
        this.$axios ({
          method: 'post',
          // url: process.env.serverUrl + '/users/upload',
          url: '/t/bd05h-1581710318/post',
          data: this.yoo,
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
      }
    },
    displayImage() {
      if (!this.chosenFile) {this.lastone = "No File Chosen"}
      var reader = new FileReader()
      reader.readAsDataURL(this.chosenFile)
      reader.onload = () => {
        this.lastone = reader.result
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
