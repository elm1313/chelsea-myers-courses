import React from 'react';

interface CoachingCardProps {
  compact?: boolean;
  className?: string;
}

const CoachingCard: React.FC<CoachingCardProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <button
        data-formkit-toggle="67850e3926"
        className="w-full bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-colors group p-3"
      >
        <div className="flex items-center gap-6">
          <div className="bg-accent/20 p-0 rounded-lg overflow-hidden w-16 h-16">
            <img 
              src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Headshot.jpg"
              alt="Chelsea Myers"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl text-white">
            Exclusive 1:1 Coaching with Chelsea Myers
          </h3>
          <span className="ml-auto inline-block bg-accent text-white px-6 py-2 rounded-lg group-hover:bg-accent/80 transition-colors">
            Apply
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className={`bg-white/10 rounded-lg overflow-hidden p-8 ${className}`}>
      <div className="flex items-center gap-6 mb-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Headshot.jpg"
            alt="Chelsea Myers"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold text-white mb-2">
            Exclusive 1:1 Coaching with Chelsea Myers
          </h3>
          <p className="text-gray-300">
            Experience transformative personal growth through exclusive one-on-one coaching sessions. This selective program is available by application only and offers personalized guidance tailored to your unique journey. Coaching with Chelsea is available with and without course enrollment.
          </p>
        </div>
      </div>
      <button
        data-formkit-toggle="67850e3926"
        className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors"
      >
        Apply Today
      </button>
    </div>
  );
};

export default CoachingCard;