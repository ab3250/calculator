let display

document.addEventListener('DOMContentLoaded', loadWindow, false)

window.setInterval('animate()', 100);

ws = new WebSocket("ws://localhost:9090")

ws.onmessage = function(event) {
     console.log(event.data)
     document.getElementById('out').innerText=event.data
}

ws.onopen = function() {
	console.log("connected")
}

ws.onclose = function() {
	console.log("closed websocket")
}

ws.onerror = function(event) {
  console.log("WebSocket error observed:", event);
}

function mode (btnID) {
      ws.send(btnID)
}
 


function loadWindow () {
  Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    col[i].onclick = function (e) { mode(e.target.id) }
  })
//initialize display
  display = new SegmentDisplay("display")
  display.setValue("                    ")
  display.draw()


  setInterval(function () {
    mode("dsp")
  }, 3000)
}

function animate() {
    var time    = new Date();
    var hours   = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var value   = ((hours < 10) ? ' ' : '') + hours
                + ':' + ((minutes < 10) ? '0' . '') + minutes
                + ':' + ((seconds < 10) ? '0' . '') + seconds;
    display.setValue(value);
  }


