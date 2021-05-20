document.addEventListener('DOMContentLoaded', loadWindow, false)

const canvas = document.getElementsByTagName('canvas')[0]
canvas.width  = 900
canvas.height = 70

window.setInterval('animate()', 70)

const display = new SegmentDisplay("display")
      display.pattern         = '############.##';
      display.segmentCount    = SegmentDisplay.FourteenSegment
      display.cornerType      = SegmentDisplay.RoundedCorner;
      display.digitHeight     = 6;
      display.digitWidth      = 8;
      display.digitDistance   = 2.0;
      display.displayAngle    = 6;
      display.segmentWidth    = .55;
      display.segmentDistance = 0.2;
      display.colorOn         = 'rgb(255, 44, 15)';
      display.colorOff        = 'rgb(60, 22, 5)';
 


ws = new WebSocket("ws://localhost:9090")

ws.onmessage = function(event) {
     console.log((JSON.parse(event.data)).data)
}

ws.onopen = function() {
	console.log("connected")
}

ws.onclose = function() {
	console.log("closed websocket")
}

ws.onerror = function(event) {
  console.log("WebSocket error observed:", event)
}

function mode (btnID) {
      ws.send(btnID)
}

function loadWindow () {
  Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    col[i].onclick = function (e) { mode(e.target.id) }
  })
//initialize display

}

      function animate() {       
          var time    = new Date()
          var hours   = time.getHours()
          var minutes = time.getMinutes()
          var seconds = time.getSeconds()
          var millis  = time.getMilliseconds()
          var value
          var count = seconds + 60 * minutes + 24 * 60 * hours
          value = count + '.' + Math.floor(millis / 100)
          value = '        '.substr(0, 14 - value.length) + value + '0'
          display.setValue(value);
         
        } 
    

Number.prototype.format = function(fractionDigits, decimalPoint) {
  var fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
  var decimalPoint   = (decimalPoint === undefined) ? "," : decimalPoint;
  return this.toFixed(fractionDigits).replace(/\./, decimalPoint);
}

