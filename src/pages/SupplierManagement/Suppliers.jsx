import { useState } from "react";
import SupplierHeader from "../../components/supplierManagement/suppliers/SupplierHeader";
import SupplierCard from "../../components/supplierManagement/suppliers/SupplierCard";
import SupplierModal from "../../components/supplierManagement/suppliers/SupplierModal";

// eslint-disable-next-line react-refresh/only-export-components
export const initialSuppliersData = [
  {
    id: "SUP-001",
    name: "PharmaCorp Global Ltd.",
    code: "PCG-9842",
    category: "Pharmaceuticals",
    contactPerson: "Dr. Sarah Jenkins",
    email: "sarah.j@pharmacorp.com",
    phone: "+1 (555) 234-5678",
    address: "102 Innovation Way, BioTech Park, Boston, MA 02110",
    balance: "$450,230.00",
    totalOrders: 128,
    status: "Active",
    rating: 4.9,
    gstin: "27AAACP1234H1Z5",
    paymentTerms: "Net 30 Days",
    lastOrderDate: "2026-07-28",
    description: "Primary provider of active pharmaceutical ingredients (APIs), specialized vaccines, and high-purity clinical reagents."
  },
  {
    id: "SUP-002",
    name: "MediEquip Supplies Inc.",
    code: "MES-3104",
    category: "Medical Equipment",
    contactPerson: "James Chen",
    email: "jchen@mediequip.org",
    phone: "+1 (555) 876-5432",
    address: "45 Industrial Parkway, Sector 4, Chicago, IL 60601",
    balance: "$12,450.50",
    totalOrders: 64,
    status: "Active",
    rating: 4.7,
    gstin: "07AACCM9876J2Z1",
    paymentTerms: "Net 15 Days",
    lastOrderDate: "2026-07-30",
    description: "Manufacturer and distributor of diagnostic monitors, surgical equipment, ICU ventilators, and hospital grade furniture."
  },
  {
    id: "SUP-003",
    name: "BioGenetics Lab Solutions",
    code: "BGL-7712",
    category: "Reagents & Kits",
    contactPerson: "Amanda Torres",
    email: "a.torres@biogenetics.io",
    phone: "+1 (555) 432-1098",
    address: "88 Research Heights, San Diego, CA 92121",
    balance: "$85,900.00",
    totalOrders: 42,
    status: "Pending Review",
    rating: 4.5,
    gstin: "06AAACB5544K3Z8",
    paymentTerms: "Net 45 Days",
    lastOrderDate: "2026-07-15",
    description: "Specialized genomics testing kits, PCR reagents, molecular assay controls, and custom lab synthesis solutions."
  },
  {
    id: "SUP-004",
    name: "Novanet Healthcare Consumables",
    code: "NHC-1092",
    category: "Consumables",
    contactPerson: "Michael Ross",
    email: "mross@novanethealth.com",
    phone: "+1 (555) 901-2345",
    address: "12 Logistics Blvd, Suite 300, Dallas, TX 75201",
    balance: "$0.00",
    totalOrders: 215,
    status: "Active",
    rating: 4.8,
    gstin: "33AAACN3322L4Z9",
    paymentTerms: "Immediate",
    lastOrderDate: "2026-08-01",
    description: "Bulk supplier of sterile PPE, syringes, IV tubing, blood collection tubes, and emergency surgical disposables."
  },
  {
    id: "SUP-005",
    name: "Apex Diagnostics & Instruments",
    code: "ADI-5541",
    category: "Medical Equipment",
    contactPerson: "Elena Rostova",
    email: "e.rostova@apexdiag.de",
    phone: "+49 30 1234567",
    address: "Kaiser-Friedrich-Straße 12, Berlin, Germany",
    balance: "$112,000.00",
    totalOrders: 19,
    status: "Inactive",
    rating: 4.1,
    gstin: "99AAACA1111A1Z0",
    paymentTerms: "Advance",
    lastOrderDate: "2026-05-10",
    description: "European precision laboratory analyzers, automated blood cell counters, and centrifugation platforms."
  }
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliersData);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Pharmaceuticals",
    address: "",
    paymentTerms: "Net 30 Days",
    gstin: "",
    status: "Active",
    description: ""
  });

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      category: "Pharmaceuticals",
      address: "",
      paymentTerms: "Net 30 Days",
      gstin: "",
      status: "Active",
      description: ""
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      category: supplier.category,
      address: supplier.address,
      paymentTerms: supplier.paymentTerms,
      gstin: supplier.gstin,
      status: supplier.status,
      description: supplier.description
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === selectedSupplier.id ? { ...s, ...formData } : s
      )
    );
    setIsEditModalOpen(false);
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const newSup = {
      id: `SUP-00${suppliers.length + 1}`,
      code: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      balance: "$0.00",
      totalOrders: 0,
      rating: 5.0,
      lastOrderDate: "N/A"
    };
    setSuppliers([newSup, ...suppliers]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <SupplierHeader onAddClick={handleOpenAdd} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onEditClick={handleOpenEdit}
          />
        ))}
      </div>

      <SupplierModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Manage Supplier Profile"
        subtitle="Update operational contact, status, and terms."
        onSubmit={handleSaveEdit}
        formData={formData}
        setFormData={setFormData}
        submitLabel="Save Changes"
      />

      <SupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Supplier"
        subtitle="Register a new vendor in your supplier directory."
        onSubmit={handleAddSupplier}
        formData={formData}
        setFormData={setFormData}
        submitLabel="Add Supplier"
      />
    </div>
  );
};

export default Suppliers;
