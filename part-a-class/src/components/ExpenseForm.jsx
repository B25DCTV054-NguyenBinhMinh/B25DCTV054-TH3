import { Component } from "react";

const categories = ["Ăn uống", "Đi lại", "Học tập", "Giải trí"];

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      amount: "",
      category: categories[0],
      date: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { title, amount, category, date } = this.state;
    const numericAmount = Number(amount);

    if (!title.trim()) {
      this.setState({ error: "Vui lòng nhập nội dung chi tiêu." });
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      this.setState({ error: "Số tiền không được âm nhé." });
      return;
    }

    if (!categories.includes(category)) {
      this.setState({ error: "Vui lòng chọn loại chi tiêu hợp lệ." });
      return;
    }

    if (!date) {
      this.setState({ error: "Vui lòng chọn ngày chi." });
      return;
    }

    this.props.onAddExpense({
      title: title.trim(),
      amount: numericAmount,
      category,
      date,
    });

    this.setState({
      title: "",
      amount: "",
      category: categories[0],
      date: "",
      error: "",
    });
  }

  render() {
    const { title, amount, category, date, error } = this.state;

    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <h2>Thêm khoản chi</h2>

        <label htmlFor="title">Nội dung chi tiêu</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={this.handleChange}
          placeholder="Ví dụ: Cơm trưa"
        />

        <label htmlFor="amount">Số tiền</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={this.handleChange}
          placeholder="Nhập số tiền"
        />

        <label htmlFor="category">Loại chi tiêu</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={this.handleChange}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label htmlFor="date">Ngày chi</label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={this.handleChange}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Thêm khoản chi</button>
      </form>
    );
  }
}

export default ExpenseForm;
