const categories = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function ExpenseStats({ expenses }) {
  const formatter = new Intl.NumberFormat('vi-VN')

  return (
    <section className="expense-stats">
      <h2>Thống kê theo loại</h2>
      {categories.map((category) => {
        const categoryExpenses = expenses.filter(
          (expense) => expense.category === category,
        )
        const categoryTotal = categoryExpenses.reduce(
          (total, expense) => total + expense.amount,
          0,
        )

        return (
          <p key={category}>
            {category}: {formatter.format(categoryTotal)} VNĐ
          </p>
        )
      })}
    </section>
  )
}

export default ExpenseStats
