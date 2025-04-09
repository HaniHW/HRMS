// /*import React, { useState, useEffect } from "react";
// import { FaSearch, FaUserCircle, FaFilter, FaEdit, FaTrash, FaSyncAlt } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmployeeDashboard = () => {
//   const [employees, setEmployees] = useState([]);  // Start with empty employee list
//   const [loading, setLoading] = useState(false);    // State for loading
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");  // For department filter
//   const [statusFilter, setStatusFilter] = useState("");  // For status filter
//   const [showFilterMenu, setShowFilterMenu] = useState(false); // Show filter menu toggle
//   const navigate = useNavigate();

//   // Static data for testing
//   const staticData = [
//     { _id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "Development", jobTitle: "Software Engineer", workLocation: "Remote", status: "Remote" },
//     { _id: "2", firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Design", jobTitle: "UI/UX Designer", workLocation: "On-Site", status: "On-Site" },
//     { _id: "3", firstName: "Ali", lastName: "Khan", email: "ali.khan@example.com", department: "Sales", jobTitle: "Sales Manager", workLocation: "Remote", status: "Remote" }
//   ];

//   // Fetch employees data from the backend
//   const fetchEmployees = async () => {
//     setLoading(true);  // Set loading to true while fetching data
//     try {
//       const response = await axios.get("http://localhost:5000/employees/All-employee");
//       console.log(response.data); 
//       if (response.data.success) {
//         setEmployees(response.data.employees);  // Assuming 'employees' is the field in your response data
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       // Use static data in case of error
//       setEmployees(staticData);
//     } finally {
//       setLoading(false); // Set loading to false once the fetching is complete
//     }
//   };

//   // Use useEffect to fetch employees on page load

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//     fetchEmployees();
//   },[]);  // Empty dependency array to fetch data once on component mount

//   // Remove employee from the list
//   const removeEmployee = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/employees/${id}`);
//       if (response.data.success) {
//         setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id)); // Assuming _id is used
//       }
//     } catch (error) {
//       console.error("Error removing employee:", error);
//     }
//   };

//   // Reset filters and show full employee list
//   const resetFilters = () => {
//     setSearchTerm("");
//     setDepartmentFilter("");
//     setStatusFilter("");
//     setShowFilterMenu(false);  // Close filter menu
//   };

//   // Filter employees based on search term, department, and status
//   const filteredEmployees = employees.filter((emp) => {
//     return (
//       // Improved search condition: Handling empty first or last names.
//       ((emp.firstName && emp.lastName) ? `${emp.firstName} ${emp.lastName}` : "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
//     ) && 
//     (departmentFilter ? emp.department === departmentFilter : true) &&
//     (statusFilter ? emp.status === statusFilter : true);
//   });

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4 bg-light">
//         {/* Top Bar */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4>All Employees</h4>
//           <div className="d-flex gap-3">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <span className="input-group-text">
//                 <FaSearch />
//               </span>
//             </div>
//             <button className="btn btn-primary" onClick={() => navigate("/Add-Employee")}>
//               Add New Employee
//             </button>
//             <button className="btn btn-outline-secondary" onClick={() => setShowFilterMenu(!showFilterMenu)}>
//               <FaFilter /> Filter
//             </button>
//             <button className="btn btn-outline-secondary" onClick={resetFilters}>
//               <FaSyncAlt /> Reset Filters
//             </button>
//             <FaUserCircle size={30} />
//           </div>
//         </div>

//         {/* Filter Options Dropdown */}
//         {showFilterMenu && (
//           <div className="bg-light p-3 rounded shadow-sm mb-3">
//             <div className="d-flex gap-3">
//               <select
//                 className="form-select"
//                 value={departmentFilter}
//                 onChange={(e) => setDepartmentFilter(e.target.value)}
//               >
//                 <option value="">Select Department</option>
//                 <option value="Design">Design</option>
//                 <option value="Development">Development</option>
//                 <option value="Sales">Sales</option>
//               </select>
//               <select
//                 className="form-select"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">Select Status</option>
//                 <option value="Remote">Remote</option>
//                 <option value="On-Site">On-Site</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* Employee Table */}
//         <div className="bg-white p-3 rounded shadow-sm">
//           {loading ? (
//             <div>Loading...</div>  // Show loading text while data is fetching
//           ) : (
//             <div className="table-responsive">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>Email Address</th>
//                     <th>Department</th>
//                     <th>Designation</th>
//                     <th>Type</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredEmployees.length === 0 ? (
//                     <tr><td colSpan="7">No employees found.</td></tr>
//                   ) : (
//                     filteredEmployees.map((emp, index) => (
//                       <tr key={index}>
//                         <td>{`${emp.firstName} ${emp.lastName}`}</td>  {/* Combine firstName and lastName */}
//                         <td>
//                           <a href={`mailto:${emp.email}`} style={{ color: 'blue', textDecoration: 'none' }}>
//                             {emp.email || 'No Email'}  {/* Display 'No Email' if email is not available */}
//                           </a>
//                         </td>
//                         <td>{emp.department}</td>
//                         <td>{emp.jobTitle}</td>
//                         <td>{emp.workLocation}</td>
//                         <td>
//                           {/* Added flexible badge handling */}
//                           <span className={`badge ${emp.status === 'Remote' ? 'bg-primary' : emp.status === 'On-Site' ? 'bg-success' : 'bg-secondary'}`}>
//                             {emp.status || 'Office'}
//                           </span>
//                         </td>
//                         <td>
//                           <FaEdit className="text-warning me-2" />
//                           <FaTrash 
//                             className="text-danger" 
//                             onClick={() => removeEmployee(emp._id)} // Using _id from the response
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


// */











import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaFilter, FaEdit, FaTrash, FaSyncAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
  // Static Employee Data
  const staticEmployees = [
    { id: 1, firstName: "Darlene", lastName: "Robertson", email: "darlene.robertson@example.com", department: "Design", jobTitle: "UI/UX Designer", workLocation: "On-Site", status: "Remote" },
    { id: 2, firstName: "Floyd", lastName: "Miles", email: "floyd.miles@example.com", department: "Development", jobTitle: "PHP Developer", workLocation: "Remote", status: "Remote" },
    { id: 3, firstName: "Cody", lastName: "Fisher", email: "cody.fisher@example.com", department: "Sales", jobTitle: "Sales Manager", workLocation: "On-Site", status: "Remote" },
    { id: 4, firstName: "Dianne", lastName: "Russell", email: "dianne.russell@example.com", department: "Sales", jobTitle: "BDM", workLocation: "On-Site", status: "Remote" },
    { id: 5, firstName: "Jacob", lastName: "Jones", email: "jacob.jones@example.com", department: "Development", jobTitle: "Python Developer", workLocation: "On-Site", status: "Remote" },
  ];

  const [employees, setEmployees] = useState(staticEmployees);  // Start with static data
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");  // For department filter
  const [statusFilter, setStatusFilter] = useState("");  // For status filter
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Show filter menu toggle
  const navigate = useNavigate();

  // Fetch employees data from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees/All-employee");
      setEmployees([...staticEmployees, ...response.data]);  // Combine static and fetched data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Use useEffect to fetch employees on page load
  useEffect(() => {
    fetchEmployees();
  },[]);  // Empty dependency array to fetch data once on component mount

  // Remove employee from the list
  const removeEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  // Reset filters and show full employee list
  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setStatusFilter("");
    setShowFilterMenu(false);  // Close filter menu
  };

  // Filter employees based on search term, department, and status
  const filteredEmployees = employees.filter((emp) => {
    return (
      (emp.firstName + " " + emp.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
    ) && 
    (departmentFilter ? emp.department === departmentFilter : true) &&
    (statusFilter ? emp.status === statusFilter : true);
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
       <div className="flex-grow-1 p-4 bg-light">
        {/* Top Bar */}
       <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>All Employees</h4>
          <div className="d-flex gap-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>
            <button className="btn btn-primary" onClick={() => navigate("/Add-Employee")}>
              Add New Employee
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setShowFilterMenu(!showFilterMenu)}>
              <FaFilter /> Filter
            </button>
            <button className="btn btn-outline-secondary" onClick={resetFilters}>
              <FaSyncAlt /> Reset Filters
            </button>
            <FaUserCircle size={30} />
          </div>
        </div>

        {/* Filter Options Dropdown */}
          {showFilterMenu && (
          <div className="bg-light p-3 rounded shadow-sm mb-3">
            <div className="d-flex gap-3">
              <select
                className="form-select"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Sales">Sales</option>
              </select>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
          </div>
        )}

        {/* Employee Table */}
    /   <div className="bg-white p-3 rounded shadow-sm">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={index}>
                    <td>{`${emp.firstName} ${emp.lastName}`}</td>  {/* Combine firstName and lastName */}
                    <td>
                    <a href={`mailto:${emp.email}`} style={{ color: 'blue', textDecoration: 'none' }}>
                        {emp.email || 'No Email'}  {/* Display 'No Email' if email is not available */}
               </a>
                    </td>
                    <td>{emp.department}</td>
                    <td>{emp.jobTitle}</td>
                    <td>{emp.workLocation}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Remote' ? 'bg-primary' : 'bg-success'}`}>
                        {emp.status || 'Office'}
                      </span>
                    </td>
                    <td>
                      <FaEdit className="text-warning me-2" />
                      <FaTrash 
                        className="text-danger" 
                        onClick={() => removeEmployee(emp.id)} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
