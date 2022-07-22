import React, {useRef} from 'react'
import "./stylesheet.css"


export default function CalcualteStatsComponent({days, expenses}) {
  const moneyPerHourRef = useRef()
  const totalMoneyMadeRef = useRef()
  const totalExpensesRef = useRef()
  const totalMoneyAfterExpensesRef = useRef()

  function displayTotalWorkHours(days){
    if(days.length === 0) return "--:--"
    let totalWorkHoursFloat = 0
    let totalWorkHoursString = ""
    days.forEach(day => {
      totalWorkHoursFloat += day.convertTimeStringToFloat(day.getWorkLength())
      totalWorkHoursString = day.convertTimeFloatToString(totalWorkHoursFloat)
    });
    return totalWorkHoursString
  }

  function displayMoneyCounts(){
    totalMoneyMadeRef.current.innerHTML = totalMoneyMade(days)
    totalExpensesRef.current.innerHTML = totalExpenses(expenses)
    totalMoneyAfterExpensesRef.current.innerHTML = (parseFloat(totalMoneyMade(days)) - parseFloat(totalExpenses(expenses))).toString() + "€"
  }

  function totalMoneyMade(days){
    let moneyPerHour = moneyPerHourRef.current.value
    let totalWorkHoursFloat = 0

    moneyPerHour = parseFloat(moneyPerHour)
    if(isNaN(moneyPerHour)) moneyPerHour = 0

    days.forEach(day => {
      totalWorkHoursFloat += day.convertTimeStringToFloat(day.getWorkLength())
    });
    return (totalWorkHoursFloat * moneyPerHour).toFixed(2) + "€"
  }

  function totalExpenses(expenses){
    let totalExpenses = 0
    expenses.forEach(expense => {
      totalExpenses += parseFloat(expense.getPrice())
    })
    return totalExpenses.toFixed(2) + "€"
  }

  return (
    <div className='calcInputs'>
      <div>Insgesamte Arbeitszeit:</div>
      <div>{displayTotalWorkHours(days)}</div>
      <div>Insgesamtes Geld:</div>
      <div ref={totalMoneyMadeRef}>--.--€</div>
      <div>Insgesamte Ausgaben:</div>
      <div ref={totalExpensesRef}>--.--€</div>
      <div>Geld nach Ausgaben:</div>
      <div ref={totalMoneyAfterExpensesRef}>--.--€</div>
      <div>Stundenlohn:</div>
      <input ref={moneyPerHourRef}></input>
      <button onClick={displayMoneyCounts} className="btn btn-calculate">Berechnen</button>
    </div>
  )
}
