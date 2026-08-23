// src/pages/LoginHistory/LoginHistory.jsx
import { useState } from "react";
import AuthNavbar from "../../components/authentication/shared/AuthNavbar";
import AuthFooter from "../../components/authentication/shared/AuthFooter";

export default function LoginHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 42;
  const entriesPerPage = 4;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const loginData = [
    {
      id: 1,
      date: "Oct 24, 2024",
      time: "10:45 AM",
      isCurrent: true,
      device: "Chrome on macOS",
      icon: "desktop_windows",
      location: "New York, USA",
      status: "success",
    },
    {
      id: 2,
      date: "Oct 23, 2024",
      time: "08:22 PM",
      isCurrent: false,
      device: "Safari on iPhone 15",
      icon: "smartphone",
      location: "London, UK",
      status: "success",
    },
    {
      id: 3,
      date: "Oct 22, 2024",
      time: "02:15 AM",
      isCurrent: false,
      device: "Unknown Browser",
      icon: "language",
      location: "Moscow, RU",
      status: "failed",
    },
    {
      id: 4,
      date: "Oct 20, 2024",
      time: "11:10 AM",
      isCurrent: false,
      device: "Edge on Windows",
      icon: "desktop_windows",
      location: "Berlin, DE",
      status: "success",
    },
    {
      id: 5,
      date: "Oct 19, 2024",
      time: "09:30 PM",
      isCurrent: false,
      device: "Firefox on Linux",
      icon: "computer",
      location: "Tokyo, JP",
      status: "success",
    },
    {
      id: 6,
      date: "Oct 18, 2024",
      time: "04:15 PM",
      isCurrent: false,
      device: "Chrome on Android",
      icon: "android",
      location: "Sydney, AU",
      status: "failed",
    },
    {
      id: 7,
      date: "Oct 17, 2024",
      time: "01:45 PM",
      isCurrent: false,
      device: "Safari on iPad",
      icon: "tablet_mac",
      location: "Paris, FR",
      status: "success",
    },
    {
      id: 8,
      date: "Oct 16, 2024",
      time: "11:20 AM",
      isCurrent: false,
      device: "Edge on Windows",
      icon: "desktop_windows",
      location: "Toronto, CA",
      status: "success",
    },
  ];

  const filteredData = loginData.filter(item =>
    item.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleLogout = (id) => {
    if (confirm("Are you sure you want to sign out of this session?")) {
      alert("Session terminated successfully.");
    }
  };

  const handleLogoutAll = () => {
    if (confirm("Are you sure you want to sign out of all other active sessions? This will terminate logins on your mobile devices and other browsers.")) {
      alert("All other sessions have been successfully terminated.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f9ff] overflow-hidden">
      <AuthNavbar />
      
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4 max-w-[1440px] mx-auto w-full">
        <nav className="mb-4 flex items-center gap-2 text-[#424751] text-[13px] font-medium">
          <a className="hover:text-[#004287] no-underline" href="#">Settings</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <a className="hover:text-[#004287] no-underline" href="#">Security</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[#121c2a]">Login History</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="text-[28px] leading-[36px] font-bold text-[#121c2a] tracking-tight">
              Login History
            </h1>
            <p className="text-[14px] leading-[20px] text-[#424751] max-w-2xl">
              Review your recent account activity to ensure your account remains secure. If you don't recognize an activity, we recommend signing out of all other sessions.
            </p>
          </div>
          <button
            onClick={handleLogoutAll}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#ba1a1a] text-[#ba1a1a] font-semibold text-[13px] rounded-lg hover:bg-[#ba1a1a]/10 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out of All Other Sessions
          </button>
        </div>

        <div className="bg-[#ffffff] rounded-xl border border-[#c2c6d3] shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#c2c6d3] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004287]">history</span>
              <h2 className="text-[18px] leading-[24px] font-semibold text-[#121c2a]">Activity Log</h2>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424751] text-[18px]">search</span>
                <input
                  className="pl-9 pr-3 py-1.5 border border-[#c2c6d3] rounded-lg text-[13px] font-medium focus:ring-2 focus:ring-[#004287]/20 focus:border-[#004287] outline-none bg-[#f8f9ff] transition-all w-full sm:w-48"
                  placeholder="Search logs..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-1.5 border border-[#c2c6d3] rounded-lg hover:bg-[#f8f9ff] transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eff4ff] border-b border-[#c2c6d3]">
                  <th className="px-5 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Date & Time</th>
                  <th className="px-5 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Device / Browser</th>
                  <th className="px-5 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Location</th>
                  <th className="px-5 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Status</th>
                  <th className="px-5 py-3 text-[11px] leading-[16px] font-semibold text-[#424751] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c6d3]">
                {paginatedData.map((item) => (
                  <tr key={item.id} className={`hover:bg-[#f8f9ff] transition-colors ${item.status === 'failed' ? 'hover:bg-[#ba1a1a]/5' : ''}`}>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[13px] leading-[18px] font-semibold text-[#121c2a]">{item.date}</span>
                        <span className="text-[11px] leading-[16px] font-medium text-[#424751]">
                          {item.time} {item.isCurrent ? '(Current)' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[#424751] text-[20px]">{item.icon}</span>
                        <span className="text-[13px] leading-[18px] font-medium text-[#121c2a]">{item.device}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#424751]">location_on</span>
                        <span className="text-[13px] leading-[18px] font-medium text-[#121c2a]">{item.location}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {item.status === 'success' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#006d40]/10 text-[#006d40] rounded-full text-[11px] leading-[16px] font-semibold border border-[#006d40]/20">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full text-[11px] leading-[16px] font-semibold border border-[#ba1a1a]/20">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {item.isCurrent ? (
                        <span className="text-[11px] leading-[16px] font-medium text-[#424751] italic">
                          Current Session
                        </span>
                      ) : (
                        <button
                          onClick={() => handleLogout(item.id)}
                          className="px-3 py-1 text-[#ba1a1a] hover:underline text-[11px] leading-[16px] font-semibold transition-colors"
                        >
                          Log Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 bg-[#f8f9ff] border-t border-[#c2c6d3] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[12px] leading-[16px] font-medium text-[#424751]">
              Showing {startIndex + 1}-{Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button
                className="p-1.5 border border-[#c2c6d3] rounded-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded-lg text-[12px] leading-[16px] font-semibold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#004287] text-white'
                        : 'hover:bg-white text-[#424751]'
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                className="p-1.5 border border-[#c2c6d3] rounded-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 bg-white rounded-xl border border-[#004287]/20 p-5 flex items-start gap-4 shadow-sm">
            <div className="bg-[#004287]/10 p-2.5 rounded-xl">
              <span className="material-symbols-outlined text-[#004287] text-[28px]">shield_lock</span>
            </div>
            <div>
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#004287] mb-1.5">
                Multi-Factor Authentication
              </h3>
              <p className="text-[13px] leading-[18px] text-[#424751] mb-3">
                You have active sessions across 3 devices. Enable MFA to add an extra layer of protection to your Medorax account.
              </p>
              <button className="text-[#004287] font-semibold text-[13px] leading-[18px] flex items-center gap-1 group">
                <span className="hover:underline">Manage Security Settings</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#c2c6d3] p-5 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="mb-3">
              <div className="h-14 w-14 rounded-full border-4 border-[#004287] border-t-transparent animate-spin flex items-center justify-center">
                <span className="material-symbols-outlined text-[#004287] text-[28px]">update</span>
              </div>
            </div>
            <h3 className="text-[13px] leading-[18px] font-bold text-[#121c2a]">Auto-Refresh Active</h3>
            <p className="text-[11px] leading-[16px] text-[#424751]">Live monitoring is currently scanning for new login attempts.</p>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}