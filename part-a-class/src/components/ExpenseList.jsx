import { Component } from 'react'
import ExpenseItem from './ExpenseItem'

class ExpenseList extends Component {
  render() {
    const { expenses } = this.props

    return (
      <section>
        <h2>Danh sách khoản chi</h2>
        {expenses.length === 0 ? (
          <p className="empty-message">Không tìm thấy khoản chi</p>
        ) : (
          <div className="expense-list">
            {expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default ExpenseList
