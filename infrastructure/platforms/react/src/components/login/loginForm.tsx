import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"
import { useAuthStore } from '../../stores/authStore';
import axios from 'axios';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      })
  
      const data = await response.data;
      
      if (response.data) {
        useAuthStore.getState().setAuth(data.token, {
          id: data.userId,
          email: email,
          role: data.role 
        });
        navigate('/');
      }
    } catch (error : any) {
      setErrorMsg(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connectez‑vous !</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Entrez votre email pour vous connecter
        </p>
      </div>

      {errorMsg && (
        <div className="text-red-500 text-sm text-center">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </div>

      <div className="text-center text-sm">
        Vous n'avez pas de compte ?{" "}
        <NavLink to="/register" className="underline underline-offset-4">
          Inscrivez-vous
        </NavLink>
      </div>
    </form>
  )
}
