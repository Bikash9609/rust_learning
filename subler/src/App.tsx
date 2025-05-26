import Main from "./screens/main/main";
import "./App.css";
import { Subscribe } from "@react-rxjs/core";

function App() {
  return (
    <Subscribe>
      <Main />
    </Subscribe>
  );
}

export default App;
