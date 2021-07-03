'use strict'

const display = new SegmentDisplay("display"),
	  stack = new Stack

let	fmtDigits = 4,
    fmtType = "fix"

document.addEventListener('DOMContentLoaded', loadWindow, false)

function loadWindow () {
	//attach event handlers
	Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    	 col[i].onclick = function (e) { buttonPress(e.target.id) }
	})
	//setup display
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
	displayNumber(format(Number(0)))
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

//recieves formatted and verified 14 or less char numeric string for display to led
function displayNumber(numberOrig){
	let numberOutput=''
	const pad = "\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020"
	const decimalPointpIndex = numberOrig.indexOf('.')
	const dp=13 - numberOrig.length + decimalPointpIndex
	numberOrig=numberOrig.replace('.', '')
	const numberData = pad.substr(0, 13 - numberOrig.length) + numberOrig
	const numberPadding = (decimalPointpIndex === -1) ? pad : setCharAt(pad,dp,'.') 
	for (let step = 0; step < 14; step++) {
	       	numberOutput+=numberData[step]
	       	numberOutput+=numberPadding[step]
        }
	display.setValue(numberOutput)
}

function format(obj){	
	return fmtType === "fix" ? obj.toFixed(fmtDigits) : fmtType === "exp" ? obj.toExponential(fmtDigits) : null
} 

function mul(value1,value2){	
	return value2 * value1
}

function div(value1,value2){	
	return value2 / value1
}

function add(value1,value2){	
	return value2 + value1
}

function sub(value1,value2){	
	return value2 - value1
}

function calc2(func){ //TODO add constraints
	const value1 = stack.pop() ,
		  value2 = stack.pop()
	func.name === 'div' && value1 == 0 ? (stack.push(value2), stack.push(value1), error()) 
		: stack.push(register = format(func(Number(value1),Number(value2))))
}


function error(){	
	beep()
	stack.rolldown()
	register = stack.peek(0)
}

function includeJS(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}
