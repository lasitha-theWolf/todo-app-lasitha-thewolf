
import './App.css';

import Sidebar from './components/Sidebar';
import Header from './components/Mainpage';
import {BrowserRouter , Router,Route, Routes} from "react-router-dom"

function App() {
  return (
    
    <div className="App">
      
      
       <Routes>

       <Route path="/" element={<Header/>}/>
      
      

       </Routes>
       </div>
  );
}

export default App;
