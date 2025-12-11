
import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas'; 
import { Menu } from './Componentes/Menu';


function App() {
  
  return (
    <BrowserRouter>
      <Rotas />
      <Menu/>
    </BrowserRouter>
  )

}
export default App