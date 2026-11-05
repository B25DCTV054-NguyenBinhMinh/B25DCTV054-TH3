import { useCallback, useEffect, useState } from 'react'
import { getExpenses } from '../services/expenseApi'

function useFetch() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refetch = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const expenses = await getExpenses()
      setData(expenses)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Không thể tải dữ liệu.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadExpenses() {
      setLoading(true)
      setError('')

      try {
        const expenses = await getExpenses()
        if (active) {
          setData(expenses)
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Không thể tải dữ liệu.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadExpenses()

    return () => {
      active = false
    }
  }, [])

  return { data, loading, error, refetch }
}

export default useFetch
