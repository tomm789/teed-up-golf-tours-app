import React, { useState } from 'react';

const Subscribe: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Subscribe form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      className="section-spacing"
      style={{ backgroundColor: 'var(--tu-navy)' }}
      aria-labelledby="subscribe-title"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            id="subscribe-title"
            className="display-font text-3xl lg:text-4xl mb-6 text-white"
          >
            SUBSCRIBE
          </h2>
          
          <p className="text-lg lg:text-xl text-white/90 mb-8">
            Get Teed Up news, new journeys and inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label htmlFor="title" className="sr-only">Title</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
                  required
                >
                  <option value="">Title</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="dr">Dr</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <button 
                type="submit"
                className="px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all hover:transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                style={{ 
                  backgroundColor: 'var(--tu-gold)', 
                  color: 'var(--tu-navy)' 
                }}
              >
                SUBMIT
              </button>
            </div>
            
            <p className="text-sm text-white/70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from Teed Up Golf Tours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;

