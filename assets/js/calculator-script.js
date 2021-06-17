'use strict'

let dataEntryMode = false 
let register = ''
const regexDig=/^dig([0-9]{1}|[p])$/ // digits 0-9 + p = period
const regexOpr=/^opr([a]|[s]|[d]|[m]|[e]|[x]|[o]|[g]|[f])$/ //operator Add Subtract Divide Multiply  e=sum x=undefined 
const regexCmd=/^cmd([b]|[c]|[o]|[g]|[r]|[f])$/ // non-mode changing commands backspace chs return o=rolldown g = x<>y f=clear
const regexSpl=/^spl([c])$/

function buttonPress (btnID) {
	let btn = btnID[3]
	if (regexDig.test(btnID)){
		dataEntryMode  === false ? (register = '', dataEntryMode = true): null
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
		dataEntryMode = false
		const 	c = stack.peek(0),
				value1 = stack.pop(),
				value2 = stack.pop()
		switch(btn){
			case 'a': //add
				register = (Number(value2) + Number(value1)).toFixed(3)
				stack.push(register)
				break
			case 's': //subtract
				register = (Number(value2) - Number(value1)).toFixed(3)
				stack.push(register)
				break
			case 'm': //multiply
				register = (Number(value2) * Number(value1)).toFixed(3)
				stack.push(register)
				break
			case 'd': //divide
				Number(value1) !== 0 ? (register = (Number(value2) / Number(value1)).toFixed(3), stack.push(register)) : (stack.push(value2),stack.push(value1))
				break
			default: null
		}
	}else if (regexCmd.test(btnID)) {
		dataEntryMode = false
		switch(btn){
			case 'b':
				dataEntryMode  === true ? register = '' : 		// TODO: ????		
				(register.length !== 0 ? register = register.substring(0,register.length-1) : null, // can't go below zero otherwise remove char
				register.length === 1 && register[0]==='-' ? register = '' : null) // if only char is negative sign clear
				break
			case 'o': //rolldown				
				stack.rolldown()
				register = stack.peek(0)
				break
			case 'g': //x<>y
				stack.swapxy()
				register = stack.peek(0)
				break
			case 'f': //clear all				
				stack.clear()
				register = stack.peek(0)				
				break
			case 'r': //return
				register.length !== 0 ? stack.push(register) : null
				break
			default: null
		}		
	}else if (regexSpl.test(btnID)&&register.length!==0){
		switch(btn){
			case 'c':				
				register.length !== 0 ? register = (register * -1).toString() : null
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
