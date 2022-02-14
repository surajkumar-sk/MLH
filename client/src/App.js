import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ProductSearch } from './pages/ProductSearch';
import ProductUpload from './pages/ProductUpload';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ProductUpload />} />
          <Route exact path="/search" element={<ProductSearch />} />
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
