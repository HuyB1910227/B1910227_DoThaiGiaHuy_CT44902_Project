<template>
<div class="container">  
  
  <h1 style="text-align:center;color:rgb(6, 236, 6);">  
  Welcome to Javatpoint  
</h1>  
  <h3>  
  Making a horizontal scrollable in Bootstrap row  
</h3>  
  <div class="container horizontal-scrollable">  
      <div class="row text-center">  
          <div class="col-xs-4">Element 1</div>  
          <div class="col-xs-4">Element 2</div>  
          <div class="col-xs-4">Element 3</div>  
          <div class="col-xs-4">Element 4</div>  
          <div class="col-xs-4">Element 5</div>  
          <div class="col-xs-4">Element 6</div>  
          <div class="col-xs-4">Element 7</div>  
              <div class="col-xs-4">Element 8</div>  
          <div class="col-xs-4">Element 9</div>  
      </div>  
  </div>  
</div>  
</template>

<style scoped>
div {
    display:inline-block;  
}
.horizontal-scrollable > .row {  
    overflow-x: auto;  
    white-space: nowrap;  
}  
  
.horizontal-scrollable > .row > .col-xs-4 {  
    display: inline-block;  
    float: none;  
}  
/* Designs */  
  
.col-xs-4 {  
    color: rgb(255, 255, 255);  
    font-size: 26px;  
    padding-bottom: 18px;  
    padding-top: 16px;  
}  
  
.col-xs-4:nth-child(2n+1) {  
    background: rgb(6, 177, 6);  
}  
  
.col-xs-4:nth-child(2n+2) {  
    background: black;  
}  
</style>