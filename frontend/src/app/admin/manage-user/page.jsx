"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageUser = () => {
  const [userList, setUserList] = useState([]);

  // Fetch all users
  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getall");
      setUserList(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Delete a user
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/delete/${id}`)
      .then(() => {
        toast.success("User Deleted Successfully");
        fetchUserData(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center font-bold text-4xl text-gray-800 dark:text-white mb-6">
        Manage Users
      </h2>
      <div className="overflow-x-auto bg-white dark:bg-neutral-800 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-neutral-700">
            <tr>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-700 dark:text-gray-300">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
                  {user._id}
                </td>
                <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-base text-gray-700 dark:text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
