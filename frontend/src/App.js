import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';

import NoScreen from './screens/NoScreen';
import HomeScreen from './screens/HomeScreen';
import FormScreen from "./screens/FormScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NewFormScreen from "./screens/NewFormScreen";
import FormDashboard from "./screens/FormDashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/form/:id" element={<FormScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/newform" element={<NewFormScreen />} />
          <Route path="/viewform/:id" element={<FormDashboard />} />
          <Route path="*" element={<NoScreen />} />{/* THIS PATH NEEDS TO BE THE LAST PATH. DO NOT ADD ANY ROUTE PATHS AFTER THIS ONE. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
