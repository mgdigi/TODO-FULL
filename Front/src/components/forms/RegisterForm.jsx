import { useFormContext } from "../../context/FormContext";
import FormInput from "./FormInput";
import { Link } from "react-router-dom"


export default function RegisterForm() {
  const { form, errors, handleChange, handleRegister } = useFormContext();

  return (
    <div>
         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              Inscription
            </h2>
            <p className="text-gray-600">Créez votre compte gratuitement</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
               <FormInput 
                    name="nom" 
                    label="Nom"
                    value={form.nom}
                    onChange={handleChange}
                    error={errors.nom}
                />
                <FormInput 
                    name="prenom" 
                    label="Prénom"
                    value={form.prenom}
                    onChange={handleChange}
                    error={errors.prenom}
                />
                <FormInput 
                    name="login" 
                    label="Login"
                    value={form.login}
                    onChange={handleChange}
                    error={errors.login}
                />
                <FormInput 
                    name="password" 
                    label="Password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <FormInput 
                    name="confirmPassword" 
                    label="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

              </div>


              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-[1.02] font-medium shadow-lg"
              >
                Créer mon compte
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Déjà un compte ? 
                  <Link to="/" className="text-gray-800 font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
    </div>
  );
}
