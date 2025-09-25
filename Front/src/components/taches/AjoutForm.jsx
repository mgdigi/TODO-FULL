import { useTacheContext } from "../../context/TacheContext"

export default function AjoutForm() {

    const {addTache, handleChange, editingTache, form, errors} = useTacheContext()

    



  return (
    <div>
        <div class="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 mt-5">
            <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Ajouter une nouvelle tâche
            </h2>
            
            <form id="todo-form" class="space-y-4"  onSubmit={addTache}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>

                        <input 
                            type="text" 
                            id="task-input" 
                            name="titre"
                            placeholder="Entrez le titre votre tâche..."
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all outline-none"
                            value={form.titre}
                            onChange={handleChange}
                        > </input>
                        {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
                    </div>
                        
                    <div>
                        <input 
                            type="textarea" 
                            id="task-input" 
                            name="description"
                            placeholder="Entrez le description votre tâche..."
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all outline-none"
                            value={form.description}
                            onChange={ handleChange}
                        > </input>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

                    </div>
                        

                </div>
                 <button 
                    type="submit" 
                    class="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-[1.02] font-medium shadow-lg"
                >
                   {editingTache ? "Modifier la tâche" : "Ajouter la tâche"}

                </button>
                
               
            </form>
        </div>
    </div>
  )
}
