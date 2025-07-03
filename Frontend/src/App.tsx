import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <AppRoutes />
        </div>
        <Footer />
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
