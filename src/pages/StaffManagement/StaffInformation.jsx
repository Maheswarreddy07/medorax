import { useState } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";

import { initialStaffData } from "./employee/Employee";

import StaffProfileHeader from "../../components/staffManagement/employee/StaffProfileHeader";
import StaffOverviewCards from "../../components/staffManagement/employee/StaffOverviewCards";
import StaffContactCard from "../../components/staffManagement/employee/StaffContactCard";
import StaffDocuments from "../../components/staffManagement/employee/StaffDocuments";
import StaffModal from "../../components/staffManagement/employee/StaffModal";

const StaffInformation = () => {
  const { staffId } = useParams();
  const location = useLocation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const staffFromState = location.state?.staff;
  const staffFromList = initialStaffData.find(
    (member) => member.id === staffId
  );

  const staff = staffFromState || staffFromList;

  if (!staff) {
    return <Navigate to="/staff/directory" replace />;
  }

  const handleOpenEdit = () => {
    setFormData({
      name: staff.name,
      code: staff.code,
      role: staff.role,
      department: staff.department,
      email: staff.email,
      phone: staff.phone,
      address: staff.address,
      license: staff.license,
      status: staff.status,
      description: staff.description
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <StaffProfileHeader staff={staff} onEditClick={handleOpenEdit} />

      <StaffOverviewCards staff={staff} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <StaffContactCard staff={staff} />
        </div>

        <div className="xl:col-span-2">
          <StaffDocuments staff={staff} />
        </div>
      </div>

      {formData && (
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
      )}
    </div>
  );
};

export default StaffInformation;