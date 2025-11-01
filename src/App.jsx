import React, { useState, useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';

const CHARACTERS = [
  // 5-star characters (only these have elements)
  { 
    id: 1, 
    name: 'Astrec', 
    subtitle: 'Geo Archon',
    rarity: 5, 
    element: 'Geo', 
    color: '#F59E0B',
    image: 'https://i.imgur.com/placeholder1.jpg'
  },
  { 
    id: 2, 
    name: 'Bio', 
    subtitle: 'of Humanity',
    rarity: 5, 
    element: 'Quantum', 
    color: '#8B5CF6',
    image: 'https://i.imgur.com/placeholder2.jpg'
  },
  { 
    id: 6, 
    name: 'Ice', 
    subtitle: 'Duke of Meropide',
    rarity: 5, 
    element: 'Ice', 
    color: '#06B6D4',
    image: 'https://i.imgur.com/placeholder6.jpg'
  },
  { 
    id: 9, 
    name: 'refabiba', 
    subtitle: 'Hydro Sovereign',
    rarity: 5, 
    element: 'Hydro', 
    color: '#3B82F6',
    image: 'https://i.imgur.com/placeholder9.jpg'
  },
  { 
    id: 10, 
    name: 'Stephen', 
    subtitle: 'Knight of Beauty',
    rarity: 5, 
    element: 'Imaginary', 
    color: '#EAB308',
    image: 'https://i.imgur.com/placeholder10.jpg'
  },
  
  // 4-star characters (no elements)
  { 
    id: 3, 
    name: '20 minutes', 
    subtitle: 'brb',
    rarity: 4, 
    element: null,
    color: '#A855F7',
    image: 'https://i.imgur.com/placeholder3.jpg'
  },
  { 
    id: 4, 
    name: 'Nigga', 
    subtitle: 'broke ass',
    rarity: 4, 
    element: null,
    color: '#EF4444',
    image: 'https://i.imgur.com/placeholder4.jpg'
  },
  { 
    id: 7, 
    name: 'Ice', 
    subtitle: 'labubu',
    rarity: 4, 
    element: null,
    color: '#8B5CF6',
    image: 'https://i.imgur.com/placeholder7.jpg'
  },
  
  // 3-star characters (no elements)
  { 
    id: 5, 
    name: 'doro', 
    subtitle: 'labubu',
    rarity: 3, 
    element: null,
    color: '#A855F7',
    image: 'https://i.imgur.com/placeholder5.jpg'
  },
  { 
    id: 8, 
    name: 'Maple Syrup Footjob', 
    subtitle: 'Firefly',
    rarity: 3, 
    element: null,
    color: '#F97316',
    image: 'https://i.imgur.com/placeholder8.jpg'
  },
];

function GachaSim() {
  const [pity4, setPity4] = useState(0);
  const [pity5, setPity5] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [pullQueue, setPullQueue] = useState([]);
  const [currentPull, setCurrentPull] = useState(null);
  const [animationStage, setAnimationStage] = useState('none');
  const [videoUrl, setVideoUrl] = useState('');

  const performPulls = (count) => {
    if (pulling) return;
    
    const results = [];
    let current4Pity = pity4;
    let current5Pity = pity5;

    for (let i = 0; i < count; i++) {
      current4Pity++;
      current5Pity++;

      let rarity;
      const rand = Math.random() * 100;

      if (current5Pity >= 90 || (current5Pity >= 75 && rand < 0.6 + (current5Pity - 75) * 6)) {
        rarity = 5;
        current5Pity = 0;
      } else if (current4Pity >= 10 || rand < 5.1) {
        rarity = 4;
        current4Pity = 0;
      } else {
        rarity = 3;
      }

      const pool = CHARACTERS.filter(c => c.rarity === rarity);
      const pulled = pool[Math.floor(Math.random() * pool.length)];
      results.push(pulled);
    }

    setPity4(current4Pity);
    setPity5(current5Pity);
    setPullQueue(results);
    setPulling(true);
  };

  useEffect(() => {
    if (pullQueue.length > 0 && !currentPull) {
      const nextPull = pullQueue[0];
      setCurrentPull(nextPull);
      
      // Set video URL based on rarity
      // Replace these with your actual HSR animation video URLs
      if (nextPull.rarity === 5) {
        setVideoUrl('YOUR_5_STAR_GOLD_VIDEO_URL.mp4');
      } else if (nextPull.rarity === 4) {
        setVideoUrl('YOUR_4_STAR_PURPLE_VIDEO_URL.mp4');
      } else {
        setVideoUrl('YOUR_3_STAR_BLUE_VIDEO_URL.mp4');
      }
      
      setAnimationStage('video');
      
      // Video plays for about 3-4 seconds, then show element/silhouette for 5-stars
      setTimeout(() => {
        if (nextPull.rarity === 5) {
          setAnimationStage('element');
        } else {
          setAnimationStage('reveal');
        }
      }, 3500);
      
      // For 5-stars: element -> silhouette -> reveal
      if (nextPull.rarity === 5) {
        setTimeout(() => setAnimationStage('silhouette'), 4500);
        setTimeout(() => setAnimationStage('reveal'), 5500);
        setTimeout(() => setAnimationStage('result'), 6500);
        
        setTimeout(() => {
          setPullQueue(prev => prev.slice(1));
          setCurrentPull(null);
          setAnimationStage('none');
        }, 8000);
      } else {
        // For 3-4 stars: video -> reveal -> result
        setTimeout(() => setAnimationStage('result'), 5000);
        
        setTimeout(() => {
          setPullQueue(prev => prev.slice(1));
          setCurrentPull(null);
          setAnimationStage('none');
        }, 6500);
      }
    } else if (pullQueue.length === 0 && currentPull === null && pulling) {
      setPulling(false);
    }
  }, [pullQueue, currentPull, pulling]);

  const getRarityColor = (rarity) => {
    if (rarity === 5) return '#FFD700';
    if (rarity === 4) return '#A855F7';
    return '#60A5FA';
  };

  const getElementIcon = (element) => {
    const icons = {
      'Geo': '🪨',
      'Hydro': '💧',
      'Ice': '❄️',
      'Fire': '🔥',
      'Lightning': '⚡',
      'Physical': '⚔️',
      'Quantum': '🌌',
      'Imaginary': '✨',
      'Wind': '💨'
    };
    return icons[element] || '✨';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main UI */}
      {!pulling && (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Stellar Warp
            </h1>
            <p className="text-xl text-purple-300">Embark on your journey among the stars</p>
          </div>

          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 mb-12 border-2 border-purple-500/50 shadow-2xl">
            <div className="flex gap-12">
              <div className="text-center">
                <p className="text-purple-300 text-sm mb-2">4★ Pity</p>
                <p className="text-3xl font-bold text-purple-400">{pity4}<span className="text-lg text-purple-300">/10</span></p>
              </div>
              <div className="text-center">
                <p className="text-yellow-300 text-sm mb-2">5★ Pity</p>
                <p className="text-3xl font-bold text-yellow-400">{pity5}<span className="text-lg text-yellow-300">/90</span></p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => performPulls(1)}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Star className="w-6 h-6" />
                <span>Single Pull</span>
              </div>
            </button>
            
            <button
              onClick={() => performPulls(10)}
              className="group relative bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-105 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <span>10 Pull</span>
              </div>
            </button>
          </div>

          <div className="mt-16 text-center text-sm text-purple-300">
            <p>5★ Rate: 0.6% | 4★ Rate: 5.1% | 3★ Rate: 94.3%</p>
          </div>
        </div>
      )}

      {/* Pull Animation */}
      {pulling && currentPull && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          {/* Video Animation */}
          {animationStage === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                autoPlay
                muted
                className="w-full h-full object-cover"
                src={videoUrl}
                onError={() => {
                  // Fallback if video doesn't load
                  console.log('Video failed to load, using fallback animation');
                }}
              >
                Your browser does not support the video tag.
              </video>
              {/* Fallback animation if video fails */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 opacity-80 flex items-center justify-center">
                <div className="text-9xl animate-pulse">✨</div>
              </div>
            </div>
          )}

          {/* Element Reveal (5-star only) */}
          {animationStage === 'element' && currentPull.rarity === 5 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 animate-fadeIn">
              <div className="text-center">
                <div 
                  className="text-[12rem] mb-8 animate-scaleIn drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                  style={{ 
                    filter: `drop-shadow(0 0 50px ${currentPull.color})`
                  }}
                >
                  {getElementIcon(currentPull.element)}
                </div>
                <p className="text-6xl font-bold animate-scaleIn" style={{ color: currentPull.color, animationDelay: '0.3s' }}>
                  {currentPull.element}
                </p>
              </div>
            </div>
          )}

          {/* Silhouette Reveal (5-star only) */}
          {animationStage === 'silhouette' && currentPull.rarity === 5 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/95 animate-fadeIn">
              <div className="text-center">
                <div 
                  className="w-80 h-80 rounded-3xl flex items-center justify-center mb-8 animate-scaleIn relative overflow-hidden"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    boxShadow: `0 0 100px 20px ${currentPull.color}, inset 0 0 100px ${currentPull.color}`,
                    border: `4px solid ${currentPull.color}`
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${currentPull.color} 0%, transparent 70%)`
                    }}
                  />
                  <span className="text-9xl font-bold opacity-20 relative z-10">{currentPull.name[0]}</span>
                </div>
                <div className="flex justify-center mb-6 gap-2">
                  {[...Array(currentPull.rarity)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-10 h-10 fill-current animate-bounce" 
                      style={{ 
                        color: getRarityColor(currentPull.rarity),
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <div className="text-3xl text-gray-400 animate-pulse">???</div>
              </div>
            </div>
          )}

          {/* Character Reveal */}
          {animationStage === 'reveal' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
              <div className="text-center animate-reveal">
                <div 
                  className="w-96 h-96 rounded-3xl flex flex-col items-center justify-center mb-8 shadow-2xl relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentPull.color}dd, ${getRarityColor(currentPull.rarity)}dd)`,
                    boxShadow: `0 0 120px 30px ${currentPull.color}`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl font-bold opacity-90">{currentPull.name[0]}</div>
                  </div>
                  
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-center mb-6 gap-2">
                  {[...Array(currentPull.rarity)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-12 h-12 fill-current animate-pulse" 
                      style={{ 
                        color: getRarityColor(currentPull.rarity),
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                <h2 className="text-6xl font-bold mb-3 drop-shadow-lg">{currentPull.name}</h2>
                <p className="text-3xl mb-4 opacity-80">{currentPull.subtitle}</p>
                {currentPull.element && (
                  <p className="text-2xl mb-2" style={{ color: currentPull.color }}>
                    {getElementIcon(currentPull.element)} {currentPull.element}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Result Screen */}
          {animationStage === 'result' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
              <div className="text-center">
                <div 
                  className="w-80 h-80 rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentPull.color}, ${getRarityColor(currentPull.rarity)})`,
                  }}
                >
                  <div className="text-9xl font-bold">{currentPull.name[0]}</div>
                </div>
                
                <div className="flex justify-center mb-4 gap-2">
                  {[...Array(currentPull.rarity)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-10 h-10 fill-current" 
                      style={{ color: getRarityColor(currentPull.rarity) }}
                    />
                  ))}
                </div>
                
                <h2 className="text-5xl font-bold mb-2">{currentPull.name}</h2>
                <p className="text-2xl mb-2 opacity-80">{currentPull.subtitle}</p>
                {currentPull.element && (
                  <p className="text-xl mb-2" style={{ color: currentPull.color }}>
                    {getElementIcon(currentPull.element)} {currentPull.element}
                  </p>
                )}
                
                {pullQueue.length > 0 && (
                  <p className="text-sm text-purple-300 mt-8 animate-pulse">
                    {pullQueue.length} more to reveal...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes reveal {
          from {
            transform: scale(0.5) translateY(100px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-reveal {
          animation: reveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}

export default GachaSim;