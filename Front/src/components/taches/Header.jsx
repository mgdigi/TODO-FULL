import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Deconnecter from "./Deconnecter";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 
  return (
    <header className="bg-gray-700 text-start text-white shadow-md mb-7 sticky top-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-start text-xl font-bold">Gestion des Tâches</h1>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="font-medium">
                {user.prenom} {user.nom}
              </span>
              <span className="text-sm text-gray-300">{user.login}</span>
            </div>
                <Deconnecter />

          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm shadow-md transition-all"
          >
            Se connecter
          </button>
        )}
      </div>
    </header>
  );
}
