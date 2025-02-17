import { Link, useLocation } from "react-router"
import { Users, ShoppingCart, List } from "lucide-react"

const menuItems = [
  { icon: ShoppingCart, text: "Products", path: "/admin" },
  { icon: List, text: "Orders", path: "/admin/orders" },
  { icon: Users, text: "Users", path: "/admin/users" },
]

function SidebarLink({ icon: Icon, text, path }) {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-300 ${
        isActive ? "bg-gray-500 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-500"
      }`}
    >
      <Icon className="w-6 h-6 mr-3" />
      <span className="text-sm font-medium">{text}</span>
    </Link>
  )
}

function Sidebar() {
  return (
    <nav className="bg-white w-64 h-screen shadow-lg">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Admin Panel</h1>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarLink key={item.text} {...item} />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Sidebar

