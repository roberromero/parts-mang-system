import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePart from '../pages/createParts/CreatePart';
import ListParts from '../pages/listParts/ListParts';
import EditPart from '../pages/editPart/EditPart';
import Nav from '../components/Nav/Nav';
function App() {


  return (
    <div className="App">
      <h1>Parts Management System</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<ListParts />}></Route>
          <Route path="parts/create" element={<CreatePart />}></Route>
          <Route path="parts/:id/edit" element={<EditPart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
