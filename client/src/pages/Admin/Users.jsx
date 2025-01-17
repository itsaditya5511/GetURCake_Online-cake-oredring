import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout.jsx";
import axios from "axios";

const Users = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch users based on search email
  const fetchUsersByEmail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/users/get-users/email/${searchEmail}`);
      setUsers(data.users);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchUsersByEmail();
  }, []);

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsersByEmail();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by email..."
                  value={searchEmail}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {users.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td> {/* Assuming the backend returns 'phone' field */}
                        <td>{user.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
