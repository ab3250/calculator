let display
let canvas
let ws

document.addEventListener('DOMContentLoaded', loadWindow, false)

window.setInterval('animate()', 70)

function mode (btnID) {
      ws.send(btnID)
}

function loadWindow () {
  	Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    	 col[i].onclick = function (e) { mode(e.target.id) }
   	})
    ws = new WebSocket("ws://localhost:9090")
    display = new SegmentDisplay("display")
    display.pattern         = '#.#.#.#.#.#.#.#.#.#.#.#.#.';
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
    canvas = document.getElementsByTagName('canvas')[0]
    canvas.width  = 900
    canvas.height = 70
    ws.onmessage = function(event) {
     console.log((JSON.parse(event.data)).data)
     displayNumber(numeral((JSON.parse(event.data)).data).format('0.0'))
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
}

function animate() { 

} 






/*
	let fmt = '0' + '.' + '00'
	var string = '-' + numeral(1015444445532344400.437).format('0.000e+0')
	string = string.substring(0,string.indexOf('e')) + '\u0020' + string.substring(string.indexOf('e'), string.length)
//        var string = numeral(1000.437).format('0.00')
//      var string = numeral(10000000000.437).format('0.000e+0')
   	let value=displayNumber(string)
         
*/



