function Stack() {
   
   this.dataStore = ['','','','']
   
   this.push = function (element) {
      this.dataStore.unshift(element)
      this.dataStore.splice(4,1)    
   }

   this.pop = function () {
      let element = this.dataStore.shift()
      this.dataStore.splice(3, 0, '')
      return element
   }

   this.peek = function (loc) {
      return this.dataStore[loc];
   }

   this.clear = function () {
     this.dataStore.forEach(x => x = '')
   }

   this.length = function () {
      return this.dataStore.length()
   }

   this.rolldown = function () {
      this.pop()
   }

   this.print = function(){
     // console.clear()
      console.log(this.dataStore + '\n')
      
   }
  
}
