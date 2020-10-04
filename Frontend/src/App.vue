<template>
  <div class="columns is-marginless">
    <div class="column is-one-fifth-desktop file-manager">
      <h1 class="is-size-4">Spark <span class="is-size-6"> | web based code editor </span></h1>
      <div class="container px-1 py-4">
        <p v-for="item in 20" :key="item">
          hello {{ item }}
        </p>
      </div>
    </div>
    <div class="column is-two-fifths-desktop editor is-paddingless">
      <div class="container level-right px-2 py-2">
        <run-btn @click="fetchResult"></run-btn>
      </div>
      <div class="container is-paddingless">
        <editor @codeUpdated="run($event)"></editor>
      </div>
    </div>
    <div class="column is-two-fifths-desktop console">
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
import editor from "@/components/editor";
import runBtn from "@/components/runBtn";

import '@/assets/styles/console.css'
import '@/assets/styles/fileManager.css'
import '@/assets/styles/editor.css'


export default {
  name: 'App',
  components: {
    editor,
    runBtn
  },
  data: () => ({
    code: 'log',
    result: ''
  }),
  methods: {
    run(str){
      this.code = str
    },
    fetchResult(){
      console.log('clicked')
      console.log('clicked')
      fetch('http://localhost:3000/', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: this.code
        })
      }).then(res=> {return res.json()})
          .then(res => {
            console.log(res.result)
            this.result = res.result
          });
    }
  }
}
</script>