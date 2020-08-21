const NotfoundComponent = {
	template: '<h1>Not found</h1>'
};

const HomeComponent = {
	template: `
  <div>
    <h1>Home</h1>
    <div v-if="getLiffInfo()">
      <div v-for="infoKey in Object.keys(getLiffInfo())" :key="infoKey">{{ infoKey }}: {{ getLiffInfo[infoKey] }}</div><br>
    </div>
  </div>
  `,
  methods: {
    getLiffInfo() {
      return window.liffInfo
    },
  },
};

const WeatherComponent = {
	template: `
  <div>
    <h1>Weather</h1>
    <div v-if="weatherInfo">
      <div>IP {{ weatherInfo['ip'] }}</div><br>
      <div>Estimated GPS (latitude, longitude): ({{ weatherInfo['cwbcurrent']['lat'] }}, {{ weatherInfo['cwbcurrent']['lon'] }})</div><br>
      <div v-for="element in weatherInfo['cwbcurrent']['weatherElement']">
        <div v-if="element.elementName == 'TEMP'">
          溫度: {{ element.elementValue.value }}
        </div>
        <div v-if="element.elementName == 'HUMD'">
          濕度: {{ element.elementValue.value }}
        </div>
        <div v-if="element.elementName == 'PRES'">
          氣壓: {{ element.elementValue.value }}百帕
        </div>
        <div v-if="element.elementName == 'WDSD'">
          風速: {{ element.elementValue.value }}m/s
        </div>
        <div v-if="element.elementName == 'H_UVI'">
          紫外線UVI: {{ element.elementValue.value }}
        </div>
        <div v-if="element.elementName == '24R'">
          雨量: {{ element.elementValue.value }}mm/day
        </div>
      </div>

      <br>
      <br>
      <div>
        地點: {{ weatherInfo['cwbcurrent']['locationName'] }}<br>
        時間: {{ weatherInfo['cwbcurrent']['time']['obsTime'] }}<br>
      </div>
    </div>
    <div v-else>
      No Data
    </div>
  </div>
  `,
  data: function () {
    return {
      weatherInfo: null,
    };
  },
  methods: {

  },
  async created() {
    await fetch("https://iptoweather.vm5apis.com/")
    .then((response) => response.json() )
    .then((info) => {
      this.weatherInfo = info
    })
    ;
  },
};

const routes = [
	{
  	path: '/',
  	component: HomeComponent
  },
  {
  	path: '/weather',
  	component: WeatherComponent
  },
  {
  	path: '*',
    component: NotfoundComponent
  }
];

const router = new VueRouter({
	routes
});

var vueInstance;

function initVue() {
  if (vueInstance) {
    return;
  }

  vueInstance = new Vue({
  	el: '#vue-app',
  	router
  });
}
