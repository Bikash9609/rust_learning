import Main from "./screens/main/main";
import "./App.css";
import {FsContextProvider} from "./context/FsProvider.context";

function App() {
  return (
    <FsContextProvider>
      <Main />
    </FsContextProvider>
  );
}

export default App;
