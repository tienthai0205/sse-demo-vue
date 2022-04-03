<template>
  <div class="main">
    <h1>List of facts</h1>
    <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Info
              </th>
              <th class="text-left">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in messages"
              :key="item.id"
            >
              <td>{{ item.info }}</td>
              <td>{{ item.source }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
  </div>
</template>

<script>
let sseClient;

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      messages: []
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
      if(Array.isArray(message)){
        this.messages = message;
      } else {
        this.messages.push(message);
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
