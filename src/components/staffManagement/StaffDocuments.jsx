import { FileText, Download, ExternalLink } from "lucide-react";

const DOCUMENT_STATUS_STYLES = {
  Valid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Expired: "bg-red-50 text-red-700 ring-1 ring-red-200",
  "Pending": "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
};

const StaffDocuments = ({ staff }) => {
  const documents = [
    {
      id: 1,
      name: "Medical License",
      type: "PDF",
      date: "2025-03-15",
      status: "Valid",
      file: "license_md_1029.pdf"
    },
    {
      id: 2,
      name: "Board Certification",
      type: "PDF",
      date: "2024-11-20",
      status: "Valid",
      file: "cert_board_2024.pdf"
    },
    {
      id: 3,
      name: "BLS Certification",
      type: "PDF",
      date: "2023-08-10",
      status: "Expired",
      file: "bls_cert_2023.pdf"
    },
    {
      id: 4,
      name: "Malpractice Insurance",
      type: "PDF",
      date: "2025-01-05",
      status: "Valid",
      file: "insurance_2025.pdf"
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Staff Documents
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Certifications and credentials for {staff.name}
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
          <FileText size={14} />
          <span>Upload</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-xs text-slate-500">
              <th className="px-6 py-3.5 text-left font-semibold">Document</th>
              <th className="px-6 py-3.5 text-left font-semibold">Type</th>
              <th className="px-6 py-3.5 text-left font-semibold">Date</th>
              <th className="px-6 py-3.5 text-center font-semibold">Status</th>
              <th className="px-6 py-3.5 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="group border-b border-slate-100 transition-colors last:border-b-0 hover:bg-[#F8FCFF]/60"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <FileText size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {doc.name}
                      </p>
                      <p className="font-mono text-xs text-slate-400">
                        {doc.file}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{doc.date}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      DOCUMENT_STATUS_STYLES[doc.status] ||
                      DOCUMENT_STATUS_STYLES.Pending
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                      <Download size={14} />
                    </button>
                    <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDocuments;
