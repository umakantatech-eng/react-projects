const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-400 font-semibold mb-4 text-xs uppercase">About</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">ZapMart Stories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 font-semibold mb-4 text-xs uppercase">Help</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:underline">Payments</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 font-semibold mb-4 text-xs uppercase">Policy</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:underline">Return Policy</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
          <div className="md:border-l md:border-gray-600 md:pl-8">
            <h3 className="text-gray-400 font-semibold mb-4 text-xs uppercase">Mail Us:</h3>
            <p className="text-sm text-gray-300">
              ZapMart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-wrap justify-between items-center text-sm font-medium gap-4">
          <p className="hover:underline cursor-pointer">Become a Seller</p>
          <p className="hover:underline cursor-pointer">Advertise</p>
          <p className="hover:underline cursor-pointer">Gift Cards</p>
          <p className="hover:underline cursor-pointer">Help Center</p>
          <p>© 2024-2026 ZapMart.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
