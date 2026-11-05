import ExpenseItem from './ExpenseItem'

function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <section>
      <h2>Danh sách khoản chi</h2>
      {expenses.length === 0 ? (
        <p className="empty-message">Không tìm thấy khoản chi</p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ExpenseList
