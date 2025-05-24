import React, { useContext, useEffect } from 'react';
import { DriverAppContext } from '../context/DriverContext';
import { User, Phone, MapPin, Car, CheckCircle, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  const { driver, dtoken, refetchDriver } = useContext(DriverAppContext);

  useEffect(() => {
    if (dtoken && !driver) {
      refetchDriver(); // Ensure driver details are fetched when dashboard loads
    }
  }, [dtoken, driver, refetchDriver]);

  console.log(driver)


  if (!driver) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Loading driver details...</p>
      </div>
    );
  }

  // Ensure fallback values to avoid undefined or NaN errors
  const name = driver?.name || 'N/A';
  const id=driver?._id || 'N/A';
  const phone = driver?.phone || 'N/A';
  const vehicle = driver?.vehicle || 'Not Registered';
  const status = driver?.status || 'unknown';
  const bookingsCount = Array.isArray(driver?.bookingsAssigned) ? driver?.bookingsAssigned.length : 0;

  return (
    <div className="min-h-screen p-2 md:p-8">
      <div className="max-w-5xl mx-auto transition">
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">Driver Dashboard</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-gray-700">
          <div className="flex items-start gap-4">
            <User className="text-blue-600 mt-1" />
            <div>
              <p className="font-semibold">Name</p>
              <p>{name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold ">Id</p>
              <p className='text-green-600'>{id}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-yellow-600 mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>{phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Car className="text-purple-600 mt-1" />
            <div>
              <p className="font-semibold">Vehicle</p>
              <p>{vehicle}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <CheckCircle className="text-indigo-600 mt-1" />
            <div>
              <p className="font-semibold">Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-white text-sm ${
                  status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ClipboardList className="text-pink-600 mt-1" />
            <div>
              <p className="font-semibold text-lg">Bookings Assigned</p>
              <p>{bookingsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
