import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import { SimpleRegistrationForm } from './RegisterForm';

const Home = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3700/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const deleteData = async (userId) => {
    try {
      await axios.delete(`http://localhost:3700/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
  };

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">First Name</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Last Name</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Email</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Age</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Created At</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Updated At</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-4 text-[15px] text-gray-800">{user.Firstname}</td>
              <td className="p-4 text-[15px] text-gray-800">{user.Lastname}</td>
              <td className="p-4 text-[15px] text-gray-800">{user.Email}</td>
              <td className="p-4 text-[15px] text-gray-800">{user.Age}</td>
              <td className="p-4 text-[15px] text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="p-4 text-[15px] text-gray-800">{new Date(user.updatedAt).toLocaleDateString()}</td>
              <td className="p-4">
                <Modal user={user} onUpdate={updateUser} />
                <button className="mr-4" title="Delete" onClick={() => deleteData(user._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    />
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link to="/:id">
        <button
          type="button"
          className="inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] ml-auto"
       >
          Add User
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
