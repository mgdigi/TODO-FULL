import RegisterForm from "../components/forms/RegisterForm";
import { MyFormProvider } from "../context/FormContext";



export default function Register() {

  return (
     <MyFormProvider>
      <RegisterForm />
    </MyFormProvider>
  )
}
