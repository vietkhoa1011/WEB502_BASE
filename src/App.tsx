
import Button from "./components/button";

function App() {

  return (
    <div style={{ padding: "20px" }}>
      {/* Có truyền color */}
      <Button text="Button Đỏ" color="red" onClick={() => alert("Click đỏ")} />

      {/* Không truyền color => random */}
      <Button text="Button Random" onClick={() => alert("Click random")} />
    </div>
  )
}

export default App
