import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import Devices from './pages/Devices';
import Prints from './pages/Prints';
import AllPrints from './pages/AllPrints';
import CreateDevice from './pages/CreateDevice';
import UpdateDevice from './pages/UpdateDevice';
import CreatePrint from './pages/CreatePrint';
import Supplies from './pages/Supplies';
import AllSupplies from './pages/AllSupplies';
import CreateSupplies from './pages/CreateSupplies';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Devices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prints"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Prints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prints/all"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <AllPrints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-user/:rut"
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        }
      />

      {/* Rutas para los formularios específicos */}
      <Route
        path="/devices/new"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <CreateDevice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices/edit"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <UpdateDevice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prints/new"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <CreatePrint />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplies"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Supplies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplies/all"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <AllSupplies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplies/new"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <CreateSupplies />
          </ProtectedRoute>
        }
      />


      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
