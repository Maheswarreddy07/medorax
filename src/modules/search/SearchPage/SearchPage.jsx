import { useState } from 'react';
import { Search, ChevronDown, Pill, Users, Receipt } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const hasQuery = query.trim().length > 0;

  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-8 p-4 sm:p-6">
      <div className="relative bg-white rounded flex items-center gap-1 p-2 border border-[#c2c6d3] focus-within:ring-2 focus-within:ring-[#d6e3ff] focus-within:border-[#004287] transition-all w-full max-w-2xl mx-auto">
        <Search size={20} className="text-[#424751] ml-2 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicines, customers..."
          className="flex-1 min-w-0 border-none focus:ring-0 bg-transparent text-[#121c2a] placeholder:text-[#424751] px-3 outline-none"
        />

        <div className="hidden sm:flex items-center flex-shrink-0">
          <div className="h-8 w-px bg-[#c2c6d3] mx-2"></div>
          <div className="relative">
            <select className="appearance-none bg-transparent border-none focus:ring-0 text-[#424751] pr-8 pl-2 cursor-pointer hover:text-[#004287] transition-colors outline-none">
              <option>All Categories</option>
              <option>Medicines</option>
              <option>Customers</option>
              <option>Suppliers</option>
              <option>Bills</option>
              <option>Purchases</option>
              <option>Staff</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#424751]" />
          </div>
        </div>

        <button className="ml-1 rounded p-2 px-4 text-white hover:opacity-90 transition-opacity flex items-center justify-center bg-[#004287] flex-shrink-0">
          <Search size={18} />
        </button>
      </div>

      {!hasQuery && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={64} className="text-[#d6e3ff] mb-4" />
          <h2 className="text-xl text-[#121c2a] font-bold mb-2">Start typing to search across Medorax</h2>
          <p className="text-[#424751] mb-8 max-w-md">
            Quickly find records across all your pharmacy modules by typing in the search bar above.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-2xl">
            <div className="flex-1 bg-white rounded p-2 sm:p-4 border border-[#c2c6d3] hover:border-[#004287] transition-colors cursor-pointer flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287]">
                <Pill size={20} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#121c2a]">Medicines</span>
            </div>
            <div className="flex-1 bg-white rounded p-2 sm:p-4 border border-[#c2c6d3] hover:border-[#004287] transition-colors cursor-pointer flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287]">
                <Users size={20} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#121c2a]">Customers</span>
            </div>
            <div className="flex-1 bg-white rounded p-2 sm:p-4 border border-[#c2c6d3] hover:border-[#004287] transition-colors cursor-pointer flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287]">
                <Receipt size={20} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#121c2a]">Bills</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {hasQuery && (
        <div className="flex flex-col gap-6 pb-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-[#424751] uppercase tracking-wider pl-2 font-semibold">Medicines (2 results)</h3>
            <div className="bg-white rounded border border-[#c2c6d3] overflow-hidden flex flex-col">
              <div className="p-4 hover:bg-[#eff4ff] border-b border-[#c2c6d3] flex items-center gap-4 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287] flex-shrink-0">
                  <Pill size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#121c2a] truncate">Amoxicillin 500mg</div>
                  <div className="text-sm text-[#424751] truncate">ID: MED-0042 • Antibiotics</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-sm text-[#006d40]">In Stock: 240</div>
                  <div className="text-sm text-[#424751]">$12.50 / unit</div>
                </div>
              </div>
              <div className="p-4 hover:bg-[#eff4ff] flex items-center gap-4 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287] flex-shrink-0">
                  <Pill size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#121c2a] truncate">Aspirin 81mg</div>
                  <div className="text-sm text-[#424751] truncate">ID: MED-0105 • Pain Relievers</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-sm text-[#ba1a1a]">Low Stock: 15</div>
                  <div className="text-sm text-[#424751]">$4.00 / unit</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-[#424751] uppercase tracking-wider pl-2 font-semibold">Customers (2 results)</h3>
            <div className="bg-white rounded border border-[#c2c6d3] overflow-hidden flex flex-col">
              <div className="p-4 hover:bg-[#eff4ff] border-b border-[#c2c6d3] flex items-center gap-4 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287] flex-shrink-0">
                  <Users size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#121c2a] truncate">Sarah Jenkins</div>
                  <div className="text-sm text-[#424751] truncate">ID: CUS-9921 • (555) 019-2834</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-sm text-[#121c2a]">Last Visit: Today</div>
                  <div className="text-sm text-[#424751]">3 Active Prescriptions</div>
                </div>
              </div>
              <div className="p-4 hover:bg-[#eff4ff] flex items-center gap-4 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004287] flex-shrink-0">
                  <Users size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#121c2a] truncate">Marcus Smith</div>
                  <div className="text-sm text-[#424751] truncate">ID: CUS-4420 • (555) 882-1045</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-sm text-[#121c2a]">Last Visit: Oct 12</div>
                  <div className="text-sm text-[#424751]">0 Active Prescriptions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}