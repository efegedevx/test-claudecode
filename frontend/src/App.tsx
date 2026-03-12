import { useEffect, useState } from 'react'
import './App.css'

interface WeatherForecast {
  id: number
  date: string
  temperatureC: number
  temperatureF: number
  summary: string | null
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/weatherforecast`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setForecasts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="app">
      <h1>React + .NET Core + SQL Server</h1>
      <h2>Weather Forecasts</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error connecting to API: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp (C)</th>
              <th>Temp (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map(f => (
              <tr key={f.id}>
                <td>{new Date(f.date).toLocaleDateString()}</td>
                <td>{f.temperatureC}</td>
                <td>{f.temperatureF}</td>
                <td>{f.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
