"use client"
import { useEffect, useRef, useState } from 'react';

interface TestimonialProps {
  image: string;
  feedback: string;
  name: string;
  designation: string;
  rating: number;
}

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

const ScrollButton = ({ direction, onClick, disabled }: ScrollButtonProps) => {
  return (
    <button
      onClick={onClick}
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

const TestimonialCard = ({ image, feedback, name, designation, rating }: TestimonialProps) => {
  return (
    <div className="rounded-lg  bg-gradient-to-br from-[#2E4061] to-[#46256E] p-6 flex flex-col">
      <div className="relative mb-4">
        <img 
          src={image} 
          alt={`${name}'s testimonial`} 
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <p className="text-white text-lg mb-4">{feedback}</p>
        <p className="text-white mb-4">Highly recommend.</p>
        
        <div className="flex mb-4">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-500">★</span>
          ))}
        </div>

        <div className="mt-auto">
          <h4 className="text-white text-lg font-semibold">{name}</h4>
          <p className="text-gray-400">{designation}</p>
        </div>
      </div>
    </div>
  );
};

const ClientFeedback = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedbacks/get-feedbacks');
        const result = await response.json();

        if (result.success) {
          // Map the feedback data to the format required by TestimonialCard
          const mappedTestimonials = result.data.map((feedback: any) => ({
            image: feedback.image || '/placeholder-image.jpg', // Fallback image
            feedback: feedback.text,
            name: feedback.name,
            rating: feedback.stars,
          }));
          setTestimonials(mappedTestimonials);
        } else {
          setError('Failed to fetch feedbacks.');
        }
      } catch (error) {
        setError('An error occurred while fetching feedbacks.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="text-white text-xl">Loading feedbacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-12 relative" style={{ background: 'radial-gradient(105.3% 100.58% at 46.93% -2.82%, #000000 0%, #00204A 100%), radial-gradient(85.05% 102.28% at 51.16% 0%, rgba(44, 82, 156, 0.2) 0%, rgba(36, 48, 87, 0.2) 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-xl">
            Real experiences from people improving their wellness journey with us.
          </p>
        </div>
        
        <div className="relative flex justify-center">
          {/* Navigation Buttons */}
          <div className="pt-10 absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-4 z-20">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                w-10 h-10
                flex items-center justify-center
                rounded-full
                transition-all duration-200
                ${canScrollLeft 
                  ? 'bg-[#1a1b2b] text-white hover:bg-[#2a2b3b] cursor-pointer' 
                  : 'bg-[#1a1b2b]/50 text-gray-600 cursor-not-allowed'}
                shadow-lg
              `}
            >
              <ScrollButton 
                direction="left" 
                onClick={() => scroll('left')} 
                disabled={!canScrollLeft}
              />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                w-10 h-10
                flex items-center justify-center
                rounded-full
                transition-all duration-200
                ${canScrollRight 
                  ? 'bg-[#1a1b2b] text-white hover:bg-[#2a2b3b] cursor-pointer' 
                  : 'bg-[#1a1b2b]/50 text-gray-600 cursor-not-allowed'}
                shadow-lg
              `}
            >
              <ScrollButton 
                direction="right" 
                onClick={() => scroll('right')} 
                disabled={!canScrollRight}
              />
            </button>
          </div> 
         

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scroll-smooth hide-scrollbar pb-16"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedback; 