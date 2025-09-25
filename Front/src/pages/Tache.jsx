import Header from "../components/taches/Header" ;
import Stats from "../components/taches/Stats";
import AjoutForm from "../components/taches/AjoutForm";
import Filtre from "../components/taches/Filtre";
import List from "../components/taches/List";

import {MyTacheProvider} from "../context/TacheContext"


export default function Tache() {

  return ( 
  <div className="w-screen min-h-screen bg-gray-200 "> 
  <MyTacheProvider> 
    <Header />
     <div className="w-full px-4 py-8">
       <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
         <div className="xl:col-span-4 w-full space-y-6"> 
          <div className="">
             <Stats /> 
             <AjoutForm />
              </div>
               </div>
                <div className="xl:col-span-8 w-full space-y-6"> 
                  <Filtre /> 
                  <List />
                   </div> 
                   </div> 
                   </div> 
                   </MyTacheProvider>  
         </div> 
      );

}
