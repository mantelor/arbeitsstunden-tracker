export class Expense {
  constructor (date, price, discription){
    this.date = date
    this.price = price
    this.discription = discription
  }

  getDate(){
    return this.#formatDateString(this.date)
  }

  getPrice(){
    return this.#formatPriceString(this.price)
  }

  getDiscription(){
    return this.discription
  }

  validInputs(){
    if(this.date === "" || this.price === "" || this.discription === "") return false
    if(!this.#validDateInputFormat(this.date) || !this.#validPriceInputFormat(this.price)) return false

    return true
  }

  #validDateInputFormat(inputString){
    const splitArray = inputString.split(".")

    if(splitArray.length !== 3) return false
    if(splitArray[0].length > 2 || isNaN(parseInt(splitArray[0]))) return false
    if(splitArray[1].length > 2 || isNaN(parseInt(splitArray[1]))) return false
    if(splitArray[2].length > 4 || isNaN(parseInt(splitArray[2]))) return false
    return true
  }

  #validPriceInputFormat(inputString){
    if(isNaN(parseFloat(inputString))) return false
    return true
  }

  #formatDateString(dateString){
    let dateStringArray = dateString.split(".")

    if(dateStringArray[0].length !== 2) dateStringArray[0] = "0" + dateStringArray[0]
    if(dateStringArray[1].length !== 2) dateStringArray[1] = "0" + dateStringArray[1]
    while(dateStringArray[2].length < 4) dateStringArray[2] = "0" + dateStringArray[2]

    return dateStringArray[0] + "." + dateStringArray[1] + "." + dateStringArray[2]
  }

  #formatPriceString(priceString){
    return parseFloat(priceString).toFixed(2)
  }
}