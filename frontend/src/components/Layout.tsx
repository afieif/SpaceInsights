import Header from './Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
     <Header/>
     <main className="pt-20 px-4">
        <Outlet/>
     </main>
    </div>
  )
}
