import { Component } from 'react'
import { initialExpenses } from './data/expenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Header from './components/Header'
import './App.css'

const categories = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expenses: initialExpenses,
      selectedCategory: 'Tất cả',
      searchKeyword: '',
    }

    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getFilteredExpenses() {
    const { expenses, selectedCategory, searchKeyword } = this.state
    const normalizedKeyword = searchKeyword.trim().toLowerCase()

    return expenses.filter((expense) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || expense.category === selectedCategory
      const matchesKeyword = expense.title
        .toLowerCase()
        .includes(normalizedKeyword)

      return matchesCategory && matchesKeyword
    })
  }

  getTotalAmount() {
    return this.getFilteredExpenses().reduce(
      (total, expense) => total + expense.amount,
      0,
    )
  }

  updateDocumentTitle() {
    const formattedTotal = new Intl.NumberFormat('vi-VN').format(
      this.getTotalAmount(),
    )

    document.title = `Sổ chi tiêu - Tổng: ${formattedTotal}đ`
  }

  componentDidMount() {
    this.updateDocumentTitle()
  }

  componentDidUpdate(previousProps, previousState) {
    const hasRelevantStateChanged =
      previousState.expenses !== this.state.expenses ||
      previousState.selectedCategory !== this.state.selectedCategory ||
      previousState.searchKeyword !== this.state.searchKeyword

    if (hasRelevantStateChanged) {
      this.updateDocumentTitle()
    }
  }

  handleAddExpense(expense) {
    const newExpense = {
      ...expense,
      id: `expense-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }

    this.setState((currentState) => ({
      expenses: [...currentState.expenses, newExpense],
    }))
  }

  handleCategoryChange(category) {
    this.setState({ selectedCategory: category })
  }

  handleSearchChange(event) {
    this.setState({ searchKeyword: event.target.value })
  }

  render() {
    const { selectedCategory, searchKeyword } = this.state
    const filteredExpenses = this.getFilteredExpenses()
    const totalAmount = filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    )

    return (
      <div className="app">
        <Header />
        <main className="content">
          <ExpenseForm onAddExpense={this.handleAddExpense} />
          <section className="expense-controls">
            <label htmlFor="expense-search">Tìm kiếm khoản chi</label>
            <input
              id="expense-search"
              type="search"
              value={searchKeyword}
              onChange={this.handleSearchChange}
              placeholder="Nhập nội dung cần tìm"
            />
            <div className="category-filters" aria-label="Lọc theo loại chi tiêu">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category ? 'active' : ''
                  }
                  onClick={() => this.handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
          <ExpenseList expenses={filteredExpenses} />
          <p className="total-amount">
            Tổng tiền: {new Intl.NumberFormat('vi-VN').format(totalAmount)} VNĐ
          </p>
        </main>
      </div>
    )
  }
}

export default App
