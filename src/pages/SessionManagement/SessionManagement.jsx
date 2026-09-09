import { useState } from "react";
import AuthNavbar from "../../components/authentication/shared/AuthNavbar";
import AuthFooter from "../../components/authentication/shared/AuthFooter";
import banner from "../../assets/changePassImg.jpg"

export default function SessionManagement() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "MacBook Pro - Chrome",
      os: "macOS 14.2.1 • 192.168.1.45",
      location: "San Francisco, CA",
      lastActive: "Active Now",
      isCurrent: true,
      icon: "laptop_mac",
      color: "bg-[#004287]/10",
      textColor: "text-[#004287]",
    },
    {
      id: 2,
      device: "iPhone 15 - Safari",
      os: "iOS 17.1 • Mobile App",
      location: "Oakland, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: "smartphone",
      color: "bg-[#f8f9ff]",
      textColor: "text-[#424751]",
    },
    {
      id: 3,
      device: "iPad Air - App",
      os: "iPadOS 17.0 • Medorax Suite",
      location: "San Jose, CA",
      lastActive: "Yesterday, 4:15 PM",
      isCurrent: false,
      icon: "tablet_mac",
      color: "bg-[#f8f9ff]",
      textColor: "text-[#424751]",
    },
    {
      id: 4,
      device: "Windows PC - Edge",
      os: "Windows 11 • Laboratory Terminal",
      location: "Sacramento, CA",
      lastActive: "Oct 24, 2024",
      isCurrent: false,
      icon: "desktop_windows",
      color: "bg-[#f8f9ff]",
      textColor: "text-[#424751]",
    },
  ]);

  const [showConfirm, setShowConfirm] = useState(null);

  const handleRevoke = (id) => {
    setShowConfirm(id);
  };

  const confirmRevoke = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
    setShowConfirm(null);
  };

  const cancelRevoke = () => {
    setShowConfirm(null);
  };

  const revokeAllOthers = () => {
    if (confirm("Are you sure you want to revoke all other sessions?")) {
      setSessions(sessions.filter(session => session.isCurrent));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f9ff] overflow-hidden">
      <AuthNavbar />
      
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4 max-w-[1440px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[24px] leading-[32px] font-semibold text-[#121c2a] mb-1">
              Session Management
            </h1>
            <p className="text-[14px] leading-[20px] font-normal text-[#424751]">
              Manage and revoke active sessions across all your devices to keep your account secure.
            </p>
          </div>
          <button
            onClick={revokeAllOthers}
            className="bg-[#004287] hover:bg-[#1e5aa8] text-white text-[13px] leading-[18px] font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">lock_reset</span>
            Revoke All Other Sessions
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9 bg-[#ffffff] rounded-xl border border-[#c2c6d3] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#c2c6d3] flex justify-between items-center bg-white">
              <h3 className="text-[18px] leading-[24px] font-semibold text-[#121c2a]">
                Active Sessions
              </h3>
              <div className="flex items-center gap-2 text-[#006d40] text-[11px] leading-[16px] font-medium">
                <span className="w-2 h-2 bg-[#006d40] rounded-full animate-pulse"></span>
                {sessions.length} Devices Active
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#eff4ff] text-left">
                    <th className="px-4 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Device & Browser</th>
                    <th className="px-4 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Location</th>
                    <th className="px-4 py-3 text-[11px] leading-[16px] font-semibold text-[#424751]">Last Active</th>
                    <th className="px-4 py-3 text-[11px] leading-[16px] font-semibold text-[#424751] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d3]">
                  {sessions.map((session) => (
                    <tr
                      key={session.id}
                      className={session.isCurrent ? "bg-[#eff4ff]/30" : "hover:bg-[#f8f9ff] transition-colors"}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${session.color} flex items-center justify-center ${session.textColor}`}>
                            <span className="material-symbols-outlined text-[20px]">{session.icon}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] leading-[18px] font-semibold text-[#121c2a]">
                                {session.device}
                              </span>
                              {session.isCurrent && (
                                <span className="px-2 py-0.5 bg-[#004287] text-white text-[9px] font-bold rounded uppercase tracking-wider">
                                  This Device
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] leading-[16px] font-normal text-[#424751]">
                              {session.os}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] leading-[18px] font-normal text-[#424751]">
                        {session.location}
                      </td>
                      <td className="px-4 py-3.5">
                        {session.isCurrent ? (
                          <span className="flex items-center gap-1.5 text-[#006d40] font-medium text-[13px] leading-[18px]">
                            <span className="w-1.5 h-1.5 bg-[#006d40] rounded-full"></span>
                            Active Now
                          </span>
                        ) : (
                          <span className="text-[13px] leading-[18px] font-normal text-[#424751]">
                            {session.lastActive}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {session.isCurrent ? (
                          <span className="text-[12px] leading-[16px] font-normal text-[#737782] italic">
                            Current Session
                          </span>
                        ) : (
                          <>
                            {showConfirm === session.id ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => confirmRevoke(session.id)}
                                  className="text-[#ba1a1a] text-[11px] leading-[16px] font-semibold hover:bg-[#ba1a1a]/10 px-3 py-1 rounded-lg transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={cancelRevoke}
                                  className="text-[#424751] text-[11px] leading-[16px] font-semibold hover:bg-[#f8f9ff] px-3 py-1 rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleRevoke(session.id)}
                                className="text-[#ba1a1a] text-[12px] leading-[16px] font-semibold hover:bg-[#ba1a1a]/10 px-3 py-1 rounded-lg transition-colors"
                              >
                                Revoke Session
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#f8f9ff] border-t border-[#c2c6d3]">
              <p className="text-[12px] leading-[16px] font-normal text-[#424751] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Sessions are automatically terminated after 30 days of inactivity.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="rounded-xl overflow-hidden bg-[#004287]">
              <div className="p-3 flex justify-center items-center">
                <img
                  alt="Security Illustration"
                  className="w-full h-auto object-contain rounded-lg"
                  src={banner}
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="text-[13px] leading-[18px] font-semibold text-[#121c2a] mb-1">
                  Account Protection
                </h4>
                <p className="text-[12px] leading-[16px] font-normal text-[#424751]">
                  Your security is our priority. Monitor your active sessions to prevent unauthorized access.
                </p>
              </div>
            </div>

            <div className="bg-[#004287] text-white rounded-xl p-5 shadow-sm">
              <h4 className="text-[16px] leading-[22px] font-semibold mb-3">
                Security Overview
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined bg-white/20 p-1.5 rounded-lg text-[18px]">
                    verified_user
                  </span>
                  <div>
                    <span className="block text-[13px] leading-[18px] font-semibold">2FA Enabled</span>
                    <span className="text-[12px] leading-[16px] text-white/90">
                      Account is protected by biometric verification.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined bg-white/20 p-1.5 rounded-lg text-[18px]">
                    history
                  </span>
                  <div>
                    <span className="block text-[13px] leading-[18px] font-semibold">Last Login</span>
                    <span className="text-[12px] leading-[16px] text-white/90">
                      Today, 08:34 AM from SF Office.
                    </span>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-white/20" />
              <button className="w-full bg-white text-[#121c2a] text-[13px] leading-[18px] font-semibold py-2.5 rounded-lg hover:bg-opacity-90 transition-colors">
                View Security Log
              </button>
            </div>

            <div className="bg-[#ffffff] border border-[#c2c6d3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-[#006d40] mb-2">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span className="text-[13px] leading-[18px] font-semibold">Pro Tip</span>
              </div>
              <p className="text-[12px] leading-[16px] font-normal text-[#424751]">
                Revoking a session will immediately sign out the device. Any unsaved diagnostic data on that device may be lost.
              </p>
            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}