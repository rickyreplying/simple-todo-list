<template>
  <div class="container-lg mt-5">
    <div class="bg-light p-5 rounded">
      <h3>Task Name : {{this.todos.title}} </h3>
      <h5>Status : {{this.todos.status}} </h5>
      <p class="lead">Description : {{this.todos.description }}</p>

      <router-link to="/home">
        <a class="btn btn btn-secondary" role="button">Back to Home</a>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    data() {
      return {
        todos: [],
      }
    },
  
    mounted() {
      this.load();
    },


    methods: {

      async load() {
        try {
          const res = await axios.get('http://localhost:4000/todos/' + this.$route.params.id);
          this.todos = res.data
        } catch (err) {
          console.log(err);
        }
      },
      // load() {
      //   axios.get('http://localhost:4000/todos/' + this.$route.params.id).then(res => {
      //     this.todos = res.data

      //     console.log(this.todos);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      // },

    }

  }
</script>