export class Day {
  constructor(date, arrivalTime, leavingTime, breakLength){
    this.date = date
    this.arrivalTime = arrivalTime
    this.leavingTime = leavingTime
    this.breakLength = breakLength
  }

  getDate(){
    return this.#formatDateString(this.date)
  }

  // getDateAsInt(){
  //   //lul but it works
  //   console.log(this.#formatDateString(this.date).split(".").join("").split("").reverse().join(""))
  //   console.log(parseInt(this.#formatDateString(this.date).split(".").join("").split("").reverse().join("")))
  //   return parseInt(this.#formatDateString(this.date).split(".").join("").split("").reverse().join(""))
  // }

  getArrivalTime(){
    return this.#formatTimeString(this.arrivalTime)
  }

  getLeavingTime(){
    return this.#formatTimeString(this.leavingTime)
  }

  getBreakLength(){
    return this.#formatTimeString(this.breakLength)
  }

  getWorkLength(){
    let workLength = this.convertTimeFloatToString((this.convertTimeStringToFloat(this.leavingTime) - this.convertTimeStringToFloat(this.arrivalTime)) - this.convertTimeStringToFloat(this.breakLength))
    return this.#formatTimeString(workLength)
  }

  validInputs(){
    if(this.date === "" || this.arrivalTime === "" || this.leavingTime === "" || this.breakLength === "")return false

    if(!this.#validDateInputFormat(this.date) || !this.#validTimeInputFormat(this.arrivalTime) || !this.#validTimeInputFormat(this.leavingTime) || !this.#validTimeInputFormat(this.breakLength)) return false

    if(this.convertTimeStringToFloat(this.arrivalTime) >= this.convertTimeStringToFloat(this.leavingTime)) return false
    if(this.convertTimeStringToFloat(this.leavingTime) - (this.convertTimeStringToFloat(this.arrivalTime)) <= this.convertTimeStringToFloat(this.breakLength))return false

    return true
  }

  convertTimeStringToFloat(timeString){
    const timeStringArray = timeString.split(":")
    return parseFloat(timeStringArray[0]) + (parseFloat(timeStringArray[1])/60)
  }

  convertTimeFloatToString(timeFloat){
    let hours = Math.floor(timeFloat).toString()
    let minutes = Math.floor((timeFloat - Math.floor(timeFloat))*60).toString()

    if(hours < 10) hours = "0" + hours
    if(minutes < 10) minutes = "0" + minutes

    return hours + ":" + minutes
  }

  #validDateInputFormat(inputString){
    const splitArray = inputString.split(".")

    if(splitArray.length !== 3) return false
    if(splitArray[0].length > 2 || isNaN(parseInt(splitArray[0]))) return false
    if(splitArray[1].length > 2 || isNaN(parseInt(splitArray[1]))) return false
    if(splitArray[2].length > 4 || isNaN(parseInt(splitArray[2]))) return false
    return true
  }


  #validTimeInputFormat(inputString){
    const splitArray = inputString.split(":")

    if(splitArray.length !== 2) return false
    for(let i = 0; i < splitArray.length; i++){
      if(isNaN(parseInt(splitArray[i]))) return false
      if(splitArray[i].length > 2) return false
    }
    return true
  }

  #formatDateString(dateString){
    let dateStringArray = dateString.split(".")

    if(dateStringArray[0].length !== 2) dateStringArray[0] = "0" + dateStringArray[0]
    if(dateStringArray[1].length !== 2) dateStringArray[1] = "0" + dateStringArray[1]
    while(dateStringArray[2].length < 4) dateStringArray[2] = "0" + dateStringArray[2]

    return dateStringArray[0] + "." + dateStringArray[1] + "." + dateStringArray[2]
  }

  #formatTimeString(timeString){
    let timeStringArray = timeString.split(":")
    if(timeStringArray[0].length !== 2) timeStringArray[0] = "0" + timeStringArray[0]
    if(timeStringArray[1].length !== 2) timeStringArray[1] = "0" + timeStringArray[1]
    return timeStringArray[0] + ":" + timeStringArray[1]
  }
}