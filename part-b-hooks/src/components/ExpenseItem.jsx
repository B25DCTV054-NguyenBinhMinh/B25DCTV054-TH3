import { useState } from 'react'

function ExpenseItem({ expense, onDeleteExpense }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(
    expense.amount,
  )

  async function handleDelete() {
    setDeleting(true)
    setError('')

    try {
      await onDeleteExpense(expense.id)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Không thể xóa khoản chi.',
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <article className="expense-item">
      <div>
        <h3>{expense.title}</h3>
        <p>Loại: {expense.category}</p>
        <p>Ngày chi: {expense.date}</p>
      </div>
      <div className="expense-item-actions">
        <strong>{formattedAmount} VNĐ</strong>
        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Đang xóa...' : 'Xóa'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </div>
    </article>
  )
}

export default ExpenseItem
