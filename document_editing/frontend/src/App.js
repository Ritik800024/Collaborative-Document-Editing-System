import "tailwindcss/tailwind.css"
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Logincomponent from "./routes/login";
import Signupcomponent from "./routes/signup"
import TextEditor from "./TextEditor";
import { v4 as uuidV4 } from 'uuid'
function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Logincomponent />} />
          <Route path="/signup" element={<Signupcomponent />} />
          <Route path="/home" exact element={<Navigate to={`/document/${uuidV4()}`} />} />
          <Route path="/document/:id" element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
