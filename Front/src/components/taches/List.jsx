import { useTacheContext } from "../../context/TacheContext";
import { SquarePen, Trash2, CheckCheck, Users } from "lucide-react";
import DeleguerModal from "./DeleguerModal";
import { useState } from "react";

import {CircleOff} from "lucide-react"

export default function List() {
  const { taches, marquerTerminer, handleDelete, handleEdit, page, totalPages, setPage } =
    useTacheContext();
  const [openDeleguer, setOpenDeleguer] = useState(null);

  return (
    <div className="bg-white overflow-y-auto rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex flex-col space-y-4">
        {taches.length > 0 ? (
          taches.map((t) => (
            <div
              key={t.id || t._id}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow p-4 flex items-center justify-between hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={
                    t.imageUrl
                      ? `http://localhost:3000${t.imageUrl}`
                      : "/images/me.jpeg"
                  }
                  alt="Tâche"
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      t.etat === "TERMINEE"
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {t.titre}
                  </h3>
                  <p
                    className={`text-sm ${
                      t.etat === "TERMINEE"
                        ? "line-through text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {t.description}
                  </p>
                  {t.user && (
                    <p className="text-xs text-gray-500 mt-1">
                      Créée par : {t.user.prenom} {t.user.nom}
                    </p>
                  )}
                </div>
              </div>

              
              <div className="flex items-center gap-2 ml-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full shadow ${
                    t.etat === "ENCOURS"
                      ? "bg-yellow-100 text-yellow-800"
                      : t.etat === "TERMINEE"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {t.etat}
                </span>

                {t.etat !== "TERMINEE" && (
                  <button
                    onClick={() => marquerTerminer(t.id)}
                    className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition"
                  >
                    <CheckCheck size={16} />
                  </button>
                )}

                <button
                  onClick={() => handleEdit(t.id)}
                  className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                >
                  <SquarePen size={16} />
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => setOpenDeleguer(t.id)}
                  className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition flex items-center gap-1"
                >
                  <Users size={14} />
                  <span className="text-xs">Déléguer</span>
                </button>
              </div>

              {openDeleguer === t.id && (
                <DeleguerModal
                  tacheId={t.id}
                  onClose={() => setOpenDeleguer(null)}
                />
              )}
            </div>
          ))
        ) : (
          <div id="empty-state" className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <CircleOff />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">
              Aucune tâche
            </h3>
            <p className="text-gray-400 text-sm">
              Ajoutez votre première tâche pour commencer 
            </p>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-1.5 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:bg-gray-200 text-sm"
          >
            ← Précédent
          </button>
          <span className="text-gray-600 font-medium text-sm">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-1.5 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:bg-gray-200 text-sm"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
