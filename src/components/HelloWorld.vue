<template>
  <div class="main">
    <h1>List of facts</h1>
    <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Measurement
              </th>
              <th class="text-left">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, name) in vm.messages"
              :key="name"
            >
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
  </div>
</template>

<script>
import Vue from 'vue'

let sseClient;

var vm = new Vue({
  data: {
    messages: {
        "hum": "",
        "temp": "",
        "co": ""
    }
  }
})
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      vm
    }
  },
  mounted() {
    sseClient = this.$sse.create({
        url: 'http://localhost:3000/events',
        format: 'json',
        polyfill: true,
      });
      sseClient.on('message', this.handleMessage);
      sseClient.connect()
      .then(sse => {
        console.log('We\'re connected! SSe ', sse);
      })
      .catch((err) => {
        console.error('Failed to connect to server', err);
      });
  },
  methods: {
    handleMessage(message) {
      console.log("message is ",message);
      if('hum' in message){
        console.log("HUM");
        vm.$set(vm.messages, 'hum', message['hum'])
        // this.messages['hum'] = message['hum'];
      }
      if('temp' in message){
        console.log("TEMP");
        vm.$set(vm.messages, 'temp', message['temp'])
        // this.messages['temp'] = message['temp'];
        // console.log(this.messages);
      }
      if('co' in message){
        console.log("CO");
        vm.$set(vm.messages, 'co', message['co'])
        // this.messages['co'] = message['co'];
        // console.log(this.messages);
      }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin-left: 20px;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
