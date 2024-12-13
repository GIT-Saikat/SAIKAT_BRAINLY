import './App.css'
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';

import DashBoard from './DashBoard

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/dashboard' element={<DashBoard />}></Route>
      {/* need to create the complete share id portion  */}


      {/* need to create login , logout button , switch b/w twitter and youtube and only show those data. if u r in landing page  and u r not logged in u get edirected to signup route . signup page have a button says "already signed in " and by clicking u go to the sign in page too. after  being signedin u goto the signup,signedin page then u get automatically redirected to dashboard  */}

      {/* how and when to use recoil in dashboard */}
    </Routes>
  </BrowserRouter>

  // Learn React-Query for connecting frontend with backend
}
  

export default App
