import logo from './logo.svg';
import './App.css';
import Form from './Pages/Form';
import "./FormStyle.css"

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Form />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
