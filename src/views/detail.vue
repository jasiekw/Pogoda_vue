<template>
   <div id="secure">
       <router-link :to="{ name: 'secure'}"><button class="btn btn-outline-secondary">Back</button></router-link>
        <div class="c_name">{{city}}</div>
        <div class="chart">
            <canvas id="MyChart"></canvas>
        </div>    
   </div>
</template>

<script>
    import Vue from 'vue';
    import Multiselect from 'vue-multiselect';
    import Axios from 'axios';
    import json from '../components/miasta/city_list.json';
    import Chart from 'chart.js';

    export default {
        name: 'detail',
        props : ['city_id'],
        data() {
            return {
              
            };
        },
        
        components: { Multiselect },
        data () {
            return {
                chart: [],
                city: [],
                dates: [],
                temps: [],
                humi: []
            }
        },
        mounted() {

            Axios
                    .get('https://api.openweathermap.org/data/2.5/forecast?id='+ this.city_id +'&units=metric&lang=pl&APPID=bbf2fe3977d6aced331100d4a140d137')
                    .then( (response) => {

                            this.city = response.data.city.name,
                            this.dates = response.data.list.map(list => {
                                    return list.dt_txt;
                                });
                            this.temps = response.data.list.map(list => {
                                    return list.main.temp;
                            });
                            this.humi = response.data.list.map(list => {
                                    return list.main.humidity;
                            });

                            this.chartInit();
                        }
                    )

           
        },
    
        methods: {

            chartInit() {

            var ctx = document.getElementById("MyChart");
            this.chart = new Chart(ctx, {
            type: 'bar',
                data: {
                    datasets: [{
                        label: 'Humidity',
                        yAxisID: 'right',
                        backgroundColor: "rgba(145, 187, 255, 0.6)",
                        data: this.humi,
                    }, {
                        label: 'Temperature',
                        yAxisID: 'left',
                        backgroundColor: "rgba(247, 182, 61, 0.6)",
                        data: this.temps,
                        type: 'line'
                    }],
                    labels: this.dates,
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    },
                    tooltips: {
                        callbacks: {
                        label: function(tooltipItem, data) {
                            var label =
                            data.datasets[tooltipItem.datasetIndex].label || "";

                            if (label) {
                            label += ": ";
                            }

                            label += Math.floor(tooltipItem.yLabel);
                            return label ;
                        }
                        }
                    },
                    scales: {
                        xAxes: [
                        {
                            type: "time",
                            time: {
                            unit: "hour",
                            tooltipFormat: 'DD-MM-YYYY HH:mm',
                            displayFormats: {
                                hour: "DD-MMM HH:00",
                            },
                            },
                            scaleLabel: {
                            display: true,
                            labelString: "Date/Time"
                            }
                        }
                        ],
                        yAxes: [
                        {
                            id: "left",
                            position: 'left',
                            scaleLabel: {
                            display: true,
                            labelString: "Temperature (°C)"
                            },
                            ticks: {
                            callback: function(value) {
                                return value + "°C";
                            }
                            }
                        },
                        {
                            id: "right",
                            position:"right",
                            scaleLabel: {
                            display: true,
                            labelString: "Humidity (%)"
                            },
                            ticks: {
                            callback: function(value) {
                                return value + "%";
                            }
                            }
                        }    
                        ]
                    }
                    }
            });
            },

        },

        filters: {
            round: function (value) {
                return Math.round( value * 10 ) / 10;
            }
        }

    }

</script>

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
    .c_name{
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        margin-top: 10px;
    }
    
</style>