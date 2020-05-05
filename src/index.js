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
 * The `recoveredTotalLabel` element to write the total recovered cases.
 * @type {HTMLElement}
 */
let recoveredTotalLabel = document.getElementById('recoveredTotal');
/**
 * The `activeTotalLabel` element to write the total recovered cases.
 * @type {HTMLElement}
 */
let activeTotalLabel = document.getElementById('activeTotal');
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
 * The recovered Cases.
 * @type {Array}
 */
let recoveredCases = [];
/**
 * The active Cases.
 * @type {Array}
 */
let activeCases = [];
/**
 * The Total Confirmed Cases.
 * @type {Number}
 */
let confirmedTotal = 0;
/**
 * The Total Recovered Cases.
 * @type {Number}
 */
let recoveredTotal = 0;
/**
 * The Total Active Cases.
 * @type {Number}
 */
let activeTotal = 0;
/**
 * On init, use the `apiData` to generate the formatted `newDailyCases` array.
 */
for (let i = 0; i < apiData.length; i++) {
  newDailyCases.push(apiData[i].newCases);
  newDailyDeaths.push(apiData[i].deaths);
  recoveredCases.push(apiData[i].recovered);
};
/**
 * The formatted ready to use new daily cases data.
 * @type {Array}
 */
let newDailyCasesData = generateData(newDailyCases, newDailyCases.length);
/**
 * The formatted ready to use recovered cases data.
 * @type {Array}
 */
let recoveredCasesData = generateData(recoveredCases, recoveredCases.length);
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
 * The formatted ready to use accumulated recovered cases data.
 * @type {Array}
 */
let accumulatedRecoveredData = generateAccumulatedData(recoveredCases, newDailyCases.length);
/**
 * The formatted ready to use accumulated recovered cases data.
 * @type {Array}
 */
let accumulatedDeathsData = generateAccumulatedData(dailyDeathsData, newDailyCases.length);

/**
 * The formatted ready to use recovered cases data.
 * @type {Array}
 */
let activeCasesData = generateActiveData(accumulatedDailyData, accumulatedRecoveredData, accumulatedDeathsData, newDailyCases.length);
activeTotal = activeCasesData[activeCasesData.length - 1].y;
/**
 * Write the total confirmed cases within the HTML Element.
 */
confirmedTotalLabel.innerHTML = sumDailyTotals(confirmedTotal, newDailyCases);
/**
 * Write the total recovered cases within the HTML Element.
 */
recoveredTotalLabel.innerHTML = sumDailyTotals(recoveredTotal, recoveredCases);
/**
 * Write the total active cases within the HTML Element.
 */
activeTotalLabel.innerHTML = activeTotal;
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
    });
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
 * Generates an array of formatted data to use in the daily cases charts.
 *
 * @param {Array}  accumulatedDailyData      The data to use in the Chart.
 * @param {Array}  accumulatedRecoveredData  The data to use in the Chart.
 * @param {Array}  accumulatedDeathsData     The data to use in the Chart.
 * @param {Number} numberOfDays              The number of days to use in x axis.
 *
 * @return {Array}
 */
function generateActiveData(accumulatedDailyData, accumulatedRecoveredData, accumulatedDeathsData, numberOfDays) {
  let result = [];
  for (let i = 0; i < numberOfDays; i++){
    const x = moment('March 5 2020', "MMMM DD YYYY" ).add(i, 'days');
    let data = accumulatedDailyData[i].y - accumulatedRecoveredData[i].y - dailyDeathsData[i].y;
    result.push({
      x,
      y: data,
    });
  }
  return result;
}
/**
 * Generates accumulated formatted data to use in the accumulative chart.
 *
 * @param {Array} newDailyCases  The data of new daily confirmed cases.
 *
 * @return {Number}
 */
function sumDailyTotals(currentTotal, newDailyCases) {
  for (let i = 0; i < newDailyCases.length; i++) {
    currentTotal = currentTotal + newDailyCases[i];
  }
  return currentTotal;
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
      pointRadius: 0
    }]
  },
  options: {
    elements: {
      point:{
        radius: 0
      }
    },
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
      yAxisID: "y-axis-1",
      label: '# of Accumulated Daily Cases',
      data: accumulatedDailyData,
      backgroundColor: [
        'rgba(100, 100, 100, 0.4)',
      ],
      borderWidth: 1,
      pointRadius: 0
    }, {
      yAxisID: "y-axis-1",
      label: '# of Active Daily Cases',
      data: activeCasesData,
      backgroundColor: [
        'rgba(200, 100, 200, 0.4)',
      ],
      borderWidth: 1,
      pointRadius: 0
    }, {
      yAxisID: "y-axis-2",
      label: '# of Recovered Cases',
      data: accumulatedRecoveredData,
      backgroundColor: [
        'rgba(100, 200, 100, 0.4)',
      ],
      borderWidth: 1,
      pointRadius: 0
    }]
  },
  options: {
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      yAxes: [{
        type: "linear",
        display: true,
        id: "y-axis-1",
        position: "left",
        reverse: false,
        ticks: {
          beginAtZero: true,
          max: 5000,
          min: 0,
        },
      }, {
        type: "linear",
        display: true,
        id: "y-axis-2",
        position: "right",
        reverse: true,
        ticks: {
          max: 5000,
          min: 0,
          reverse : true,
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
      pointRadius: 0
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
