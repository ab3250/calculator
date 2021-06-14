let display
let stack
let register = ''
let regexDig=/^dig([0-9]{1}|[p])$/ // digits 0-9 p period
let regexOpr=/^opr([a]|[s]|[d]|[m]|[r]|[e]|[x])$/ //operator add subtract divide multiply return e=sum x=undefined
let regexCmd=/^cmd([b]|[c])$/ // non-mode changing commands backspace chs 

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
		delete canvas
    	stack = new Stack(4)
    	stack.dataStore.forEach(element => element=new Decimal('0.000'))		
}

let mode = 0 //mode 0 = data entry mode 1 = mirror mode 3 = 


function buttonPress (btnID) {
	let btn = btnID[3]
	if (regexDig.test(btnID)){
		mode === 1 ? (register = '', mode = 0): null
		switch(btn){
			case 'p':
				register.includes(".") ? register += '' : register.length === 0 ? register += '0.' : register += '.'
				break
			case '0':
				register.length === 0 ? register += '' : register += '0'
				break
			default: register += btn
		}
	}else if (regexOpr.test(btnID)&&register.length!==0){
		mode = 1
		const c = stack.pop() 
		
		//alert((stack.pop()).toString())
		switch(btn){
			case 'r':
				register.length !== 0 ? stack.push(register) : null
				break;
			case 'a':
				register = (Number(c) + Number(register)).toFixed(3)
				stack.push(register)
				break
			case 's':
				register = (Number(c) - Number(register)).toFixed(3)
				stack.push(register)
				break
			case 'm':
				register = (Number(c) * Number(register)).toFixed(3)
				stack.push(register)
				break;
			case 'd':
				Number(c) !== 0 ? (register = (Number(c) / Number(register)).toFixed(3), stack.push(register)) : stack.push(c)
				console.log(register) 
				break;
		//default: register += btn
		}
	}else if (regexCmd.test(btnID)) {
		switch(btn){
			case 'b':
				mode === 1 ? register = '' : 		// TODO: ????		
				(register.length !== 0 ? register = register.substring(0,register.length-1) : null, // can't go below zero otherwise remove char
				register.length === 1 && register[0]==='-' ? register = '' : null) // if only char is negative sign clear
				break
			case 'c':
				register.length !== 0 ? (register = register * -1, register=register.toString()) : null
				break
			default: null
		}
	}
	//formatNumber(register)
	displayNumber(register.length === 0 ? '0' : register)
	//register.length === 0 ? displayNumber('0.000') : displayNumber(register)
	console.clear()
	stack.dataStore.forEach(x=>console.log(x))
}



/*
if register empty display 0.00
*/
