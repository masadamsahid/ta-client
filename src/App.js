import {Route, Routes} from 'react-router-dom';
import MainPages from "./MainPages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LearningPage from "./pages/learning/LearningPage";


function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/learning/:courseCode/:orderNo' element={<LearningPage/>}/>
      <Route path='*' name='Home' element={<MainPages/>}/>
    </Routes>
  );
}

export default App;
