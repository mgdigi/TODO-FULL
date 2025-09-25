import { useTacheContext } from '../../context/TacheContext'

export default function Filtre() {
  const { allTask, finishedTask, inProgressTask, mytasksOnly } = useTacheContext();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex flex-wrap gap-3 mb-8">
        <button 
          onClick={allTask}   
          className="filter-btn active px-6 py-2 rounded-xl font-medium transition-all bg-gray-800 text-white"
        >
          Toutes
        </button>
        <button 
          onClick={mytasksOnly} 
          className="filter-btn px-6 py-2 rounded-xl font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Mes taches
        </button>
        <button 
          onClick={inProgressTask} 
          className="filter-btn px-6 py-2 rounded-xl font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          En cours
        </button>
        <button  
          onClick={finishedTask} 
          className="filter-btn px-6 py-2 rounded-xl font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Terminées
        </button>
      </div>
    </div>
  );
}

