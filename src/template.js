module.exports =
`<div class="d-flex justify-content-center">
  <img 
    src="./public/images/headerLogo.jpg" 
    class="img-fluid logo m-3"
  >
</div>


<!-- Graph -->
<div class="container">
  <div class="d-flex flex-column text-center justify-content-center pb-2">
    <h4>COVID-19 Argentina Tracker</h4>
    <span>
      Data Source: <a href="https://www.argentina.gob.ar/coronavirus/informe-diario">argentina.gob.ar</a>
    </span>
  </div>
  
  <!-- Confirmed Number -->
  <div class="row jumbotron">
    <div class="col-12 w-100">
      <div class="graphSec">
        <h4 class="text-center pt-3">Confirmed Cases</h4>
        <h1 class="text-center pb-3 totalNum" id="confirmedTotal"></h1>
      </div>
    </div>
  </div>

  <!-- Charts -->
  <div class="row mt-3 mb-3">
    <div class="col-12 w-100 mb-4 mb-md-0">
      <div class="graphSec px-2">
        <h4 class="text-center py-3">New Daily Cases</h4>
        <canvas 
          id="newDailyCases" 
          width="500" 
          height="300"
        ></canvas>
      </div>
      <div class="graphSec px-2 mt-4">
        <h4 class="text-center py-3">Accumulated Daily Cases</h4>
        <canvas 
          id="accDailyCases" 
          width="500" 
          height="300"
        ></canvas>
      </div>
    </div>
  </div>
</div>

<!-- Footer -->
<div class="d-flex bottomArea justify-content-center align-items-center w-100">
  <div class="d-flex flex-column align-items-center">
    <p class="m-1"><a target="_blank" href="https://manumac.com.ar">manumac.com.ar</a></p>
    <p class="m-1"><a target="_blank" href="https://twitter.com/manumac86">@manumac</a></p>
  </div>
</div>`