import { useFormContext } from "../../context/FormContext";
import FormInput from "./FormInput";
import { Link } from "react-router-dom"

export default function LoginForm() {

      const { form, errors, handleChange, handleLogin } = useFormContext();
    

  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              Connexion
            </h2>
            <p className="text-gray-600">Accédez à votre espace personnel</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-gray-600 focus:ring-gray-500" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-[1.02] font-medium shadow-lg"
              >
                Se connecter
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Pas encore de compte ? 
                  <Link to="/register" className="text-gray-800 font-medium hover:underline">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </form>
          </div>

         
        </div>
      </div>
    </div>
    </div>
  )
}
