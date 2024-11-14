import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./theme"
import NavBar from './Compnents/Navbar';
import Header from './Compnents/Header';
function App() {
  return (
    <div className="App">
      
      <ThemeProvider theme ={theme}>
      <CssBaseline>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
            
          </BrowserRouter>
          </CssBaseline>
        </ThemeProvider>
    </div>
  );
}

export default App;
