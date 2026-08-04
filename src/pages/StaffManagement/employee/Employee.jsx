import { useState } from "react";
import { Search } from "lucide-react";
import StaffHeader from "../../../components/staffManagement/StaffHeader";
import StaffCard from "../../../components/staffManagement/StaffCard";
import StaffModal from "../../../components/staffManagement/StaffModal";

// eslint-disable-next-line react-refresh/only-export-components
export const initialStaffData = [
  {
    id: "STF-001",
    name: "Dr. Sarah Chen",
    code: "STF-1001",
    role: "Doctor",
    department: "Cardiology",
    email: "s.chen@oceanhealth.com",
    phone: "+1 (555) 234-5678",
    address: "102 Medical Plaza, Boston, MA",
    license: "MD-12345",
    status: "Active",
    rating: 4.9,
    yearsOfService: "5.2 years",
    certifications: "12",
    lastShift: "2026-08-01",
    documents: "4",
    description: "Board-certified cardiologist specializing in interventional cardiology and cardiac imaging."
  },
  {
    id: "STF-002",
    name: "James Wilson",
    code: "STF-1002",
    role: "Nurse",
    department: "Emergency",
    email: "j.wilson@oceanhealth.com",
    phone: "+1 (555) 876-5432",
    address: "45 Healthcare Ave, Chicago, IL",
    license: "RN-9876",
    status: "Active",
    rating: 4.8,
    yearsOfService: "3.5 years",
    certifications: "8",
    lastShift: "2026-08-01",
    documents: "5",
    description: "Registered nurse with expertise in emergency trauma care and patient triage."
  },
  {
    id: "STF-003",
    name: "Amanda Torres",
    code: "STF-1003",
    role: "Administrator",
    department: "Administration",
    email: "a.torres@oceanhealth.com",
    phone: "+1 (555) 432-1098",
    address: "88 Hospital Drive, San Diego, CA",
    license: "ADM-5544",
    status: "On Leave",
    rating: 4.6,
    yearsOfService: "7.1 years",
    certifications: "6",
    lastShift: "2026-07-28",
    documents: "3",
    description: "Healthcare administrator managing department operations and staff scheduling."
  },
  {
    id: "STF-004",
    name: "Michael Patel",
    code: "STF-1004",
    role: "Technician",
    department: "Radiology",
    email: "m.patel@oceanhealth.com",
    phone: "+1 (555) 901-2345",
    address: "12 Imaging Center, Dallas, TX",
    license: "TECH-3322",
    status: "Active",
    rating: 4.7,
    yearsOfService: "4.8 years",
    certifications: "9",
    lastShift: "2026-08-01",
    documents: "6",
    description: "Radiology technician specializing in MRI and CT scan operations."
  },
  {
    id: "STF-005",
    name: "Elena Rostova",
    code: "STF-1005",
    role: "Doctor",
    department: "Neurology",
    email: "e.rostova@oceanhealth.com",
    phone: "+1 (555) 555-0199",
    address: "77 Brain Institute, Seattle, WA",
    license: "MD-7788",
    status: "Active",
    rating: 4.9,
    yearsOfService: "8.3 years",
    certifications: "15",
    lastShift: "2026-07-30",
    documents: "7",
    description: "Neurologist with specialization in epilepsy and movement disorders."
  },
  {
    id: "STF-006",
    name: "David Kim",
    code: "STF-1006",
    role: "Nurse",
    department: "Pediatrics",
    email: "d.kim@oceanhealth.com",
    phone: "+1 (555) 222-0123",
    address: "33 Children's Way, Portland, OR",
    license: "RN-4433",
    status: "Inactive",
    rating: 4.3,
    yearsOfService: "2.1 years",
    certifications: "5",
    lastShift: "2026-06-15",
    documents: "4",
    description: "Pediatric nurse with experience in neonatal intensive care."
  }
];

const Employee = () => {
  const [staff, setStaff] = useState(initialStaffData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    role: "Doctor",
    department: "Cardiology",
    email: "",
    phone: "",
    address: "",
    license: "",
    status: "Active",
    description: ""
  });

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      code: "",
      role: "Doctor",
      department: "Cardiology",
      email: "",
      phone: "",
      address: "",
      license: "",
      status: "Active",
      description: ""
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setSelectedStaff(member);
    setFormData({
      name: member.name,
      code: member.code,
      role: member.role,
      department: member.department,
      email: member.email,
      phone: member.phone,
      address: member.address,
      license: member.license,
      status: member.status,
      description: member.description
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setStaff((prev) =>
      prev.map((s) =>
        s.id === selectedStaff.id ? { ...s, ...formData } : s
      )
    );
    setIsEditModalOpen(false);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = {
      id: `STF-00${staff.length + 1}`,
      code: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      rating: 5.0,
      yearsOfService: "0 years",
      certifications: "0",
      lastShift: "N/A",
      documents: "0"
    };
    setStaff([newStaff, ...staff]);
    setIsAddModalOpen(false);
  };

  const filteredStaff = staff.filter((member) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query) ||
      member.code.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      <StaffHeader onAddClick={handleOpenAdd} />

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search staff by name, role, department, or ID..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((member) => (
          <StaffCard
            key={member.id}
            staff={member}
            onEditClick={handleOpenEdit}
          />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
          <p className="text-base font-semibold text-slate-600">
            No staff members found
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Try adjusting your search query.
          </p>
        </div>
      )}

      <StaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Manage Staff Profile"
        subtitle="Update role, department, contact, and status."
        onSubmit={handleSaveEdit}
        formData={formData}
        setFormData={setFormData}
        submitLabel="Save Changes"
      />

      <StaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Staff"
        subtitle="Register a new team member in your staff directory."
        onSubmit={handleAddStaff}
        formData={formData}
        setFormData={setFormData}
        submitLabel="Add Staff"
      />
    </div>
  );
};

export default Employee;