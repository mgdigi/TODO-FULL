import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import {urlTodo} from "../api/api"


const TacheContext = createContext();

export function MyTacheProvider({ children }) {
  const [taches, setTaches] = useState([]);
  const [allTaches, setAllTaches] = useState([]);
  const [form, setForm] = useState({ titre: "", description: "" });
  const [editingTache, setEditingTache] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("ALL");
   const limit = 5;

const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const total = allTaches.length;
  const totalEnCours = allTaches.filter(t => t.etat === "ENCOURS").length;
  const totalTermine = allTaches.filter(t => t.etat === "TERMINEE").length;





   useEffect(() => {
  const fetchTodos = async () => {
    console.log("Fetching with filter:", filter, "page:", page);

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const params = { page, limit, filter }; // <= juste ça

      const res = await axios.get(urlTodo, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setTaches(res.data.data);
      setAllTaches(res.data.data);
      setTotalPages(res.data.totalPages ?? 1);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Token manquant",
        text: "Session expirée, reconnectez-vous !",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    }
  };
  fetchTodos();
}, [navigate, page, filter]);




  const finishedTask = () => { setPage(1); setFilter("TERMINEE"); };
  const inProgressTask = () => { setPage(1); setFilter("ENCOURS"); };
  const allTask = () => { setPage(1); setFilter("ALL"); };
  const mytasksOnly = () => { setPage(1); setFilter("MINE"); };



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
        const  newErrors = {};

        if(!form.titre.trim()) newErrors.titre = "le titre  est obligatire !"
        if(!form.description.trim()) newErrors.description = "la description    est obligatire !"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    }


  const addTache = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/");
      return;
    }

    try {
      if (editingTache) {
       
        const res = await axios.patch(
          `${urlTodo}/${editingTache}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTaches((prev) =>
          prev.map((t) =>
            t.id === editingTache ? { ...t, ...res.data } : t
          )
        );

        setAllTaches((prev) =>
          prev.map((t) =>
            t.id === editingTache ? { ...t, ...res.data } : t
          )
        );

        setEditingTache(null);
        Swal.fire({
              icon: 'success',
              title: 'Modification réussie',
              text: 'Tache modifie avec succes !',
              timer: 2000,
              showConfirmButton: false
            });
      } else {
            if (!validateForm()) {
               Swal.fire({
                 icon: "error",
                 title: "Erreur de validation",
                 text: "Veuillez corriger les erreurs dans le formulaire",
               });
               return;
             }

        const res = await axios.post(urlTodo, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaches((prev) => [...prev, res.data]);
        setAllTaches((prev) => [...prev, res.data]);
        Swal.fire({
              icon: 'success',
              title: 'creation réussie',
              text: 'Tache cree avec succes !',
              timer: 2000,
              showConfirmButton: false
            });
      }
      setForm({ titre: "", description: "" });
    } catch (error) {
      console.error(error);
     
    }
  };


 
  
  const marquerTerminer = async (id) => {
  if (!token) {
    navigate("/");
    return;
  }
  try {
    const res = await axios.patch(`${urlTodo}/${id}/TERMINEE`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Mise à jour de allTaches
    setAllTaches((prev) =>
      prev.map((t) => (t.id === id ? { ...t, etat: "TERMINEE" } : t))
    );

    // Mise à jour de taches selon le filtre courant
    setTaches((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, etat: "TERMINEE" } : t));
      if (filter === "TERMINEE") {
        return updated.filter(t => t.etat === "TERMINEE");
      }
      if (filter === "ENCOURS") {
        return updated.filter(t => t.etat === "ENCOURS");
      }
      if (filter === "MINE") {
        return updated.filter(t => t.userId === userId);
      }
      return updated; // ALL
    });

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Erreur changement état",
      text: "Impossible de changer l'état de la tâche !",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${urlTodo}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaches((prev) => prev.filter((t) => t.id !== id));
      setAllTaches((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
     Swal.fire({
              icon: 'error',
              title: 'Erreur autorisation',
              text: 'vous etes pas autoriser ! !',
              timer: 2000,
              showConfirmButton: false
            });
    }
  };

  const handleEdit = (id) => {
    const tache = taches.find((t) => t.id === id);
    if (!tache) return;
    setForm({ titre: tache.titre, description: tache.description });
    setEditingTache(id);
  };

  return (
    <TacheContext.Provider
      value={{
        taches,
        form,
        handleChange,
        addTache,
        finishedTask,
        inProgressTask,
        allTask,
        marquerTerminer,
        handleDelete,
        handleEdit,
        editingTache,
        total,
        totalTermine,
        totalEnCours,
        page,
        totalPages,
        setPage,
        errors,
        mytasksOnly,
        setFilter
      }}
    >
      {children}
    </TacheContext.Provider>
  );
}

export function useTacheContext() {
  const context = useContext(TacheContext);
  if (!context) throw new Error("The component must be within the provider");
  return context;
}
