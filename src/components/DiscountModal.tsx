"use client"
import { useEffect, useState } from 'react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

const DiscountModal = ({ isOpen, onClose, isLoggedIn }: DiscountModalProps) => {
  const [discount, setDiscount] = useState<any>(null); // State to hold discount data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>(''); // State for email input
  const [isClaiming, setIsClaiming] = useState<boolean>(false); // State to manage claiming process
  const [claimError, setClaimError] = useState<string | null>(null); // State for claim error
  const [isSending, setIsSending] = useState<boolean>(false); // State to manage sending process
  const [couponCode, setCouponCode] = useState<string | null>(null); // State to hold the coupon code

  useEffect(() => {
    const fetchDiscount = async () => {
      if (isOpen) {
        try {
          const response = await fetch('/api/discounts/get-discount');
          const result = await response.json();

          if (result.success) {
            setDiscount(result.data);
          } else {
            setError('Failed to fetch discount.');
          }
        } catch (error) {
          setError('An error occurred while fetching the discount.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDiscount();
  }, [isOpen]); // Fetch discount when the modal opens

  const handleClaimOffer = async () => {
    if (isLoggedIn) {
        try {
            setIsSending(true); // Set sending state to true
            const response = await fetch('/api/discounts/request-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    discountId: discount._id, // Assuming discount._id is the discount ID
                }),
            });

            const result = await response.json();

            if (result.success) {
                setCouponCode(result.couponCode); // Set the received coupon code
            } else {
                setClaimError(result.message || 'Failed to claim discount.');
            }
        } catch (error) {
            setClaimError('An error occurred while claiming the discount.');
        } finally {
            setIsSending(false); // Reset sending state
        }
    } else {
        setIsClaiming(true); // Show the email input field
    }
  };

  const handleSendCoupon = async () => {
    if (!email) {
      setClaimError('Email is required.');
      return;
    }

    setIsSending(true); // Set sending state to true

    try {
      const response = await fetch('/api/discounts/send-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          discountId: discount._id, // Assuming discount._id is the discount ID
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Discount sent successfully!');
        onClose(); // Close the modal after sending
      } else {
        setClaimError(result.message || 'Failed to send discount.');
      }
    } catch (error) {
      setClaimError('An error occurred while sending the discount.');
    } finally {
      setIsSending(false); // Reset sending state
      setIsClaiming(false); // Hide the email input field
      setEmail(''); // Clear the email input
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative max-w-[500px] w-full">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute -top-14 right-0 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#B66DC2]"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M6 18L18 6M6 6l12 12" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="relative bg-gradient-to-r from-[#B66DC2] to-[#5B5BD6] rounded-[32px] overflow-hidden">
          {/* Left notch */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-20 bg-[#1a1b2b] rounded-r-full" />
          
          {/* Right notch */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-20 bg-[#1a1b2b] rounded-l-full" />
          
          <div className="px-8 pt-12 pb-10">
            {/* Content */}
            {loading ? (
              <p className="text-center text-white/90 text-xl mb-12">Loading discount...</p>
            ) : error ? (
              <p className="text-center text-red-500 text-xl mb-12">{error}</p>
            ) : (
              <>
                {couponCode ? ( // Check if couponCode is set
                  <>
                    <h2 className="text-center text-[42px] font-bold text-white mb-6 leading-tight">
                      Your Discount ID:
                    </h2>
                    <p className="text-center text-white/90 text-xl mb-12">
                      {couponCode} {/* Display the discount ID directly */}
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full text-center text-white/70 text-lg hover:text-white/90 transition-colors"
                    >
                      Close
                    </button>
                  </>
                ) : isClaiming ? (
                  <>
                    <h2 className="text-center text-[42px] font-bold text-white mb-6 leading-tight">
                      Claim Your Discount!
                    </h2>
                    
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 mb-4 rounded text-black"
                    />
                    {claimError && <p className="text-red-500 text-center mb-4">{claimError}</p>}
                    
                    <button 
                      onClick={handleSendCoupon}
                      className="w-full bg-white rounded-full py-4 mb-4 text-xl font-medium"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3 text-gray-700" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Discount'
                      )}
                    </button>

                    <button 
                      onClick={() => { setIsClaiming(false); setEmail(''); }}
                      className="w-full text-center text-white/70 text-lg hover:text-white/90 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-center text-[42px] font-bold text-white mb-6 leading-tight">
                      Unlock {discount.value}% Off on<br />Your First Session!
                    </h2>
                    
                    <p className="text-center text-white/90 text-xl mb-12">
                      {discount.description}
                    </p>

                    {/* Dotted line */}
                    <div className="w-full border-t border-white/20 border-dashed mb-12" />

                    <button 
                      onClick={handleClaimOffer}
                      className="w-full bg-white rounded-full py-4 mb-4 text-xl font-medium"
                    >
                      <span className="bg-gradient-to-r from-[#B66DC2] to-[#5B5BD6] bg-clip-text text-transparent">
                        Claim Offer
                      </span>
                    </button>

                    <button 
                      onClick={onClose}
                      className="w-full text-center text-white/70 text-lg hover:text-white/90 transition-colors"
                    >
                      No Thanks, Maybe Later
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;