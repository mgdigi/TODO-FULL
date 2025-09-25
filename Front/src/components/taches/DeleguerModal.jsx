import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function DeleguerModal({ tacheId, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleToggle = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleDeleguer = async () => {
    try {
      await axios.post(
        `http://localhost:3000/todos/${tacheId}/collaborateurs`,
        { userIds: selectedUsers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Succès", "Collaborateurs ajoutés avec succès", "success");
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible d’ajouter les collaborateurs", "error");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-80">
      <h2 className="text-lg font-bold mb-2">Déléguer la tâche</h2>
      <div className="max-h-40 overflow-y-auto">
        {users.map(user => (
          <label key={user.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleToggle(user.id)}
            />
            <span>{user.prenom} ({user.login})</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleDeleguer}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          Confirmer
        </button>
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
