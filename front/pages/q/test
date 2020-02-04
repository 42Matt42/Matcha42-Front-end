<template>
  <div id="top">
    <label>
      Url to be fetched (example: <a href="https://matcha42saubinbartol.herokuapp.com/user">slash user</a>)
      <input type="url" id="url" value="">
    </label>
    <label>
      If using POST, enter the data:
      <input type="text" id="data">
    </label>
    <label>
      <button id="get">GET</button><button id="post">POST</button>
    </label>
    <div>
    <textarea id="output"></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      )
    }
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      user: null
    }
  },
  computed: {
    loadedUsers () {
      return this.$store.getters.loadedUsers
    },
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    gettest () {
      (function() {
        var urlField = document.getElementById('url');
        var dataField = document.getElementById('data');
        var outputField = document.getElementById('output');
        document.getElementById('get').onclick =
        document.getElementById('post').onclick = function(e) {
          e.preventDefault();
          doCORSRequest({
            method: this.id === 'post' ? 'POST' : 'GET',
            url: urlField.value,
            data: dataField.value
          }, function printResult(result) {
            outputField.value = result;
          });
        }
      })
      if (typeof console === 'object') {
        console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
        console.log('cors_api_url = "http://localhost:8080/"');
      }
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

