import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <>
      {/* `<NoteState>` is a component that wraps the entire application. It is used to provide the
      application with the necessary state and functionality related to notes. It is likely a custom
      context provider component that manages the state and actions related to notes, such as
      adding, deleting, or updating notes. By wrapping the entire application with `<NoteState>`,
      all components within the application can access the note state and perform actions on it. */}
      <NoteState>

        <BrowserRouter>

          <Navbar />
          <Alert message={"LOL"} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/signup' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </div>

        </BrowserRouter>


      </NoteState>
    </>
  );
}

export default App;
