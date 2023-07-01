import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { Official } from './pages/official';
import { Category } from './pages/Category';
import { Pedidos } from './pages/agendementos';
import { PrivateRoute } from './services/PrivateRoute';
function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <ECommerce />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/calendar" 
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/postoDeAtendimento" 
          element={
            <PrivateRoute>
              <Official />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/servico" 
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/agendamentos" 
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/forms/form-elements" 
          element={
            <PrivateRoute>
              <FormElements />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/forms/form-layout" 
          element={
            <PrivateRoute>
              <FormLayout />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/tables" 
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/chart" 
          element={
            <PrivateRoute>
              <Chart />
            </PrivateRoute>
          } 
        />

        
        <Route 
          path="/ui/alerts" 
          element={
            <PrivateRoute>
              <Alerts />  
            </PrivateRoute>
          } 
        />

        <Route 
          path="/ui/buttons" 
          element={
            <PrivateRoute>
              <Buttons />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/auth/signin" 
          element={
            <SignIn />
          } 
        />

        <Route
          path="*"
          element={
            <div className="flex h-screen w-full items-center justify-center text-5xl text-black-2">
              Error 404 | NOT FOUND
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
