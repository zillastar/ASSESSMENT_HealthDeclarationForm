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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/form" element={<FormScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<NoScreen />} />{/* THIS PATH NEEDS TO BE THE LAST PATH. DO NOT ADD ANY ROUTE PATHS AFTER THIS ONE. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
