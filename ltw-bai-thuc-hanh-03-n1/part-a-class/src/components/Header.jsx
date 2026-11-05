import React, { Component } from 'react';
import Clock from './Clock.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClock: true,
    };
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock,
    }));
  }

  render() {
    const { showClock } = this.state;

    return (
      <header className="app-header">
        <div className="header-brand">
          <span className="badge-part">Phần A • Class Component</span>
          <h1>Sổ Chi Tiêu Cá Nhân</h1>
          <p className="subtitle">
            Quản lý chi tiêu hằng ngày với vòng đời Class Component
          </p>
        </div>

        <div className="header-clock-area">
          {showClock ? (
            <Clock />
          ) : (
            <div className="clock-hidden-note">
              Đồng hồ đã ẩn (đã gọi componentWillUnmount)
            </div>
          )}
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={this.handleToggleClock}
          >
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
