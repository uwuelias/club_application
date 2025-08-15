import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  return (
    <nav className="bg-background shadow-md">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/"><p className="text-xl font-semibold tracking-tight">Club_Connect</p></Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar