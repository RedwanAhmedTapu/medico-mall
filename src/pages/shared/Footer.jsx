const Footer = () => {
  return (
    <div className="bg-[#262626] w-full text-center lg:text-left">
      {/* first section */}
      <footer className="flex items-center py-4 text-base-content">
        <div className="h-0 w-full border-b border-[rgba(255,255,255,0.7)]" />
        <img src="https://i.ibb.co/5cHxV4B/Green-Medicine-Logo-removebg-preview.png" className="h-24" alt="MedicoMall Logo" />
        <div className="h-0 w-full border-b border-[rgba(255,255,255,0.7)]" />
      </footer>
      {/* second section */}
      <footer className="footer p-10 text-[rgba(255,255,255,0.7)] text-sm leading-6 border-t border-[rgba(255,255,255,0.05)]">
        <aside className="max-w-sm">
          MedicoMall is committed to providing top-notch healthcare products through our online platform, ensuring compliance with all local regulations.
          Our certified facilities and professional pharmacists are here to assist you with both in-store and online purchases.
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Online Consultations</a>
          <a className="link link-hover">Prescription Fulfillment</a>
          <a className="link link-hover">Health & Wellness Products</a>
          <a className="link link-hover">Pharmacy Locator</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Blog</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Return Policy</a>
        </nav>
      </footer>
      <footer className="flex flex-col md:flex-row justify-between p-10 text-[rgba(255,255,255,0.7)] border-t border-[rgba(255,255,255,0.05)]">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Vendor Registration</a>
          <a className="link link-hover">Affiliate Program</a>
          <a className="link link-hover">Press Kit</a>
        </nav>
        <aside>
          <p>Copyright © 2024 - All rights reserved by MedicoMall</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
