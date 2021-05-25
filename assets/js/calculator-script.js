let display
let register = ''
let regexDig=/^dig([0-9]{1}|[p])$/
let regexOpr=/^opr([a]|[s]|[d]|[m]|[c]|[r]|[e]|[x])$/
let regexCmd=/^cmd([b])$/
document.addEventListener('DOMContentLoaded', loadWindow, false)

function loadWindow () {
	Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    	 col[i].onclick = function (e) { mode(e.target.id) }
	})
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
    	let canvas = document.getElementsByTagName('canvas')[0]
    	canvas.width  = 900
    	canvas.height = 70
}

function mode (btnID) {	
	let btn = btnID[3]
	if (regexDig.test(btnID)){
		switch(btn){
			case 'p':
				register.includes(".") ? register += '' : register += '.'
				break;
			case '0': 
				register.length === 0 ? register += '' : register += '0'
				break;
			default: register += btn 
		}
	}else if (regexOpr.test(btnID)){
		//switch(btn){
			//case 'b':				 
			//	if(register.length !== 0) register = register.substring(0,register.length-1)
			//	break;
		//default: register += btn 
	//	}
	}else if (regexCmd.test(btnID)) { 
		switch(btn){
			case 'b':				 
				if(register.length !== 0) register = register.substring(0,register.length-1)
				break;
			default: register += btn
		}
	}
      	displayNumber(register)
}



/*

*/



