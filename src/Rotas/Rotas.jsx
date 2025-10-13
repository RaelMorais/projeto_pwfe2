
import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSGo } from "../Paginas/DSGo";
import { Missao} from "../Paginas/Missao";
import Entrada from "../Paginas/Entrada";
import F1TeamViewer from "../Paginas/Teams";
// import { Inventario } from "../Pagina/Inventario";
// import { GeolocalizacaoMapa } from "../Componentes/GeolocalizacaoMapa";

export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Entrada/>} />
            <Route path="/teams" element={<F1TeamViewer />} /> 
            <Route path="/dsgo" element={<DSGo />} >  
                <Route index element ={<DSGo/>}/>
                <Route path="missao" element={<Missao />} /> 
             {/*     <Route path="inventario" element={<Inventario/>} />
                <Route path="camera" element={<GeolocalizacaoMapa/>} />*/}
            </Route>   
        </Routes>
    );
}   