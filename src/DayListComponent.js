import React from 'react'
import DayComponent from './DayComponent'

export default function DayListComponent({days, removeDay}) {
  return (
    days.map(day => {
      return <DayComponent key={day.getDate()} day={day} removeDay={removeDay}></DayComponent>
    })
  )
}
