export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Eventify</h2>
          <p className="text-gray-400">
            Manage your events and products with ease. Responsive and modern UI.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white transition">
                Products
              </a>
            </li>
            <li>
              <a href="/dashboard/add-product" className="hover:text-white transition">
                Add Product
              </a>
            </li>
            <li>
              <a href="/dashboard/manage-products" className="hover:text-white transition">
                Manage Products
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: info@eventmanager.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Twitter"
            >
              TW
            </a>
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EventManager. All rights reserved.
      </div>
    </footer>
  );
}
