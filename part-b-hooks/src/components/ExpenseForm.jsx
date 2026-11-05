import { useRef, useState } from 'react'

const categories = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: categories[0],
    date: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const titleInputRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const numericAmount = Number(formData.amount)

    if (!formData.title.trim()) {
      setError('Vui lòng nhập nội dung chi tiêu.')
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Số tiền phải là số lớn hơn 0.')
      return
    }

    if (!categories.includes(formData.category)) {
      setError('Vui lòng chọn loại chi tiêu hợp lệ.')
      return
    }

    if (!formData.date) {
      setError('Vui lòng chọn ngày chi.')
      return
    }

    setSubmitting(true)

    onAddExpense({
      title: formData.title.trim(),
      amount: numericAmount,
      category: formData.category,
      date: formData.date,
    })
      .then(() => {
        setFormData({
          title: '',
          amount: '',
          category: categories[0],
          date: '',
        })
        setError('')
        titleInputRef.current?.focus()
      })
      .catch((requestError) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Không thể thêm khoản chi.',
        )
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Thêm khoản chi</h2>

      <label htmlFor="title">Nội dung chi tiêu</label>
      <input
        id="title"
        name="title"
        type="text"
        ref={titleInputRef}
        value={formData.title}
        onChange={handleChange}
        placeholder="Ví dụ: Cơm trưa"
      />

      <label htmlFor="amount">Số tiền</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Nhập số tiền"
      />

      <label htmlFor="category">Loại chi tiêu</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="date">Ngày chi</label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Đang thêm...' : 'Thêm khoản chi'}
      </button>
    </form>
  )
}

export default ExpenseForm
