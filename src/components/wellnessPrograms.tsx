"use client"
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ChoosePlanLoggedOut from './choosePlanLoggedOut';
//import { cache } from "react";


interface ProgramCardProps {
  _id: string;
  id: string;
  title: string;
  image: string;
  benefits: string[];
  price: string;
  originalPrice: string;
  isPremium: boolean;
}
  
interface ProgramPlans {
  _id: string;
  plans: {
    _id: string;
    image: string;
    description: string;
    features: string[];
    name: string;
    amount: number;
  };
} 

const ProgramCard = ({ _id, id, title, image, benefits, price, originalPrice, isPremium }: ProgramCardProps) => {
  const [choosePlanVisible, setChoosePlanVisible] = useState(false);
  const handleOpenChoosePlan = () => {
    setChoosePlanVisible(true);
  };

  const handleCloseChoosePlan = () => {
    setChoosePlanVisible(false);
  };

  return (
    <>
      {choosePlanVisible && (
        <ChoosePlanLoggedOut 
          _id={_id}
          planId={id}
          visible={choosePlanVisible}
          onClose={() => setChoosePlanVisible(false)}
        />
      )}
      <div className="rounded-lg bg-gradient-to-br from-[#2E4061] to-[#46256E] p-6 flex flex-col h-full mb-5 pb-5">
        {/* Image at the top */}
        <div className="relative mb-4 flex-start">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Title below the image */}
        <h3 className="text-2xl text-white mb-2">{title}</h3>                         
        
        {/* Benefits section */}
        <div className="mt-4 flex-grow">
          <h4 className="text-gray-300 mb-2">Key Benefits</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <img src='/award_star.png' alt='award' />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Price section */}
        <div className="mt-4 mb-4">
          <span className="text-2xl text-white">₹{price}</span>
          {/* Uncomment if you want to show the original price */}
          {/* <span className="text-gray-400 line-through">₹{originalPrice}</span> */}
        </div>

        {/* Buy Now button at the bottom */}
        <button 
          className="w-full mt-auto bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition" 
          style={{ backgroundColor: '#514ED8' }} 
          onClick={handleOpenChoosePlan}
        >
          Buy Now
        </button>
      </div>
    </>
  );
};
  
  interface ScrollButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled: boolean;
  }
  
  const ScrollButton = ({ direction, onClick, disabled }: ScrollButtonProps) => {
    return (
      <button
        type="button"
        onClick={(e) => {
          //e.preventDefault();
          onClick();
        }}
        disabled={disabled}
        className={`
          w-10 h-10
          flex items-center justify-center
          rounded-full
          transition-all duration-200
          ${disabled 
            ? 'bg-[#1a1b2b] text-gray-600 cursor-not-allowed opacity-50' 
            : 'bg-[#1a1b2b] text-white hover:bg-[#2a2b3b] cursor-pointer'}
          shadow-lg
        `}
      >
        {direction === 'left' ? (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 19l-7-7 7-7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 5l7 7-7 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  };
  
// Update the ScrollButtons component to manage its own state
const ScrollButtons = memo(({ scrollContainerRef }: {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, [scrollContainerRef]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 500);
    }
  }, [scrollContainerRef, checkScroll]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll, scrollContainerRef]);

  return (
    <div className="absolute right-0 bottom-0 flex gap-2 mb-4 mr-4 z-20">
      <ScrollButton 
        direction="left" 
        onClick={() => scroll('left')} 
        disabled={!canScrollLeft}
      />
      <ScrollButton 
        direction="right" 
        onClick={() => scroll('right')} 
        disabled={!canScrollRight}
      />
    </div>
  );
});

ScrollButtons.displayName = 'ScrollButtons';

const WellnessPrograms = () => {
  const [programPlans, setProgramPlans] = useState<ProgramPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans/detailed-plans');
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setProgramPlans(result.data);
        } else {
          console.error('Invalid data format received:', result);
          setProgramPlans([]);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        setProgramPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return (
    <div className="py-12 flex justify-center items-center">
      <div className="text-white text-xl">Loading programs...</div>
    </div>
  );

  if (!programPlans || programPlans.length === 0) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="text-white text-xl">No programs available</div>
      </div>
    );
  }

  return (
    <div className="py-12 relative" style={{ background: 'radial-gradient(105.3% 100.58% at 46.93% -2.82%, #000000 0%, #00204A 100%), radial-gradient(85.05% 102.28% at 51.16% 0%, rgba(44, 82, 156, 0.2) 0%, rgba(36, 48, 87, 0.2) 100%)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Popular Choices for Your Wellness Journey
        </h2>
        <p className="text-gray-400 text-xl mb-8">
          Discover our top picks to elevate your health and wellness.
        </p>
        
        <div className="relative">
          <ScrollButtons scrollContainerRef={scrollContainerRef} />
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scroll-smooth hide-scrollbar pb-14"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {programPlans?.map((program) => (
              <div key={program._id} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-grow">
                <ProgramCard 
                  _id={program.plans._id}
                  id={program._id}
                  title={program.plans.name || 'Unnamed Program'}
                  image={program.plans.image || '/placeholder-image.jpg'}
                  benefits={program.plans.features || ['No benefits listed']}
                  price={(program.plans.amount / 100)?.toString() || '0'}
                  originalPrice={(program.plans.amount ? (program.plans.amount / 100 * 1.15).toFixed(0) : '0')}
                  isPremium={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default WellnessPrograms;