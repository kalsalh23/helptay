import { useState } from 'react'
import Splash from './components/Splash'
import FuelForm from './components/FuelForm'

export default function App() {
  const [ready, setReady] = useState(false)
  if (!ready) return <Splash onDone={() => setReady(true)} />
  return <FuelForm />
}