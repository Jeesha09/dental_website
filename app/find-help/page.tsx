'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Check,
  ArrowLeft,
  Search,
  Filter,
} from 'lucide-react';

export default function FindHelpPage() {
  const [location, setLocation] = useState('');
  const [providerType, setProviderType] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  // Mock provider data
  const providers = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      type: 'surgeon',
      specialization: 'Cleft Lip & Palate Surgery',
      hospital: 'Apollo Hospital',
      city: 'Mumbai',
      verified: true,
      rating: 4.8,
      reviews: 124,
      phone: '+91 98765 43210',
      email: 'dr.rajesh@apollo.com',
      distance: '2.3 km',
      freeServices: true,
    },
    {
      id: 2,
      name: 'Ms. Priya Sharma',
      type: 'speech-therapist',
      specialization: 'Speech-Language Pathology',
      hospital: 'Speech Clinic Mumbai',
      city: 'Mumbai',
      verified: true,
      rating: 4.9,
      reviews: 87,
      phone: '+91 98765 12345',
      email: 'priya@speechclinic.com',
      distance: '1.8 km',
      freeServices: false,
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      type: 'orthodontist',
      specialization: 'Orthodontics & Maxillofacial',
      hospital: 'Smile Dental Center',
      city: 'Mumbai',
      verified: true,
      rating: 4.7,
      reviews: 156,
      phone: '+91 98765 54321',
      email: 'amit@smiledentalcenter.com',
      distance: '3.1 km',
      freeServices: false,
    },
    {
      id: 4,
      name: 'Smile Train India',
      type: 'ngo',
      specialization: 'Free Surgical Camps & Support',
      hospital: 'NGO',
      city: 'Mumbai',
      verified: true,
      rating: 4.9,
      reviews: 2500,
      phone: '+91 9999 888888',
      email: 'mumbai@smiletrain.org',
      distance: '5.2 km',
      freeServices: true,
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      type: 'surgeon',
      specialization: 'Pediatric Cleft Surgery',
      hospital: 'Fortis Hospital',
      city: 'Mumbai',
      verified: true,
      rating: 4.8,
      reviews: 98,
      phone: '+91 98765 99999',
      email: 'neha@fortis.com',
      distance: '4.5 km',
      freeServices: false,
    },
  ];

  const filteredProviders = providers.filter((p) => {
    if (providerType !== 'all' && p.type !== providerType) return false;
    if (location && !p.city.toLowerCase().includes(location.toLowerCase())) return false;
    return true;
  });

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'surgeon':
        return '🏥';
      case 'speech-therapist':
        return '🗣️';
      case 'orthodontist':
        return '😁';
      case 'ngo':
        return '❤️';
      default:
        return '👤';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Find Help Near You</h1>
          <p className="text-foreground/60 mt-2">
            Locate surgeons, hospitals, speech therapists, and NGOs in your area
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location / City
              </label>
              <Input
                type="text"
                placeholder="Enter city name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Provider Type
              </label>
              <Select value={providerType} onValueChange={setProviderType}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="All providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="surgeon">Cleft Surgeons</SelectItem>
                  <SelectItem value="speech-therapist">Speech Therapists</SelectItem>
                  <SelectItem value="orthodontist">Orthodontists</SelectItem>
                  <SelectItem value="ngo">NGOs & Camps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-foreground/60">
            Found {filteredProviders.length} providers
          </p>
        </motion.div>

        {/* Providers List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Providers List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider, idx) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProvider(provider.id)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`p-6 transition hover:shadow-lg ${
                      selectedProvider === provider.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{getProviderIcon(provider.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-bold text-foreground">
                            {provider.name}
                          </h3>
                          {provider.verified && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-foreground/70 mb-1">
                          {provider.specialization}
                        </p>
                        <p className="text-xs text-foreground/60 mb-3">
                          {provider.hospital} • {provider.city}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-foreground">
                              {provider.rating}
                            </span>
                          </div>
                          <span className="text-xs text-foreground/60">
                            ({provider.reviews} reviews)
                          </span>
                        </div>

                        {/* Distance & Free Services */}
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-xs text-foreground/70">
                            <MapPin className="w-3 h-3" />
                            {provider.distance}
                          </span>
                          {provider.freeServices && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <Check className="w-3 h-3" />
                              Free Services
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Contact */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs">
                        <Phone className="w-3 h-3 mr-2" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs"
                      >
                        <Mail className="w-3 h-3 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs">
                        <MapPin className="w-3 h-3 mr-2" />
                        Map
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-foreground/60">No providers found in your search.</p>
              </Card>
            )}
          </div>

          {/* Right: Details Panel */}
          <div>
            {selectedProvider ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sticky top-32"
              >
                {filteredProviders
                  .filter((p) => p.id === selectedProvider)
                  .map((provider) => (
                    <div key={provider.id} className="space-y-4">
                      {/* Provider Card */}
                      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-foreground/70 mb-4">
                          {provider.specialization}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-foreground/70">{provider.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-foreground/70 break-all">
                              {provider.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-foreground/70">
                              {provider.city} ({provider.distance})
                            </span>
                          </div>
                        </div>
                      </Card>

                      {/* Action Buttons */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                        Schedule Appointment
                      </Button>
                      <Button variant="outline" className="w-full border-primary text-primary rounded-lg">
                        View Full Profile
                      </Button>

                      {/* Info Box */}
                      <Card className="p-4 bg-blue-50 border-blue-200">
                        <p className="text-xs text-blue-900">
                          This information is based on verified healthcare providers in our
                          network. Always verify credentials before scheduling appointments.
                        </p>
                      </Card>
                    </div>
                  ))}
              </motion.div>
            ) : (
              <Card className="p-6 text-center sticky top-32">
                <p className="text-foreground/60 text-sm">
                  Select a provider to view more details
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Community Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-border"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Connect with Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <h3 className="text-lg font-bold text-foreground mb-2">Parent Support Groups</h3>
              <p className="text-foreground/70 mb-6">
                Connect with other parents, share experiences, and get emotional support.
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg">
                Join Community
              </Button>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Financial Assistance Programs
              </h3>
              <p className="text-foreground/70 mb-6">
                Learn about CSR, government schemes, and financial aid for cleft care.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Explore Resources
              </Button>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
