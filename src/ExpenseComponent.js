import React from 'react'
import "./stylesheet.css"

export default function ExpenseComponent({expense, removeExpense}) {
  function handleRemoveClick(){
    removeExpense(expense)
  }

  return (
    <div className="listElement">
      <div>Datum: {expense.getDate()}</div>
      <div>Preis: {expense.getPrice()}€</div>
      <div>Beschreibung: {expense.getDiscription()}</div>
      <button onClick={handleRemoveClick} className="btn btn-remove">Entfernen</button>
    </div>
  )
}
