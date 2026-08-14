import logo from '../../assets/images/auth/logo.png';

export default function SidebarBrand() {
  return (
    <div className="px-6 mb-8 flex items-center gap-3">
      <div className="w-10 h-10 bg-[#1e5aa8] rounded-lg flex items-center justify-center text-white">
        <img src={logo} alt="Medorax Logo" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-[24px] font-semibold text-[#004287] tracking-tight">Medorax</h1>
        <p className="text-[12px] font-semibold text-[#424751]">PHARMA MANAGEMENT</p>
      </div>
    </div>
  );
}