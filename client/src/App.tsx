import { BrowserRouter, Routes, Route } from "react-router"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
