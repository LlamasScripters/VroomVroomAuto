import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg("")

    const formData = new FormData(event.currentTarget)

    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    

    try {
      if (password !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas.")
      }

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Une erreur est survenue lors de l'inscription")
      }

      // Succès => on peut rediriger vers /login, par ex.
      navigate("/login")
    } catch (error: any) {
      setErrorMsg(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Entrez votre email pour créer un compte
        </p>
      </div>

      {errorMsg && (
        <div className="text-red-500 text-sm text-center">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-6">

      <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" type="text" placeholder="jhonDoe" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" required />

          <Label htmlFor="confirmPassword">Confirmer mot de passe</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          S'inscrire
        </Button>
      </div>

      <div className="text-center text-sm">
        Vous avez déjà un compte ?{" "}
        <NavLink to="/login" className="underline underline-offset-4">
          Se connecter
        </NavLink>
      </div>
    </form>
  )
}
