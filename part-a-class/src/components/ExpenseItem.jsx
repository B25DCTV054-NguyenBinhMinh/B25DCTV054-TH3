import { Component } from 'react'

class ExpenseItem extends Component {
  render() {
    const { expense } = this.props
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(
      expense.amount,
    )

    return (
      <article className="expense-item">
        <div>
          <h3>{expense.title}</h3>
          <p>Loại: {expense.category}</p>
          <p>Ngày chi: {expense.date}</p>
        </div>
        <strong>{formattedAmount} VNĐ</strong>
      </article>
    )
  }
}

export default ExpenseItem
