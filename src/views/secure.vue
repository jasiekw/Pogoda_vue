<template>
    <div id="secure">
        <h4>Choose a city</h4> 
            <div class="vue_select">
            <multiselect v-model="value" tag-placeholder="" placeholder="Choose a city from below:" 
            label="name" track-by="name" :limit="20" :options="options" :options-limit="300" :local-search="false" :multiple="true" :taggable="true" @tag="addTag" @input="addCookie"></multiselect>
        </div>  
        <br>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col"> city </th>
                    <th scope="col"> temperature °C </th>
                    <th scope="col"> humidity % </th>
                    <th scope="col"> time-chart </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="city in info" :key="city.id">
                    <th scope="row"> {{city.name}}</th>
                    <td v-if="value"> {{city.main.temp | round}} °C </td>
                    <td v-if="value"> {{city.main.humidity}} % </td>
                    <td ><router-link :to="{ name: 'detail', params: { city_id: city.id }}"><button class="btn btn-outline-success">more</button></router-link></td>
                </tr>
            </tbody>
        </table>
       <button class="btn btn-success" onClick="window.location.reload();">refresh</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Multiselect from 'vue-multiselect';
    import Axios from 'axios';
    import json from '../components/miasta/city_list.json';

    let VueCookie = require('vue-cookie');

    Vue.use(VueCookie);
  
    Vue.component('multiselect', Multiselect)

    export default {
        name: 'Secure',
        data() {
            return {};
        },

        components: { Multiselect },
        data () {
            return {
                value: [],
                options: json,
                isLoading: false,
                info: []
            }
        },

        mounted() {

            this.start_f()

            setInterval(() => {

                this.apiGet();

                }, 60000);

            },
        methods: {
            name ({name}) {
                return `$name`
            },
            addCookie () {
                this.$cookie.set('cities', JSON.stringify(this.value));
            },
            addTag (newTag) {
                const tag = {
                name: newTag.name,
                id: newTag,
                }
                this.options.push(tag)
            },
            apiGet() {           
                if (this.value.length > 20) {
                    this.value.length = 20
                };
                
                this.ids = '';

                for (let i=0; i<this.value.length; i++){
                    this.ids += ','+this.value[i].id
                };

                this.ids = this.ids.substring(1, );

                Axios
                    .get('https://api.openweathermap.org/data/2.5/group?id='+ this.ids +'&units=metric&lang=pl&APPID=bbf2fe3977d6aced331100d4a140d137')
                    .then( (response) => {
                            this.info = response.data.list;
                        }
                    )
            },

            start_f(){

                this.value = JSON.parse(this.$cookie.get('cities'));

                this.apiGet();

               

            }
        },
        filters: {
            round: function (value) {
                return Math.round( value * 10 ) / 10;
            }
        }
    }

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    #secure {
        width:auto;
        height:auto;
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
        background-image: linear-gradient(rgb(255, 255, 255),rgb(236, 236, 236));
    }
    .vue_select {
        margin-top:50px;
    }
    .selected { 
        color: green;
        font-size:19px;
    }
    .cities{
        padding-top: 40px;
        margin:auto;
    }
    tr{
        text-align: center;
    }

</style>