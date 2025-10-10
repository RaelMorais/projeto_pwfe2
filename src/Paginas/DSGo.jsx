import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';
import DriverCards from './DriverCards'; 
export function DSGo(){
    return(
        <main className="corpo">
            
            <Outlet/>
            <DriverCards /> 
            <Menu/> 
        </main>
    )
}