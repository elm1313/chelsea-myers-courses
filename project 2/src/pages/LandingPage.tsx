import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Unlink, MessageCircle, TrendingUp, Star, ChevronLeft, ChevronRight, Globe, Sparkles } from 'lucide-react';
import CoachingCard from '../components/CoachingCard';

const testimonials = [
  {
    name: "Lance Reynolds",
    role: "Founder - S.M.A.R.T. School",
    text: "I hired Chelsea to assist my company in the training and development of professional management teams. Her patience, professionalism and diligence were paramount to the entire team achieving our goals. I have hired Chelsea on many occasions and will certainly hire her at some point again in the near future."
  },
  {
    name: "Dr. Marc Cooper",
    role: "Founder - The Contemporary Elder Institute & Past DEO President",
    text: "What ultimately counts in a consulting/coaching relationship are the principles on which the agent stands; their anchor to their core values; their knowledge in the fields of business and human performance; their skill at expanding their clients' perception of themselves and their enterprise; their ability to evolve their clients' leadership, management, and ownership; and the relentless intention and attention to make sure the client delivers, which perfectly describes Chelsea"
  },
  {
    name: "Dr. Nadeem Karimbux",
    role: "Dean at Tufts University School of Dental Medicine",
    text: "Chelsea Myers spent a day at the Tufts University School of Dental Medicine facilitating a day long workshop for our leadership group. The program was engaging and allowed us time to reflect on the skills we need to work together as a team. Critical in a time of volatility, uncertainty, complexity and ambiguity. I highly recommend Chelsea as a speaker and facilitator-your organization and team will gain key development tools for skills and values that can be applied on a daily basis!"
  },
  {
    name: "Dr. Athanasios Zavara",
    role: "Delta Dental of Massachusetts Endowed Professo & Chairman of Dept. of Public Health",
    text: "Chelsea is a dynamic, very intelligent, and knowledgable consultant with the unique ability to teach executives and dentists how to redirect their thought process towards achieving better teamwork and increased profitability while simultaneously preserving a quality work environment."
  },
  {
    name: "M. Thompson",
    role: "Business Consultant",
    text: "Quantum Upgrade Personal Transformation helped me when nothing else seemed to have a chance. If your wondering if this course will work - trust me it will. I can't reccomned it high enough. Thank you Chelsea!"
  },
  {
    name: "Dr. Matthew Waite D.D.S., M.S.",
    role: "Periodontist",
    text: "I hired Chelsea, as I wanted to take my practice to the next level after having achieved previous goals and -stalling- on the way forward.  Little did I realize that the coaching would be a rollercoaster ride - a journey of self-evaluation and improvement that would touch every facet of my life.  As I navigated the program, I saw my practice improve through better communication with my patients and staff - leading to increased productivity, but, more importantly, a more peaceful day with a happy staff.  Unexpectedly, I experienced the same transformation at home.  Chelsea's coaching allowed me to develop skills that will carry me through a lifetime of continuous improvement.  If you want to uplift your practice, as well as everybody and everything around you, I cannot recommend Chelsea's program highly enough"
  },
  {
    name: "Amanda Parker",
    role: "Education",
    text: "Chelsea's communication strategies have transformed our team dynamics. Her approach to leadership and personal growth has created positive change throughout our organization."
  },
  {
    name: "Dr. Patel",
    role: "Dentist",
    text: "For obvious reasons, 2020 was a year of doubt and terror for me. I had team members leave and a shortage of replacement options, I had a near shut-down period followed by an influx that was almost impossible to handle, and the little energy I had left was spent marking up my defensive game book with little to show for it but a neglected spouse and a pillow that I barely slept on. I knew that this wasn't the way I wanted to keep going and a colleague sent me a link to the Brain Crops podcast. When I heard Chelsea talk about my past, present and future self I felt pushed to learn more. Deciding to invest in coaching has changed my stance both professionally and personally. I am able to really focus now on the things I want to do and be because I'm not drowning in self-doubt anymore. This was one of the best things I've done for myself and for the people around me"
  },
  {
    name: "Dr. John Yurkovich D.D.S. M.S.",
    role: "Dentist",
    text: "Chelsea is a wonderful person and awesome coach. She came out to our dental society. Everyone was impressed by her. I highly recommend her if you are wanting to excel to that next level!"
  },
  {
    name: "Dr. B.",
    role: "Dentist",
    text: "I got coaching to help me accept that being a dentist meant I'd probably always feel a high level of negativity. I learned that things didn't have to be that way. Now my life is filled with more happiness than I had ever thought possible."
  },
  {
    name: "Dr. Tran",
    role: "Doctor",
    text: "The content is designed for immediate and markable growth. I came to Chelsea hoping to figure out how to be a better leader. I wasn't expecting my personal development to transform my life the way that it has."
  },
  {
    name: "Dr. Anderson",
    role: "Dentist",
    text: "Chelsea's presentation was upbeat, informative and very well received by our clinicians. I wish I'd had this information when I was a young dentist."
  }
];

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = window.innerWidth < 768 ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Transform Your Life with Expert Guidance
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Join Chelsea's transformative courses—each designed to help you overcome challenges, master communication, and achieve lasting growth.
            </p>
            <Link
              to="/courses"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent/80 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20on%20Steps.jpg"
              alt="Chelsea Myers"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Unlink className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Quantum Upgrade Personal Transformation™
              </h3>
              <p className="text-gray-300 mb-6">
                Kick pornography to the curb - born from deep, private work with people seeking freedom – a course rooted in energetics, self-leadership, and sustainable freedom.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/quantum"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/quantum"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                The Communication Blueprint
              </h3>
              <p className="text-gray-300 mb-6">
                Advance your communication with this interactive LMS course, featuring video coaching and five bonus mini-courses. It is for anyone ready to connect from their core and lead with clarity, compassion, and power.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/communication"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/communication"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden">
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Entrepreneurial Intelligence for Dentists™
              </h3>
              <p className="text-gray-300 mb-6">
                An interactive masterclass in developing as an entrepreneur, team dynamics, and aligned growth.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/payment/dental"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/courses/dental"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Inner Gold™
              </h3>
              <p className="text-gray-300 mb-6">
                Spiritual Fortitude, Frequency Mastery, and the Unshakable Knowing of Who You Are. The world may try to shake you, but gold doesn't tarnish.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/inner-gold"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Globe className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Sovereign Frequency™
              </h3>
              <p className="text-gray-300 mb-6">
                Unlocking Your True Timeline, Voice, and Vision. A course to dissolve distortion, activate your original blueprint, and step into the timeline your soul remembers.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/sovereign-frequency"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg overflow-hidden relative">
            <div className="absolute -right-12 top-6 bg-accent text-white py-1 px-12 transform rotate-45 z-10">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <div className="aspect-video bg-accent/20 flex items-center justify-center">
              <Star className="w-16 h-16 text-accent" />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Light Architect™
              </h3>
              <p className="text-gray-300 mb-6">
                Designing Reality Through Frequency, Vision, and Inner Technology. You're not here to react to life — you're here to design it.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/waitlist"
                  className="flex-grow bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Join the Wait List
                </Link>
                <Link
                  to="/courses/light-architect"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="md:w-1/2">
            <img
              src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20My%20Work%20Wall.jpg"
              alt="Chelsea Myers in her studio"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Meet Chelsea Myers
            </h2>
            <p className="text-gray-300 mb-6">
              Hi I'm Chelsea Myers, the visionary founder of <a href="https://www.mediteation.app" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">mediTEAtion®</a>, a movement supporting children and conscious families and host of the <Link to="/podcast" className="text-accent hover:underline">Brain Crops podcast</Link>.
            </p>
            <p className="text-gray-300">
              I also work privately with ultra-successful individuals to recalibrate their nervous systems, steward legacy-altering breakthroughs, and embody their highest frequency timelines. My work is deeply intuitive, somatically informed, and spiritually precise. {' '}
              <Link to="/about" className="text-accent hover:underline">
                Learn More...
              </Link>
            </p>
          </div>
        </div>

        <CoachingCard className="mb-24" />

        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">
            What My Clients Are Saying
          </h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {currentTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4 text-sm md:text-base">{testimonial.text}</p>
                  <div className="text-white font-semibold text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs md:text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={prevPage}
                className="bg-accent/10 p-2 rounded-full hover:bg-accent/20 transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-accent" />
              </button>
              <button
                onClick={nextPage}
                className="bg-accent/10 p-2 rounded-full hover:bg-accent/20 transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-accent" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-accent/10 border border-white/10 rounded-lg p-6 text-center shadow-lg">
            <p className="text-lg text-accent font-heading">
              A portion of our proceeds from all course enrollments are donated to support efforts to combat child trafficking and provide aid to rescued survivors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;