import { Outlet, Link } from 'react-router-dom'

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-xl font-semibold text-center">
          Seller Dashboard
        </div>
        <nav className="mt-8">
          <ul>
            <li className="mb-2">
              <Link to="/seller" className="block px-4 py-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/seller/medicines" className="block px-4 py-2 hover:bg-gray-700">
                Manage Medicines
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/seller/payments" className="block px-4 py-2 hover:bg-gray-700">
                Payment History
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/seller/advertisements" className="block px-4 py-2 hover:bg-gray-700">
                Ask For Advertisement
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default SellerLayout
