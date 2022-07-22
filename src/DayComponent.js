import React from 'react'
import "./stylesheet.css"

export default function DayComponent({day, removeDay, convertTimeFloatToString, convertTimeStringToFloat}) {
  function handleRemoveClick(){
    removeDay(day)
  }
  return (
    <div className="listElement">
        <div>Datum: {day.getDate()}</div>
        <div>Kommt: {day.getArrivalTime()}</div>
        <div>Geht: {day.getLeavingTime()}</div>
        <div>Pause: {day.getBreakLength()}</div>
        <div>Arbeitszeit: {day.getWorkLength()}</div>
        <button onClick={handleRemoveClick} className="btn btn-remove">Entfernen</button>
    </div>
  )
}
