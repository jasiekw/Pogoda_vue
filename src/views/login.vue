<template>
    
    <div class="login_form">
        <div id="login">
            <flash-message class="myCustomClass"></flash-message>  
            <div class="a"><input type="text" name="username" v-model="input.username" placeholder="Username" /></div>
            <div class="a"><input type="password" name="password" v-model="input.password" placeholder="Password" v-on:keyup.13="login()"/></div>
            <button type="button" class="a btn btn-success" v-on:click="login()">Login</button>        
        </div>
    </div>
</template>

<script>
import VueSession from 'vue-session';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage);

Vue.use(VueSession)

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        mounted() {
            
            if (this.$session.exists()) {
                    this.$emit("authenticated", true);
                    this.$router.push({name:"secure"});
                }
        },

        methods: {
            login() {
                if (this.input.username != "" && this.input.password != "") 
                    {
                        if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                            this.$emit("authenticated", true);
                            this.$router.replace({ name: "secure" });
                            this.$session.start()
                    } else {

                        this.flashError('Błędny login / hasło', {timeout: 2000});
                    }
                 }
            }
        }
    }


</script>

<style scoped>
    #login {
        text-align: center;
        width: 200px;
        height: 300px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin-top: 100px;
        margin: auto;
        box-shadow: 3px 3px 11px #707070;
    }
    .login_form{
        margin-top:100px;
    }
    .a{
        justify-content: center;
        margin-top: 40px;
    }
</style>