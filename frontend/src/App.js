import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';

import NoScreen from './screens/NoScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="*" element={<NoScreen />} />{/* THIS PATH NEEDS TO BE THE LAST PATH. DO NOT ADD ANY ROUTE PATHS AFTER THIS ONE. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
