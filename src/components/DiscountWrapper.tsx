"use client"
import { useDashboardState } from "@/components/dashboard/state"; // Import the context hook
import Cookies from 'js-cookie'; // Import for cookie management
import { useEffect, useState } from 'react';
import DiscountModal from './DiscountModal';


export default function DiscountWrapper() {
  const [showModal, setShowModal] = useState(false); // Initialize modal visibility state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Access user data from the dashboard state
  const { userData } = useDashboardState(); // Get user data from context
  const hasSubscriptions = userData?.subscriptions?.length > 0; // Check if subscriptions exist

  useEffect(() => {
    // Check if the user is logged in by checking for a token in cookies
    const token = Cookies.get('token'); // Use js-cookie to get the token
    setIsLoggedIn(!!token); // Determine if the user is logged in
    
    console.log('here', isLoggedIn, hasSubscriptions)

    // Show the modal if the user is not logged in or if they are logged in and have no subscriptions
    if ((!isLoggedIn || !hasSubscriptions)) {
      console.log('here')
      // Set timeout for 10 seconds
      const timer = setTimeout(() => {
        setShowModal(true);
        // Store that the modal has been shown
        localStorage.setItem('discountModalShown', 'true');
      }, 1000);

      // Cleanup timer
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, hasSubscriptions]); // Dependency on isLoggedIn and hasSubscriptions

  return (
    <DiscountModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      isLoggedIn={isLoggedIn}
    />
  );
}