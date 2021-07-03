'use strict'

let dataEntryMode = false 
let register = ''
const regexDig=/^dig([0-9]{1}|[p])$/ // digits 0-9 + p = period
const regexOpr=/^opr([a]|[s]|[d]|[m]|[e]|[x]|[g])$/ //operators Add Subtract Divide Multiply  e=sum x=undefined g = x<>y 
const regexCmd=/^cmd([o]|[r]|[f])$/ // commands mode changing r = return  o=rolldown f=clear
const regexSpl=/^spl([c]|[b])$/ //non-mode changing commands backspace chs

function buttonPress (btnID) {
	
	let btn = btnID[3]

	switch(true){
		case regexDig.test(btnID) : 
			processDigits(btn)
			break

		case regexOpr.test(btnID) :
			processOperator(btn)
			break

		case regexCmd.test(btnID) : 
			processCommands(btn)
			break

		case regexSpl.test(btnID)&&register.length!==0 : 
			processSpecial(btn)
			break

		default : null
	}

	displayNumber(register.length === 0 ? (format(Number(0))) : register)
	stack.print()
}

