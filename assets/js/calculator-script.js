'use strict'

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
		const c = stack.peek(0) 
		switch(btn){
			case 'r': //return
				register.length !== 0 ? stack.push(register) : null
				break;
			case 'a': //add
				register = (Number(c) + Number(register)).toFixed(3)
				stack.push(register)
				break
			case 's': //subtract
				register = (Number(c) - Number(register)).toFixed(3)
				stack.push(register)
				break
			case 'm': //multiply
				register = (Number(c) * Number(register)).toFixed(3)
				stack.push(register)
				break
			case 'd': //divide
				Number(c) !== 0 ? (register = (Number(c) / Number(register)).toFixed(3), stack.push(register)) : stack.push(c)
				console.log(register) 
				break
			case 'o': //rolldown
				register = (Number(c) + Number(register)).toFixed(3)
				stack.push(register)
				break
			case 'g': //x<>y
				register = (Number(c) + Number(register)).toFixed(3)
				stack.push(register)
				break
			case 'c': //clear all
				register = (Number(c) + Number(register)).toFixed(3)
				stack.push(register)
				break
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
	displayNumber(register.length === 0 ? '0.000' : register)
	stack.print()
	//register.length === 0 ? displayNumber('0.000') : displayNumber(register)
	//console.clear()
	//stack.dataStore.forEach(x=>console.log(x))
}

//TODO fix stack 4 max and pop a zero if empty
// chs push back on stack
// empty register display 0

/*
if register empty display 0.00
*/
