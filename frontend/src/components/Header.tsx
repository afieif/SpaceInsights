import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"

import { Link, useLocation } from "react-router";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {pathname} = useLocation()
  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex justify-between items-center px-4 sm:px-8 md:px-16 z-50 bg-white">
      <Link to="/">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 tracking-wide">Space <span className="text-primary">Insights</span></div>
      </Link>
      <div className="flex items-center sm:hidden">
        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="text-gray-700 z-999">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:block">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <Link to="/cme" className={`relative text-sm sm:text-base text-gray-700 font-medium hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-secondary after:left-0 after:bottom-0 after:transition-all hover:after:w-full px-4 py-2 ${pathname == "/cme" ? "text-primary" : ""}`}>
                Coronal Mass Ejections
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/flr" className={`relative text-sm sm:text-base text-gray-700 font-medium hover:text-primary transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-secondary after:left-0 after:bottom-0 after:transition-all hover:after:w-full px-4 py-2  ${pathname == "/flr" ? "text-primary" : ""}`}>
                Solar Flares
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40 sm:hidden">
          <nav>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col items-start gap-4 py-4">
                <NavigationMenuItem onClick={toggleMenu}>
                  <Link to="/cme" className="text-lg text-gray-700 font-medium hover:text-gray-900 transition-colors px-4 py-2">
                    Coronal Mass Ejections
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem onClick={toggleMenu}>
                  <Link to="/flr" className="text-lg text-gray-700 font-medium hover:text-gray-900 transition-colors px-4 py-2">
                    Solar Flares
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      )}
    </header>
  );
}
