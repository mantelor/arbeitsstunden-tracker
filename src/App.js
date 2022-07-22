import React, {useRef, useState, useEffect} from "react";
import DayListComponent from "./DayListComponent";
import {Day} from "./Day";
import CalcualteStatsComponent from "./CalcualteStatsComponent";
import ExpenseListComponent from "./ExpenseListComponent";
import { Expense } from "./Expense";
import "./stylesheet.css"

const LOCAL_STORAGE_KEY_DAYS = "arbeitsstunden-tracker.days"
const LOCAL_STORAGE_KEY_EXPENSES = "arbeitsstunden-tracker.expenses"

function App() {
  const [days, setDays] = useState([])
  const dateRef = useRef()
  const arrivalTimeRef = useRef()
  const leavingTimeRef = useRef()
  const breakLengthRef = useRef()

  useEffect(() => {
    const storedDays = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DAYS))
    if(storedDays) {
      storedDays.forEach(storedDay => {
        setDays(previousDays => {
          return [...previousDays, new Day(storedDay.date, storedDay.arrivalTime, storedDay.leavingTime, storedDay.breakLength)]
        })
      })
    }
  }, [])

  useEffect(() => {
    let daysToStore = []
    days.forEach(day => {
      daysToStore.push({date:day.getDate(), arrivalTime:day.getArrivalTime(), leavingTime:day.getLeavingTime(), breakLength:day.getBreakLength()})
    })
    localStorage.setItem(LOCAL_STORAGE_KEY_DAYS, JSON.stringify(daysToStore))
  }, [days])

  function addDay(e){
    const date = dateRef.current.value
    const arrivalTime = arrivalTimeRef.current.value
    const leavingTime = leavingTimeRef.current.value
    const breakLength = breakLengthRef.current.value

    const day = new Day(date, arrivalTime, leavingTime, breakLength)
    if(!day.validInputs()) return

    //return if the date is duplicate
    for(let i = 0; i < days.length; i++){
      if(days[i].getDate() === date) return
    }

    let newDays = [...days]
    newDays.push(day)
    newDays.sort((a,b) => {
      return compareDates(a.getDate(), b.getDate())
    })

    setDays(() => {return [...newDays]})

    dateRef.current.value = null
    arrivalTimeRef.current.value = null
    leavingTimeRef.current.value = null
    breakLengthRef.current.value = null
  }

  function removeDay(day){
    var newDays = [...days]
    newDays.splice(newDays.indexOf(day), 1)
    setDays(() => {return [...newDays]})
  }


  const [expenses, setExpenses] = useState([]) 
  const expenseDateRef = useRef()
  const priceRef = useRef()
  const discriptionRef = useRef()

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EXPENSES))
    if(storedExpenses) {
      storedExpenses.forEach(storedExpense => {
        setExpenses(previousExpense => {
          return [...previousExpense, new Expense(storedExpense.date, storedExpense.price, storedExpense.discription)]
        })
      })
    }
  }, [])

  useEffect(() => {
    let expensesToStore = []
    expenses.forEach(expense => {
      expensesToStore.push({date:expense.getDate(), price:expense.getPrice(), discription:expense.getDiscription()})
    })
    localStorage.setItem(LOCAL_STORAGE_KEY_EXPENSES, JSON.stringify(expensesToStore))
  }, [expenses])

  function addExpense(e){
    const expenseDate = expenseDateRef.current.value
    const price = priceRef.current.value
    const discription = discriptionRef.current.value

    const expense = new Expense(expenseDate, price, discription)
    if(!expense.validInputs()) return

    for(let i = 0; i < expenses.length; i++){
      if(expenses[i].getDate() === expenseDate) return
    }

    let newExpenses = [...expenses]
    newExpenses.push(expense)
    newExpenses.sort((a,b) => {
      return compareDates(a.getDate(), b.getDate())
    })

    setExpenses(() => {return [...newExpenses]})

    expenseDateRef.current.value = null
    priceRef.current.value = null
    discriptionRef.current.value = null
  }
  
  function removeExpense(expense){
    var newExpenses = [...expenses]
    newExpenses.splice(newExpenses.indexOf(expense), 1)
    setExpenses(newExpenses)
  }

  function compareDates(a, b){
      const aArr = a.split(".")
      const bArr = b.split(".")

      if(parseInt(aArr[2]) > parseInt(bArr[2])) return 1
      if(parseInt(aArr[2]) < parseInt(bArr[2])) return -1

      if(parseInt(aArr[1]) > parseInt(bArr[1])) return 1
      if(parseInt(aArr[1]) > parseInt(bArr[1])) return -1

      if(parseInt(aArr[0]) > parseInt(bArr[0])) return 1
      if(parseInt(aArr[0]) > parseInt(bArr[0])) return -1

      return 0
  }

  return (
    <>
      <div className="container">
        <div className="titel">Arbeitstage</div>
        <div className="dayInputs">
          <div>Datum:</div>
          <input ref={dateRef}></input>
          <div>Kommt: </div>
          <input ref={arrivalTimeRef}></input>
          <div>Geht: </div>
          <input ref={leavingTimeRef}></input>
          <div>Pause: </div>
          <input ref={breakLengthRef}></input>
          <button onClick={addDay} className="btn btn-add">Hinzufügen</button>
        </div>
        <div className="list"><DayListComponent days={days} removeDay={removeDay} ></DayListComponent></div>
      </div>
      <div className="container">
        <div className="titel">Ausgaben</div>
        <div className="expInputs">
          <div>Datum:</div>
          <input ref={expenseDateRef}></input>
          <div>Preis:</div>
          <input ref={priceRef}></input>
          <div>Beschreibung:</div>
          <input ref={discriptionRef} id="discInput"></input>
          <button onClick={addExpense} className="btn btn-add">Hinzufügen</button>
        </div>
        <div className="list"><ExpenseListComponent expenses={expenses} removeExpense={removeExpense}></ExpenseListComponent></div>
      </div>
      <CalcualteStatsComponent days={days} expenses={expenses} ></CalcualteStatsComponent>
    </>
  );
}

export default App;
