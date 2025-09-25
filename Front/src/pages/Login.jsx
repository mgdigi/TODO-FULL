import LoginForm from "../components/forms/LoginForm";
import { MyFormProvider } from "../context/FormContext";




export default function Login() {

  return (
   
    <MyFormProvider>
      <LoginForm />
    </MyFormProvider>
  )
}
