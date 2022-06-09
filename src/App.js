import {Routes, Route} from "react-router-dom"
import Detail from "./Detail";
import Home from "./Home";
import Join from "./Join";
import Login from "./Login";
import Upload from "./Upload";
import Edit from "./Edit";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="join" element={<Join/>} /> 
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/detail/:id/edit" element={<Edit/>}/>
    </Routes>
    
  );
}

export default App;
