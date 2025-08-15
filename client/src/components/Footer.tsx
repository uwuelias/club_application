const Footer = () => {
  return (
    <footer className="bg-background border-t py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Club_Connect. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer