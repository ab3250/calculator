'use strict'

function Stack() {
   
   this.dataStore = ['','','','']
   
   this.push = function (element) {
      this.dataStore.unshift(element)
      this.dataStore.splice(4,1)    
   }

   this.rolldown = this.pop = function () {
      let element = this.dataStore.shift()
      this.dataStore.splice(3, 0, '')
      return element === '' ? format(Number(0)) : element
   }

   this.peek = function (loc) {
      return this.dataStore[loc];
   }

   this.clear = function () {   
     this.dataStore.fill('')
   }

   this.length = function () {
      return this.dataStore.length()
   }

   this.swapxy = function(){
      let  value1 = this.pop(),
           value2 = this.pop()
      this.push(value1)
      this.push(value2)
    }
    
    this.set = function(x,y){
      this.dataStore[x] = y   
   }

   this.print = function(){
     // console.clear()
      console.log(this.dataStore + '\n')
   }
}
