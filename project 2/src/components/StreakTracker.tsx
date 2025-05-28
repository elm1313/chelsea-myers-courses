import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Star, Trophy, Calendar, Edit2 } from 'lucide-react';

interface StreakData {
  current_streak: number;
  longest_streak: number;
  last_streak: number;
  streak_history: string;
}

interface ProgressSegment {
  days: number;
  label: string;
  color: string;
}

const segments: ProgressSegment[] = [
  { days: 7, label: '1 Week', color: 'bg-purple-200' },
  { days: 30, label: '1 Month', color: 'bg-purple-300' },
  { days: 90, label: '90 Days', color: 'bg-purple-400' },
  { days: 180, label: '180 Days', color: 'bg-purple-500' },
  { days: 365, label: '1 Year', color: 'bg-purple-600' }
];

const ProgressBar: React.FC<{ currentStreak: number }> = ({ currentStreak }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {segments.map((segment, index) => {
          const progress = Math.min(currentStreak / segment.days * 100, 100);
          const isComplete = currentStreak >= segment.days;
          
          return (
            <div key={segment.label} className="flex-1">
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full ${segment.color} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{segment.label}</span>
                {isComplete && (
                  <Star className="w-3 h-3 text-accent fill-accent" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    current_streak: 0,
    longest_streak: 0,
    last_streak: 0,
    streak_history: '[]'
  });
  const [loading, setLoading] = useState(false);
  const [intention, setIntention] = useState(localStorage.getItem('courseIntention') || 'What change are you creating?');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStreakData();
  }, []);

  useEffect(() => {
    localStorage.setItem('courseIntention', intention);
  }, [intention]);

  const fetchStreakData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('streaks')
        .select('current_streak, longest_streak, last_streak, streak_history')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setStreakData({
          current_streak: data.current_streak,
          longest_streak: data.longest_streak,
          last_streak: data.last_streak,
          streak_history: data.streak_history || '[]'
        });
      }
    } catch (error) {
      console.error('Error fetching streak data:', error);
    }
  };

  const updateStreak = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existingStreak } = await supabase
        .from('streaks')
        .select('current_streak, longest_streak')
        .eq('user_id', user.id)
        .maybeSingle();

      const newStreak = (existingStreak?.current_streak || 0) + 1;
      const newLongest = Math.max(newStreak, existingStreak?.longest_streak || 0);

      const streakData = {
        user_id: user.id,
        current_streak: newStreak,
        longest_streak: newLongest,
        last_updated: new Date().toISOString()
      };

      let error;
      
      if (existingStreak) {
        ({ error } = await supabase
          .from('streaks')
          .update(streakData)
          .eq('user_id', user.id));
      } else {
        ({ error } = await supabase
          .from('streaks')
          .insert([streakData]));
      }

      if (error) throw error;

      setStreakData(prev => ({
        ...prev,
        current_streak: newStreak,
        longest_streak: newLongest
      }));
    } catch (error) {
      console.error('Error updating streak:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetStreak = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existingStreak } = await supabase
        .from('streaks')
        .select('current_streak')
        .eq('user_id', user.id)
        .single();

      if (!existingStreak) {
        return;
      }

      const { error } = await supabase
        .from('streaks')
        .update({
          current_streak: 0,
          last_streak: existingStreak.current_streak,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setStreakData(prev => ({
        ...prev,
        current_streak: 0,
        last_streak: existingStreak.current_streak
      }));
    } catch (error) {
      console.error('Error resetting streak:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntentionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, 50);
    setIntention(newValue);
  };

  const handleIntentionBlur = () => {
    setIsEditing(false);
    if (!intention.trim()) {
      setIntention('What change are you creating?');
    }
  };

  return (
    <div className="bg-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 p-2 rounded-lg">
            <Star className="w-6 h-6 text-accent" />
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-heading font-bold text-xl text-white">Daily Progress</h3>
            <div 
              className={`relative px-3 py-1 rounded border transition-colors ${
                isEditing 
                  ? 'border-accent bg-gray-800' 
                  : 'border-gray-700 hover:border-accent/50 bg-gray-800/50'
              }`}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={intention}
                  onChange={handleIntentionChange}
                  onBlur={handleIntentionBlur}
                  className="bg-transparent text-white text-sm focus:outline-none w-64"
                  autoFocus
                  placeholder="What change are you creating?"
                />
              ) : (
                <div 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 cursor-text"
                >
                  <span className="text-gray-400 text-sm">
                    {intention}
                  </span>
                  <Edit2 className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          <span className="text-gray-300">Best: {streakData.longest_streak} days</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-white mb-4">{streakData.current_streak} days</div>
        <ProgressBar currentStreak={streakData.current_streak} />
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={updateStreak}
          disabled={loading}
          className="bg-accent hover:bg-accent/80 text-white px-3 py-1 text-sm rounded-lg transition-colors disabled:opacity-50"
        >
          I Kept My Word Today
        </button>
        <button
          onClick={resetStreak}
          disabled={loading}
          className="bg-white/5 hover:bg-white/10 text-white px-3 py-1 text-sm rounded-lg transition-colors disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {streakData.last_streak > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-accent">
            <Calendar className="w-4 h-4" />
            <span>Previous Streak</span>
          </div>
          <div className="bg-white/5 px-3 py-1 rounded text-sm text-gray-300 inline-block">
            {streakData.last_streak} days
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-6">
        Forgot to record your progress? No worries - just click "I Kept My Word" to get all caught up.
      </p>
    </div>
  );
};

export default StreakTracker;