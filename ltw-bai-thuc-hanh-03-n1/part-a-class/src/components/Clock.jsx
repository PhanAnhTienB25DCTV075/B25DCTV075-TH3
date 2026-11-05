import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
    this.timerId = null;
  }

  // Khởi tạo bộ đếm mỗi giây khi component được gắn vào DOM
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  // Dừng đồng hồ đúng cách khi component bị ẩn / gỡ khỏi DOM
  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  formatTime(date) {
    const timeStr = date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dateStr = date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return `${timeStr} • ${dateStr}`;
  }

  render() {
    return (
      <div className="clock-badge" title="Đồng hồ thời gian thực (Class Lifecycle)">
        <span className="clock-dot"></span>
        <span className="clock-text">{this.formatTime(this.state.currentTime)}</span>
      </div>
    );
  }
}

export default Clock;
