import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./theme"
import NavBar from './Compnents/Navbar';
import Header from './Compnents/Header';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { ToastContainer } from "react-toastify"
  import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import UserDashboard from './Pages/UserDashboard';

function App() {

  
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Provider store={store}> 
      <ThemeProvider theme ={theme}>
      <CssBaseline>
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/user/dashboard' element={<UserDashboard></UserDashboard>}></Route>
                
                <Route path='/search/location/:location' element={<Home></Home>}></Route>
                <Route path='*' element={<NotFound></NotFound>}></Route>
                <Route path='/search/:keyword' element={<Home></Home>}></Route>
            </Routes>
            
          </BrowserRouter>
          </CssBaseline>
        </ThemeProvider>
        </Provider>
    </div>
  );
}

export default App;
