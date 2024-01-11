import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" Component={Homepage} exact />
        <Route path="/coins/:id" Component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
