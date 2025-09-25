import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";

export default function Deconnecter() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Se déconnecter ?",
      text: "Êtes-vous sûr de vouloir quitter la session ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/"); 
        Swal.fire("Déconnecté !", "Vous êtes maintenant déconnecté.", "success");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
    >
      <LogOut className="w-5 h-5" />
      Déconnexion
    </button>
  );
}
