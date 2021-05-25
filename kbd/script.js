var displayValue = "0";

function getLastNumber (valueToSplit) {
   var splitValue = valueToSplit.split(/[*/+-]/);
   // return the last element of splitValue array, so the last number
   return splitValue[splitValue.length -1];
}

// set display value to zero to start with
$(document).ready(function () {
   
   // resizing to fit the display window
   var calculatorHeight = $("#calculator").height();
   var windowHeight = $(window).height();
   if (windowHeight < calculatorHeight) {
      var scale = windowHeight / (calculatorHeight + 80);
      $("#calculator").css("transform", "scale("+ scale +")");
   }
   
   $(".result").text(displayValue);
   
   // focus for accessibility
   $("#calculator").focus();
   
   
   $(".btn").on("click", function ()  {
      // check if data value is different than html value
      // if pressed character is X change it into *
      var pressedButton = $(this).data("value");
      if (pressedButton === undefined) {
         pressedButton = $(this).text();
      }
      
      // replacing errors and Infinity after being displayed
      if (displayValue === "error" || displayValue === "Infinity") {
         displayValue = "0";
      }
      
      switch (pressedButton) {
         case ".":
            // if there was one . before in the number do not add another .
            var lastNumber = getLastNumber(displayValue);
            if (lastNumber.indexOf(".") === -1) {
               // add zero if somebody starts with . sign
               if (lastNumber === "") {
                  displayValue += "0";
               }
               displayValue += pressedButton;
            }
            break;
         case "0":
            // check if displayValue is not zero before adding another 0, if the last number is not 0 (don't double 0, e.g. 3*00)
            // you can't add 0 if there was one zero before and no . sign
            var lastNumber = getLastNumber(displayValue);
            // There was no zero or there was . sign, then add 0
            if (!(lastNumber === "0" && lastNumber.indexOf(".") === -1 )) {
               displayValue += pressedButton;
            }
            break;
         case "*":
         case "+":
         case "-":
         case "/":
            var lastChar = displayValue.substring(displayValue.length - 1);
            if (lastChar === "*" || lastChar === "+" || lastChar === "-" || lastChar === "/") {
               displayValue = displayValue.substring(0, displayValue.length - 1) + pressedButton;
            } else {
               displayValue += pressedButton;
            }
            break;
         case "back":
            if (displayValue.length > 1) {
               displayValue = displayValue.slice(0, -1);
            } else {
               displayValue = "0";
            }
            break;
         case "clear":
            displayValue = "0";
            break;
         case "=":
            // evaluate display value with logical order of Math
            // convert the number to string for further operations on a string
            // catch exceptions
            try{
               // displayValue = math.eval(displayValue).toString();
               displayValue = parseFloat(math.eval(displayValue).toPrecision(8)).toString();
            }catch(ex){
               displayValue = "error";
            }
            break;
            
         default:
            if (displayValue === "0") {
               displayValue = pressedButton;
            } else {
               displayValue += pressedButton;
            }           
      }

      // show the final result
      $(".result").text(displayValue); 
   });
   
   // keyboard accessibility
   $("body").on("keypress", function(e) {
      var keyPressed = String.fromCharCode(e.which);
      
      // enter to equal
      if (e.which === 13) {
         keyPressed = "=";
      }
      
      // * to x
      if (e.which === 42) {
         keyPressed = "x";
      }
      
      // - to &ndash;
      if (e.which === 45) {
         $(".btn[data-value='-']").trigger("click");
      }
      else if (e.which !== 8 && e.which !== 27) {
         $(".btn:contains('"+ keyPressed +"')").trigger("click");
      }
      return false;
   }).on("keyup", function(e) {
      // backspace
      if (e.which === 8) {
         $(".btn[data-value='back']").trigger("click");
      }
      
      // esc to clear
      if (e.which === 27) {
         $(".btn:contains('clear')").trigger("click");
      }
      return false;
   });
});




