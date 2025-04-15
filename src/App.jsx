import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpenseTracker from './components/expensetracker/ExpenseTracker'
import { SnackbarProvider } from 'notistack'

function App() {

  return (
    <>
    <SnackbarProvider>
      <ExpenseTracker/>
    </SnackbarProvider>
    </>
  )
}

export default App
