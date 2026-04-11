/**
 * InteractiveFloorPlanSection.tsx
 * 
 * Premium interactive floor plan for POSTO Tech Business Solutions.
 * Enterprise-grade AV solution explorer with synchronized SVG and card interactions.
 */

import React, { useState, useCallback, useMemo } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface RoomData {
  id: string;
  title: string;
  participantRange: string;
  roomSize: string;
  description: string;
  features: string[];
}

interface BenefitBlock {
  id: string;
  title: string;
  description: string;
  items: string[];
}

// ============================================================================
// DATA
// ============================================================================

const ROOMS: RoomData[] = [
  {
    id: 'huddle',
    title: 'Huddle Room',
    participantRange: '2–4 people',
    roomSize: '3m × 4m',
    description: 'Intimate spaces for quick standups, 1:1 conversations, and spontaneous collaboration.',
    features: ['Single-cable PoE deployment', 'Wireless BYOD connectivity', 'Auto-wake PIR sensors'],
  },
  {
    id: 'small',
    title: 'Small Meeting Room',
    participantRange: '4–8 people',
    roomSize: '4m × 5m',
    description: 'Dedicated spaces for team syncs, client calls, and focused group work.',
    features: ['65" 4K interactive display', 'Built-in camera array', 'Multi-device wireless sharing'],
  },
  {
    id: 'medium',
    title: 'Medium Conference Room',
    participantRange: '8–12 people',
    roomSize: '5m × 6m',
    description: 'Versatile rooms for department meetings, training sessions, and hybrid collaboration.',
    features: ['75"–86" interactive display', 'PTZ speaker tracking', 'Extended microphone pickup'],
  },
  {
    id: 'large',
    title: 'Large Boardroom',
    participantRange: '12–20 people',
    roomSize: '6m × 8m',
    description: 'Executive spaces for leadership meetings, board presentations, and strategic decisions.',
    features: ['86"–98" premium display', 'Dual PTZ camera system', 'Integrated room control'],
  },
  {
    id: 'auditorium',
    title: 'Auditorium',
    participantRange: '20–100+ people',
    roomSize: '8m+ span',
    description: 'Scalable solutions for town halls, training events, and organization-wide broadcasts.',
    features: ['105" ultra-wide 5K display', 'Multi-camera production', 'Line array audio system'],
  },
  {
    id: 'openspace',
    title: 'Open Space',
    participantRange: '2–6 people',
    roomSize: 'Flexible',
    description: 'Adaptive zones for hot-desking, breakout sessions, and creative collaboration.',
    features: ['Mobile display stands', 'Quick-connect wireless', 'Modular reconfigurable setup'],
  },
];

const BENEFITS: BenefitBlock[] = [
  {
    id: 'deployment',
    title: 'Easy Deployment',
    description: 'Streamlined installation with minimal disruption to your operations.',
    items: ['Clean installation', 'Minimal cabling', 'Flexible integration'],
  },
  {
    id: 'operation',
    title: 'Easy Operation',
    description: 'Intuitive interfaces that require zero training for your teams.',
    items: ['One-touch meeting start', 'Wireless sharing', 'Seamless collaboration'],
  },
  {
    id: 'maintenance',
    title: 'Easy Maintenance',
    description: 'Proactive monitoring and remote management at your fingertips.',
    items: ['Centralized management', 'Remote updates', 'Long-term reliability'],
  },
];

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  Deployment: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Operation: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Maintenance: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Room: () => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function InteractiveFloorPlanSection(): React.ReactElement {
  const [activeRoomId, setActiveRoomId] = useState<string>('medium');
  const [hoverRoomId, setHoverRoomId] = useState<string | null>(null);

  const visibleRoomId = hoverRoomId ?? activeRoomId;
  const visibleRoom = useMemo(() => ROOMS.find(r => r.id === visibleRoomId) ?? ROOMS[2], [visibleRoomId]);

  const handleRoomHover = useCallback((roomId: string | null) => setHoverRoomId(roomId), []);
  
  const handleRoomSelect = useCallback((roomId: string) => {
    setActiveRoomId(roomId);
    setHoverRoomId(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, roomId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRoomSelect(roomId);
    }
  }, [handleRoomSelect]);

  const isHighlighted = useCallback((roomId: string) => visibleRoomId === roomId, [visibleRoomId]);

  return (
    <section className="w-full bg-white py-20 md:py-28" aria-labelledby="solutions-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">Business Solutions</p>
          <h2 id="solutions-title" className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Solutions for every space
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From huddle rooms to boardrooms, POSTO Tech delivers enterprise-grade AV solutions 
            designed for how modern Pakistani organizations collaborate.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Floor Plan */}
          <div className="lg:col-span-7">
            <div 
              className="relative bg-slate-50 rounded-3xl p-8 md:p-12 shadow-inner"
              onMouseLeave={() => handleRoomHover(null)}
            >
              <svg 
                viewBox="0 0 600 420" 
                className="w-full h-auto"
                role="img" 
                aria-label="Office floor plan showing six meeting space types"
              >
                <defs>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#2563eb" floodOpacity="0.08"/>
                  </filter>
                </defs>
                
                {/* Floor */}
                <path d="M50 330 L300 180 L550 330 L300 480 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                
                {/* Huddle */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('huddle')}
                  onClick={() => handleRoomSelect('huddle')}
                  onKeyDown={(e) => handleKeyDown(e, 'huddle')}
                  role="button"
                  tabIndex={0}
                  aria-label="Huddle room"
                >
                  <path 
                    d="M80 260 L170 210 L170 280 L80 330 Z"
                    fill={isHighlighted('huddle') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('huddle') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('huddle') ? 1.5 : 1}
                    filter={isHighlighted('huddle') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <ellipse cx="125" cy="270" rx="20" ry="12" fill="white" stroke="#94a3b8" strokeWidth="1"/>
                  <circle cx="108" cy="265" r="5" fill={isHighlighted('huddle') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="142" cy="265" r="5" fill={isHighlighted('huddle') ? '#3b82f6' : '#94a3b8"}/>
                  <rect x="158" y="225" width="3" height="25" fill="#64748b"/>
                </g>
                
                {/* Small */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('small')}
                  onClick={() => handleRoomSelect('small')}
                  onKeyDown={(e) => handleKeyDown(e, 'small')}
                  role="button"
                  tabIndex={0}
                  aria-label="Small meeting room"
                >
                  <path 
                    d="M190 210 L280 160 L280 230 L190 280 Z"
                    fill={isHighlighted('small') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('small') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('small') ? 1.5 : 1}
                    filter={isHighlighted('small') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <rect x="215" y="210" width="35" height="20" rx="2" fill="white" stroke="#94a3b8" strokeWidth="1"/>
                  <circle cx="208" cy="220" r="5" fill={isHighlighted('small') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="257" cy="220" r="5" fill={isHighlighted('small') ? '#3b82f6' : '#94a3b8"}/>
                  <rect x="270" y="175" width="3" height="28" fill="#64748b"/>
                </g>
                
                {/* Medium */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('medium')}
                  onClick={() => handleRoomSelect('medium')}
                  onKeyDown={(e) => handleKeyDown(e, 'medium')}
                  role="button"
                  tabIndex={0}
                  aria-label="Medium conference room"
                >
                  <path 
                    d="M300 170 L410 110 L410 190 L300 250 Z"
                    fill={isHighlighted('medium') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('medium') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('medium') ? 1.5 : 1}
                    filter={isHighlighted('medium') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <rect x="335" y="165" width="45" height="25" rx="2" fill="white" stroke="#94a3b8" strokeWidth="1"/>
                  <circle cx="325" cy="177" r="6" fill={isHighlighted('medium') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="400" cy="177" r="6" fill={isHighlighted('medium') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="362" cy="197" r="6" fill={isHighlighted('medium') ? '#3b82f6' : '#94a3b8"}/>
                  <rect x="400" y="130" width="4" height="32" fill="#64748b"/>
                </g>
                
                {/* Large */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('large')}
                  onClick={() => handleRoomSelect('large')}
                  onKeyDown={(e) => handleKeyDown(e, 'large')}
                  role="button"
                  tabIndex={0}
                  aria-label="Large boardroom"
                >
                  <path 
                    d="M430 120 L530 70 L530 150 L430 200 Z"
                    fill={isHighlighted('large') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('large') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('large') ? 1.5 : 1}
                    filter={isHighlighted('large') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <rect x="455" y="115" width="45" height="28" rx="2" fill="white" stroke="#94a3b8" strokeWidth="1"/>
                  <circle cx="445" cy="129" r="6" fill={isHighlighted('large') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="510" cy="129" r="6" fill={isHighlighted('large') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="477" cy="150" r="6" fill={isHighlighted('large') ? '#3b82f6' : '#94a3b8"}/>
                  <rect x="520" y="90" width="3" height="30" fill="#64748b"/>
                </g>
                
                {/* Auditorium */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('auditorium')}
                  onClick={() => handleRoomSelect('auditorium')}
                  onKeyDown={(e) => handleKeyDown(e, 'auditorium')}
                  role="button"
                  tabIndex={0}
                  aria-label="Auditorium"
                >
                  <path 
                    d="M140 320 L430 160 L430 260 L140 420 Z"
                    fill={isHighlighted('auditorium') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('auditorium') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('auditorium') ? 1.5 : 1}
                    filter={isHighlighted('auditorium') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <rect x="360" y="185" width="45" height="22" fill="white" stroke="#94a3b8" strokeWidth="1"/>
                  <rect x="370" y="165" width="25" height="16" fill="#64748b"/>
                  <ellipse cx="230" cy="320" rx="50" ry="16" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
                  <ellipse cx="260" cy="300" rx="42" ry="12" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
                  <ellipse cx="290" cy="282" rx="34" ry="10" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
                </g>
                
                {/* Open Space */}
                <g 
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleRoomHover('openspace')}
                  onClick={() => handleRoomSelect('openspace')}
                  onKeyDown={(e) => handleKeyDown(e, 'openspace')}
                  role="button"
                  tabIndex={0}
                  aria-label="Open space"
                >
                  <circle 
                    cx="480" cy="280" r="35"
                    fill={isHighlighted('openspace') ? '#eff6ff' : '#f1f5f9'}
                    stroke={isHighlighted('openspace') ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHighlighted('openspace') ? 1.5 : 1}
                    filter={isHighlighted('openspace') ? 'url(#softShadow)' : undefined}
                    className="transition-all duration-200"
                  />
                  <rect x="465" y="268" width="26" height="3" fill="#64748b"/>
                  <line x1="478" y1="271" x2="478" y2="288" stroke="#94a3b8" strokeWidth="2"/>
                  <circle cx="478" cy="292" r="4" fill="#94a3b8"/>
                  <circle cx="455" cy="280" r="6" fill={isHighlighted('openspace') ? '#3b82f6' : '#94a3b8"}/>
                  <circle cx="505" cy="280" r="6" fill={isHighlighted('openspace') ? '#3b82f6' : '#94a3b8"}/>
                </g>
              </svg>

              {/* Selection Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl px-5 py-4 shadow-lg border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Selected</p>
                    <p className="text-base font-semibold text-slate-900 mt-0.5">{visibleRoom.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-blue-600">{visibleRoom.participantRange}</p>
                    <p className="text-xs text-slate-500">{visibleRoom.roomSize}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="lg:col-span-5 space-y-4">
            {BENEFITS.map((benefit, index) => (
              <div 
                key={benefit.id}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:border-blue-300 group-hover:text-blue-700 transition-colors">
                    {index === 0 ? <Icons.Deployment /> : index === 1 ? <Icons.Operation /> : <Icons.Maintenance />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{benefit.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {benefit.items.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <span className="w-1 h-1 rounded-full bg-blue-400"/>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {ROOMS.map((room) => {
            const isActive = activeRoomId === room.id;
            const isHover = hoverRoomId === room.id;
            
            return (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room.id)}
                onMouseEnter={() => handleRoomHover(room.id)}
                onMouseLeave={() => handleRoomHover(null)}
                className={`
                  group relative text-left rounded-2xl overflow-hidden transition-all duration-200
                  ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-slate-200 hover:ring-slate-300'}
                  ${isActive ? 'bg-white' : 'bg-white hover:bg-slate-50'}
                `}
                aria-pressed={isActive}
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <div className={`
                    absolute inset-0 flex items-center justify-center transition-transform duration-500
                    ${isActive || isHover ? 'scale-105' : 'scale-100'}
                  `}>
                    <Icons.Room />
                  </div>
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent
                    transition-opacity duration-200
                    ${isActive || isHover ? 'opacity-100' : 'opacity-0'}
                  `}/>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 rounded-full bg-white shadow-sm">
                        <div className="w-full h-full rounded-full bg-blue-500"/>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h4 className={`
                    text-sm font-semibold mb-1 transition-colors
                    ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}
                  `}>
                    {room.title}
                  </h4>
                  <p className="text-xs text-slate-500">{room.participantRange}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="mt-10 bg-slate-50 rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
                  {visibleRoom.participantRange}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-sm text-slate-600">{visibleRoom.roomSize}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                {visibleRoom.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                {visibleRoom.description}
              </p>
              
              <ul className="space-y-2.5">
                {visibleRoom.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icons.Check />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow">
                Request Quote
                <Icons.ArrowRight />
              </button>
              <span className="text-xs text-slate-500">Free consultation</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
EOF
echo "Refined component created"