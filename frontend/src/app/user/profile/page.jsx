"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    createdAt: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Get email from token without parsing JSON
        const tokenPayload = token.split('.')[1];
        const decodedPayload = atob(tokenPayload);
        const { email } = JSON.parse(decodedPayload);
        
        if (!email) {
          throw new Error('Invalid token data');
        }

        const response = await axios.get(`http://localhost:5000/user/getbyemail/${email}`);
        if (response.data && response.data.length > 0) {
          const user = response.data[0];
          // Create a new object with only the fields we want to display
          setUserData({
            name: user.name || 'N/A',
            email: user.email || 'N/A',
            createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
          });
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error(error.message || 'Failed to load profile data');
        if (error.message === 'Invalid token data') {
          localStorage.removeItem('user');
          router.push('/login');
        }
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
            <p className="mt-1 text-lg text-gray-800 dark:text-white">{userData.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
            <p className="mt-1 text-lg text-gray-800 dark:text-white">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Member Since</label>
            <p className="mt-1 text-lg text-gray-800 dark:text-white">{userData.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;