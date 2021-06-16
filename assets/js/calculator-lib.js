'use strict'

let display
let stack
let register = ''
let mode = 0 //mode 0 = data entry mode 1 = mirror mode 3 = 

const regexDig=/^dig([0-9]{1}|[p])$/ // digits 0-9 + p = period
const regexOpr=/^opr([a]|[s]|[d]|[m]|[r]|[e]|[x]|[o]|[g])$/ //operator add subtract divide multiply return e=sum x=undefined o=rolldown g = x<>y
const regexCmd=/^cmd([b]|[c])$/ // non-mode changing commands backspace chs 

document.addEventListener('DOMContentLoaded', loadWindow, false)

function loadWindow () {
	Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    	 col[i].onclick = function (e) { buttonPress(e.target.id) }
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
    	stack = new Stack(4)
    	stack.dataStore.forEach(element => element=new Decimal('0.000'))		
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

function formatNumber(numberOrig){
	let val = new Decimal(numberOrig)
	displayNumber(spaceE(val.toDecimalPlaces(2)))
	console.log(val.toDecimalPlaces(2).toString())
}

function spaceE(numberOrig){ //add a space to exponent 4.0 E +10
	let numberString = numberOrig.toString()
	return numberString.substring(0,numberString.indexOf('e')) + '\u0020' 
		+ numberString.substring(numberString.indexOf('e'), numberString.length)

}


