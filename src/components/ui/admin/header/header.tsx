import { Language } from "@/Interfaces/admin/header"
import { HeaderContent } from "./header-content"

// داده‌های نمونه
const languages: Language[] = [
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

const user = {
  name: "امین رضایی",
  email: "amin.rezaei@example.com",
  avatar: "/avatar.png"
}

interface HeaderProps {
  initialLanguages?: Language[]
}

export function Header({ initialLanguages = languages }: HeaderProps) {
  return (
    <HeaderContent 
      languages={initialLanguages}
      user={user}
    />
  )
}