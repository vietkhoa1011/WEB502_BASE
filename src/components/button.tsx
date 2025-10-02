import React from "react";

// Interface cho props
interface ButtonProps {
  text: string;          // nội dung hiển thị
  color?: string;        // màu nền button (tùy chọn)
  onClick?: () => void;  // sự kiện click (tùy chọn)
}

// Hàm random màu
const getRandomColor = () => {
  const colors = [
    "red", "green", "blue", "orange", "purple",
    "teal", "pink", "yellow", "indigo"
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Button: React.FC<ButtonProps> = ({ text, color, onClick }) => {
  const backgroundColor = color || getRandomColor();

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
