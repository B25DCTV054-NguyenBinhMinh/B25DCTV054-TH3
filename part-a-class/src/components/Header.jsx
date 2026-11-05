import { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.getCurrentTime(),
    };

    this.timerId = null;
  }

  getCurrentTime() {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ currentTime: this.getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { currentTime } = this.state;

    return (
      <header className="header">
        <h1>Sổ chi tiêu cá nhân</h1>
        <p className="clock">Thời gian hiện tại: {currentTime}</p>
      </header>
    );
  }
}

export default Header;
