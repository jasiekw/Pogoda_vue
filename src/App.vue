<template>
    <div id="app">
        <div id="nav">
            <router-link class="logout btn btn-outline-dark" v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
    var Vue = require('vue');

    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "admin",
                    password: "admin"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
                this.$session.destroy()
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    body {
        background-color: rgb(255, 255, 255);
    }
    #app {
        width: 1024px;
        margin: auto;
        padding-top: 100px;
    }
    .logout{
      margin-right: 20px;
      margin-top: 30px;
      float:right;
      color: black;
    }
</style>