import { useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseStats from './components/ExpenseStats'
import Header from './components/Header'
import { useTheme } from './context/ThemeContext'
import useDebounce from './hooks/useDebounce'
import useFetch from './hooks/useFetch'
import { addExpense, deleteExpense } from './services/expenseApi'
import './App.css'

const categories = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function App() {
  const { data: expenses, loading, error, refetch } = useFetch()
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [actionError, setActionError] = useState('')
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300)
  const { theme } = useTheme()

  const normalizedKeyword = debouncedSearchKeyword.trim().toLowerCase()
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === 'Tất cả' || expense.category === selectedCategory
    const matchesKeyword = expense.title
      .toLowerCase()
      .includes(normalizedKeyword)

    return matchesCategory && matchesKeyword
  })
  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  )

  useEffect(() => {
    const formattedTotal = new Intl.NumberFormat('vi-VN').format(totalAmount)
    document.title = `Sổ chi tiêu - Tổng: ${formattedTotal}đ`
  }, [expenses, selectedCategory, debouncedSearchKeyword, totalAmount])

  async function handleAddExpense(expense) {
    setActionError('')

    try {
      await addExpense(expense)
      await refetch()
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Không thể thêm khoản chi.'
      setActionError(message)
      throw requestError
    }
  }

  async function handleDeleteExpense(id) {
    setActionError('')

    try {
      await deleteExpense(id)
      await refetch()
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Không thể xóa khoản chi.'
      setActionError(message)
      throw requestError
    }
  }

  const displayedContent = loading ? (
    <p className="status-message">Đang tải dữ liệu...</p>
  ) : error ? (
    <div className="status-message">
      <p>{error}</p>
      <button type="button" onClick={refetch}>
        Thử lại
      </button>
    </div>
  ) : expenses.length === 0 ? (
    <p className="status-message">Chưa có khoản chi nào</p>
  ) : (
    <>
      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
      />
      <p className="total-amount">
        Tổng tiền: {new Intl.NumberFormat('vi-VN').format(totalAmount)} VNĐ
      </p>
    </>
  )

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main className="content">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseStats expenses={expenses} />
        {actionError && <p className="form-error">{actionError}</p>}
        <section className="expense-controls">
          <label htmlFor="expense-search">Tìm kiếm khoản chi</label>
          <input
            id="expense-search"
            type="search"
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="Nhập nội dung cần tìm"
          />
          <div className="category-filters" aria-label="Lọc theo loại chi tiêu">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        {displayedContent}
      </main>
    </div>
  )
}

export default App
