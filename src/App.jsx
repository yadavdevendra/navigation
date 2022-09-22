import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="form" element={<Form title="Add User"/> } />
          <Route path="/:id" element={<Form title="Edit User" />} />
          <Route path="*" element={<h1> page not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
