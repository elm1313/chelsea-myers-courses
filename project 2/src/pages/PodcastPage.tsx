import React from 'react';
import { Radio, Music, Headphones } from 'lucide-react';

const PodcastPage = () => {
  const platforms = [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/show/2p88rzpvDeT1TClItmbKOY',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//spotify.webp'
    },
    {
      name: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/us/podcast/brain-crops-with-chelsea-myers/id1535567131',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//apple-podcasts_wechat__cq3l3kjucay6_og.png'
    },
    {
      name: 'iHeart Radio',
      url: 'https://www.iheart.com/podcast/269-brain-crops-with-chelsea-m-277887850/',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//iheart.webp'
    },
    {
      name: 'Overcast',
      url: 'https://overcast.fm/itunes1535567131',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//overcast.webp'
    },
    {
      name: 'Amazon Music',
      url: 'https://music.amazon.com/podcasts/24c4c231-b314-4baf-a727-49a9636a8a19/brain-crops-with-chelsea-myers',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//amazon%20music.webp'
    },
    {
      name: 'Pandora',
      url: 'https://www.pandora.com/podcast/brain-crops-with-chelsea-myers/PC:1000577740',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//pandora.webp'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/playlist?list=PLy3u06kpHMuG_iLPYerRgs9Nk9ctMx76C&si=0MvgfJHFuez0QJKH',
      icon: 'https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//youtube.webp'
    }
  ];

  const guests = [
    {
      name: 'Melissa Bernstein',
      role: 'Co-founder of Melissa & Doug',
      url: 'https://open.spotify.com/episode/7LD8T2faB9zrduDBahXYF8'
    },
    {
      name: 'Gino Wickman',
      role: 'Author of Traction',
      url: 'https://open.spotify.com/episode/6nlfcBCcbiiYVsOMjURT6O'
    },
    {
      name: 'Jennifer Hill',
      role: 'CEO of OptiMatch & Keynote Speaker',
      url: 'https://open.spotify.com/episode/7MPx4uYTy8bggzQjZjpWBf'
    },
    {
      name: 'Justin Breen',
      role: 'Author & CEO of Epic F.I.T.',
      url: 'https://open.spotify.com/episode/0SgO0rOquhN4EgiTN0qw6X'
    }
  ];

  const PlatformLinks = () => (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
          aria-label={`Listen on ${platform.name}`}
        >
          <img 
            src={platform.icon} 
            alt={`${platform.name} logo`}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
        </a>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://whfxjpakwumczkojrwmq.supabase.co/storage/v1/object/public/images//Chelsea%20Podcasting.jpg"
            alt="Chelsea Myers recording Brain Crops podcast"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark/90"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Brain Crops Podcast
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Join me for insights and conversations that support your growth journey.
              </p>
              <PlatformLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Expert Insights & Real Conversations Section */}
          <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-accent/20 p-4 rounded-lg">
                <Radio className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">
                Expert Insights & Real Conversations
              </h2>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              Welcome to Brain Crops! I'm so glad you're here. My name is Chelsea Myers, host of the Brain Crops podcast. I've thoughtfully designed this show to support your health, happiness, and success. Whether it's a solo episode where I share personal insights and practical tools, or a conversation with an inspiring guest, each episode is created to bring meaningful value to your journey.
Here are just a few of the remarkable individuals who've joined me on the podcast:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {guests.map((guest) => (
                <a
                  key={guest.name}
                  href={guest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 p-4 rounded hover:bg-white/10 transition-colors group"
                >
                  <div className="text-white font-semibold group-hover:text-accent transition-colors">
                    {guest.name}
                  </div>
                  <div className="text-accent">({guest.role})</div>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <Headphones className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Listen Anywhere
                </h3>
              </div>
              <p className="text-gray-300 text-lg">
                Available on all major podcast platforms including Spotify, Apple Podcasts, and more.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <Music className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Regular Episodes
                </h3>
              </div>
              <p className="text-gray-300 text-lg">
                New episodes regularly featuring fresh content and valuable insights.
              </p>
            </div>
          </div>

          {/* Listen Now Section */}
          <div className="bg-white/10 rounded-lg p-12">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-white mb-8">
                Start Listening Today
              </h2>
              <PlatformLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;