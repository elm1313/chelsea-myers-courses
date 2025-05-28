import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, CreditCard, User, Lock } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  country: string;
  state: string;
  city: string;
}

interface Enrollment {
  id: string;
  auto_renew: boolean;
  renewal_date: string;
  created_at: string;
  courses: {
    name: string;
    price: number;
  };
}

const AccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/');
          return;
        }

        setUserEmail(user.email || '');

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        setFormData(profileData);

        // Fetch enrollments with course details
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            id,
            auto_renew,
            renewal_date,
            created_at,
            courses (
              name,
              price
            )
          `)
          .eq('user_id', user.id);

        if (enrollmentsError) throw enrollmentsError;
        setEnrollments(enrollmentsData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load account data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProfile(formData as UserProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoRenewToggle = async (enrollmentId: string, currentValue: boolean) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({ auto_renew: !currentValue })
        .eq('id', enrollmentId);

      if (updateError) throw updateError;

      setEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === enrollmentId 
            ? { ...enrollment, auto_renew: !currentValue }
            : enrollment
        )
      );

      setSuccess('Subscription settings updated');
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">
          Account Settings
        </h1>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        <div className="grid gap-8">
          {/* Profile Information Section */}
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <User className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-heading font-bold text-white">Profile Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="nickname">
                    Profile Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname || formData.first_name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                    placeholder="Enter your preferred name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    disabled
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="state">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profile || {});
                      }}
                      className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Subscriptions Section */}
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-heading font-bold text-white">Subscriptions</h2>
            </div>

            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="bg-white/5 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2">{enrollment.courses.name}</h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}</p>
                        <p>
                          {enrollment.auto_renew 
                            ? `Renews: ${new Date(enrollment.renewal_date).toLocaleDateString()}`
                            : `Expires: ${new Date(enrollment.renewal_date).toLocaleDateString()}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enrollment.auto_renew}
                          onChange={() => handleAutoRenewToggle(enrollment.id, enrollment.auto_renew)}
                          className="sr-only peer"
                          disabled={loading}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                      <span className="text-white whitespace-nowrap">
                        Auto-renew {enrollment.auto_renew ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-heading font-bold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSuccess={() => {
          setIsChangePasswordOpen(false);
          setSuccess('Password updated successfully');
        }}
        onError={(err) => setError(err)}
      />
    </div>
  );
};

export default AccountPage;