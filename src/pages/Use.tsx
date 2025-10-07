import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  phone: string;
  website: string;
}

function Use() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Gọi API khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>useEffect</h1>
      <ul>
        {users.map((user, index) => (
          <li
            key={user.id}
            onClick={() => setSelectedUser(user)}
            style={{
              cursor: "pointer",
              color: selectedUser?.id === user.id ? "blue" : "black",
              marginBottom: "6px",
            }}
          >
            {index + 1}. {user.name} | {user.phone}
          </li>
        ))}
      </ul>

      <h2>Thông tin chi tiết</h2>
      {selectedUser ? (
        <div>
          <p>
            <strong>Họ và tên:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Website:</strong> {selectedUser.website}
          </p>
        </div>
      ) : (
        <p>Vui lòng chọn user để xem chi tiết.</p>
      )}
    </div>
  );
}

export default Use;
