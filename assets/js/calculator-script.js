'use strict'

let dataEntryMode = false 
let register = ''
const regexDig=/^dig([0-9]{1}|[p])$/ // digits 0-9 + p = period
const regexOpr=/^opr([a]|[s]|[d]|[m]|[e]|[x]|[g])$/ //operators Add Subtract Divide Multiply  e=sum x=undefined g = x<>y 
const regexCmd=/^cmd([o]|[r]|[f])$/ // commands mode changing r = return  o=rolldown f=clear
const regexSpl=/^spl([c]|[b])$/ //non-mode changing commands backspace chs

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
	}else if (regexOpr.test(btnID)){
		dataEntryMode === true ? (stack.push(format(Number(register))),dataEntryMode = false) : null 
		switch(btn){
			case 'g': //x<>y
				stack.swapxy()
				register = stack.peek(0)
				break
			case 'a': //add
				calc2(add)
				break
			case 's': //subtract
				calc2(sub)
				break
			case 'm': //multiply
				calc2(mul)
				break
			case 'd': //divide
				calc2(div)
				break
			default: null
		}
	}else if (regexCmd.test(btnID)) {	
		dataEntryMode = false		
		switch(btn){
			case 'o': //rolldown				
				stack.rolldown()
				register = stack.peek(0)
				break
			case 'f': //clear all				
				stack.clear()
				register = stack.peek(0)				
				break
			case 'r': //return
				register.length !== 0 ? stack.push(register = (format(Number(register)))) : null
				break
			default: null
		}	
	}else if (regexSpl.test(btnID)&&register.length!==0){
		switch(btn){
			case 'c':
				dataEntryMode === false ?
					(register = stack.pop(), stack.push(register = format((register * -1))))	:
					register.length !== 0 && register != 0 ? register = (register * -1).toString(): null			
				break
			case 'b': //backspace // can't go below zero otherwise remove char if only char is negative sign clear
				dataEntryMode  === false ?  (stack.rolldown(), register = stack.peek(0)) : 
					register.length !== 0 ? (register = register.substring(0,register.length-1),
					register.length === 1 && register[0] === '-' ?  register = '' : null) : null 					
				break
			default: null
		}
	}
	displayNumber(register.length === 0 ? (format(Number(0))) : register)
	stack.print()
}

