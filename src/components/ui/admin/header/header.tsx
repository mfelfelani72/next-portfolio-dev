import { Language } from "@/Interfaces/admin/header"
import { HeaderContent } from "./header-content"



const user = {
  name: "امین رضایی",
  email: "amin.rezaei@example.com",
  avatar: "/avatar.png"
}



export function Header() {
  return (
    <HeaderContent 
      user={user}
    />
  )
}