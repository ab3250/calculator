function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


//recieves formatted and verified 14 char numeric string for display to led
function displayNumber(numberOrig){
	let numberOutput=''
	const pad = "\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020"
	decimalPointpIndex = numberOrig.indexOf('.')
	let dp=13 - numberOrig.length + decimalPointpIndex
	numberOrig=numberOrig.replace('.', '')
	numberData = pad.substr(0, 13 - numberOrig.length) + numberOrig
	numberPadding = (decimalPointpIndex === -1) ? pad : setCharAt(pad,dp,'.') 
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



function spaceE(numberOrig){
	let numberString = numberOrig.toString()
	return numberString.substring(0,numberString.indexOf('e')) + '\u0020' 
		+ numberString.substring(numberString.indexOf('e'), numberString.length)

}



/*

*/
