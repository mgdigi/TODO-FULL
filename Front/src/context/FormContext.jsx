import { createContext, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2';


const FormContext = createContext();

export function MyFormProvider({ children }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const validateRegisterForm = () => {
  const newErrors = {};

  if (!form.nom.trim()) newErrors.nom = "Le nom est obligatoire";
  if (!form.prenom.trim()) newErrors.prenom = "Le prénom est obligatoire";

  if (!form.login.trim()) {
    newErrors.login = "L'email est obligatoire";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.login)) {
    newErrors.login = "L'email n'est pas valide";
  }

  if (!form.password.trim()) {
    newErrors.password = "Le mot de passe est obligatoire";
  } else if (form.password.length < 6) {
    newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
  }

  if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "La confirmation est obligatoire";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; 
};


const handleRegister = async  (e) => {
    e.preventDefault();


     if (!validateRegisterForm()) {
    Swal.fire({
      icon: "error",
      title: "Erreur de validation",
      text: "Veuillez corriger les erreurs dans le formulaire",
    });
    return;
  }


    try{
       const res = await axios.post("http://localhost:3000/auth/register", form)
       console.log(res);

       Swal.fire({
             icon: 'success',
             title: 'Inscription réussie',
             text: 'vous pouvez vous connecter !',
             timer: 2000,
             showConfirmButton: false
           });
      navigate("/");
    }catch(error){
      console.error(error)
      Swal.fire({
            icon: 'error',
            title: 'Inscription failed',
            text: "Erreur d'inscription !",
            timer: 2000,
            showConfirmButton: false
          });
    }
   
  };


  const validateLoginform = () => {

    const newErrors = {};
    
     if (!form.login.trim()) {
    newErrors.login = "L'email est obligatoire";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.login)) {
    newErrors.login = "L'email n'est pas valide";
  }

  if (!form.password.trim()) {
    newErrors.password = "Le mot de passe est obligatoire";
  } else if (form.password.length < 6) {
    newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; 
};

const handleLogin = async  (e)=> {
    e.preventDefault();

      if (!validateLoginform()) {
        Swal.fire({
          icon: "error",
          title: "Erreur de validation",
          text: "Veuillez corriger les erreurs dans le formulaire",
        });
        return;
      }



    try{
      const res = await axios.post("http://localhost:3000/auth/login", form);
      localStorage.setItem("token", res.data.accessToken);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Utilisateur connecté :", res.data.user);

      

      Swal.fire({
      icon: 'success',
      title: 'Connexion réussie',
      text: 'Bienvenue !',
      timer: 2000,
      showConfirmButton: false
    });
    
      navigate("/todo")
    }catch(error){
      console.error(error);
      Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Login ou mot de passe incorrect'
    });
    } 
  };
  

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        errors,
        setErrors,
        handleChange,
        validateRegisterForm,
        handleRegister,
        handleLogin
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used inside <MyFormProvider>");
  }
  return context;
}
