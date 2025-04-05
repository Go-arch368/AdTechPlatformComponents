
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="Logo" />
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-xl tracking-tight">PC Solutions</span>
        </Link>

        
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/logout">Logout</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
