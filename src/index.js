import apiData from './api/apiData';
import '@fortawesome/fontawesome-free/js/all'
import './css/index.scss';
import template from './template';
import moment from 'moment';
import Chart from 'chart.js';

const app = document.getElementById('app');

app.innerHTML = template;

/**
 * The Daily Cases Element to draw the `newDailyCasesChart` Chart.
 * @type {HTMLElement}
 */
let dailyCases = document.getElementById('newDailyCases').getContext('2d');
/**
 * The Accumulated Daily Cases Element to draw the `accumulatedDailyCasesChart` Chart.
 * @type {HTMLElement}
 */
let accDailyCases = document.getElementById('accDailyCases').getContext('2d');
/**
 * The Daily Deaths Element to draw the `dailyDeaths` Chart.
 * @type {HTMLElement}
 */
let dailyDeaths = document.getElementById('dailyDeaths').getContext('2d');
/**
 * The `confirmedTotalLabel` element to write the total confirmed cases.
 * @type {HTMLElement}
 */
let confirmedTotalLabel = document.getElementById('confirmedTotal');
/**
 * The New Daily Cases.
 * @type {Array}
 */
let newDailyCases = [];
/**
 * The New Daily Deaths.
 * @type {Array}
 */
let newDailyDeaths = [];
/**
 * The Total Confirmed Cases.
 * @type {Number}
 */
let confirmedTotal = 0;
/**
 * On init, use the `apiData` to generate the formatted `newDailyCases` array.
 */
for (let i = 0; i < apiData.length; i++) {
  newDailyCases.push(apiData[i].newCases);
  newDailyDeaths.push(apiData[i].deaths);
};
/**
 * The formatted ready to use new daily cases data.
 * @type {Array}
 */
let newDailyCasesData = generateData(newDailyCases, newDailyCases.length);
/**
 * The formatted ready to use accumulated daily cases data.
 * @type {Array}
 */
let accumulatedDailyData = generateAccumulatedData(newDailyCases, newDailyCases.length);
/**
 * The formatted ready to use accumulated daily deaths data.
 * @type {Array}
 */
let dailyDeathsData = generateData(newDailyDeaths, newDailyCases.length);
/**
 * Write the total confirmed cases within the HTML Element.
 */
confirmedTotalLabel.innerHTML = sumDailyTotals(newDailyCases);

/**
 * Generates an array of formatted data to use in the daily cases charts.
 *
 * @param {Array}  data          The data to use in the Chart.
 * @param {Number} numberOfDays  The number of days to use in x axis.
 *
 * @return {Array}
 */
function generateData(data, numberOfDays) {
  let result = [];
  for (let i = 0; i < numberOfDays; i++){
    const x = moment('March 5 2020', "MMMM DD YYYY" ).add(i, 'days');
    result.push({
      x,
      y: data[i],
    })
  }
  return result;
}
/**
 * Generates accumulated formatted data to use in the accumulative chart.
 *
 * @param {Array}  data          The data to use in the Chart.
 * @param {Number} numberOfDays  The number of days to use in x axis.
 *
 * @return {Array}
 */
function generateAccumulatedData(data, numberOfDays) {
  let result = [];
  data.reduce((acc, amount, i) => result[i] = acc + amount, 0);
  return generateData(result, numberOfDays);
}
/**
 * Generates accumulated formatted data to use in the accumulative chart.
 *
 * @param {Array} newDailyCases  The data of new daily confirmed cases.
 *
 * @return {Number}
 */
function sumDailyTotals(newDailyCases) {
  for (let i = 0; i < newDailyCases.length; i++) {
    confirmedTotal = confirmedTotal + newDailyCases[i];
  }
  return confirmedTotal;
}

/**
 * The Chart for New Daily Cases.
 */
var newDailyCasesChart = new Chart(dailyCases, {
  type: 'line',
  data: {
    datasets: [{
      label: '# of New Cases',
      data: newDailyCasesData,
      backgroundColor: [
        'rgba(238, 184, 104, 1)',
      ],
      borderWidth: 0,
    }]
  },
  options: {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          },
      }],
      xAxes: [{
          type: 'time',
          time: {
              unit: 'day'
          }
      }],
    },
  },
});

/**
 * The Chart for Accumulated Daily Cases.
 */
var accumulatedDailyCasesChart = new Chart(accDailyCases, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Accumulated Daily Cases',
      data: accumulatedDailyData,
      backgroundColor: [
        'rgba(100, 235, 104, 1)',
      ],
      borderWidth: 0,
    }]
  },
  options: {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          },
      }],
      xAxes: [{
          type: 'time',
          time: {
              unit: 'day'
          }
      }],
    },
  },
});

/**
 * The Chart for Daily Deaths.
 */
var dailyDeathsChart = new Chart(dailyDeaths, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Daily Deaths',
      data: dailyDeathsData,
      backgroundColor: [
        'red',
      ],
      borderWidth: 0,
    }]
  },
  options: {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          },
      }],
      xAxes: [{
          type: 'time',
          time: {
              unit: 'day'
          }
      }],
    },
  },
});
