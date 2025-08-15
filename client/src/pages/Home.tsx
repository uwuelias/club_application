import { Button } from "@/components/ui/button"
import { Link } from "react-router"
const Home = () => {
  return (
  <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Club_Connect</h1>
        <p className="text-lg text-muted-foreground max-w-xl">
            Club Connect helps you discover, join, and manage campus clubs with ease—bringing students together in one simple platform.
        </p>
        <Link to="/signup"><Button className="mt-4 hover:cursor-pointer">Get Started</Button></Link>
    </main>
  )
}

export default Home