import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/customers`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(res.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);

      alert(
        error.response.data.message ||
        "Failed to fetch customers"
      );
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD + UPDATE CUSTOMER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/customers/${editId}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Customer Updated Successfully");
        setEditId(null);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/customers`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Customer Added Successfully");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      fetchCustomers();
      setLoading(false);

    } catch (error) {
      setLoading(false);

      alert(
        error.response.data.message ||
        "Operation Failed"
      );
    }
  };

  // DELETE CUSTOMER
  const deleteCustomer = async (id) => {
    try {
      setLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/customers/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Customer Deleted");
      fetchCustomers();
      setLoading(false);

    } catch (error) {
      setLoading(false);

      alert(
        error.response.data.message ||
        "Failed to delete customer"
      );
    }
  };

  // EDIT CUSTOMER
  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company || "",
    });

    setEditId(customer._id);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded w-96 mb-6"
      >
        <h1 className="text-2xl mb-4 font-bold text-center">
          {editId ? "Update Customer" : "Add Customer"}
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          value={formData.name}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          value={formData.phone}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          value={formData.company}
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          {loading
            ? "Loading..."
            : editId
              ? "Update Customer"
              : "Add Customer"}
        </button>
      </form>

      {/* CUSTOMER LIST */}
      <div className="w-96">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white p-4 shadow rounded mb-4"
            >
              <h2 className="text-xl font-bold">
                {customer.name}
              </h2>

              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>Company: {customer.company}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Customers Found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;