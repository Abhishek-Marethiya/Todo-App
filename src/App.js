
import './App.css';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast';
function App() {
  
  return (
    <>
     <div className="App">
  <div className='home'>
      <Home/>
      </div>
    </div>
    <Toaster/>
    </>
   
    
  );
}

export default App;
