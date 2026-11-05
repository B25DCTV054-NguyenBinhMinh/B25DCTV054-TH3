const API_URL = import.meta.env.VITE_API_URL

function getExpensesUrl() {
  if (!API_URL) {
    throw new Error('Thiếu cấu hình VITE_API_URL.')
  }

  return `${API_URL.replace(/\/$/, '')}/expenses`
}

async function getResponseData(response, action) {
  if (!response.ok) {
    throw new Error(`${action} thất bại (HTTP ${response.status}).`)
  }

  return response.json()
}

export async function getExpenses() {
  const response = await fetch(getExpensesUrl())
  return getResponseData(response, 'Tải danh sách khoản chi')
}

export async function addExpense(expense) {
  const response = await fetch(getExpensesUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })

  return getResponseData(response, 'Thêm khoản chi')
}

export async function deleteExpense(id) {
  const response = await fetch(`${getExpensesUrl()}/${id}`, {
    method: 'DELETE',
  })

  return getResponseData(response, 'Xóa khoản chi')
}
