import React from 'react'
import ExpenseComponent from './ExpenseComponent'

export default function ExpenseListComponent({expenses, removeExpense}) {
  return (
    expenses.map(expense => {
      return <ExpenseComponent key={expense.getDate()} expense={expense} removeExpense={removeExpense}></ExpenseComponent>
    })
  )
}
