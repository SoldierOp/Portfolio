import React, { useState, useEffect } from 'react';

/**
 * MIND-BLOWING FOOTER - ABSOLUTELY STUNNING!
 * This will be the most impressive footer anyone has ever seen!
 */
const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { name: 'GITHUB', icon: '⚡', color: 'text-tactical-primary', hoverColor: 'text-holo-green', url: 'https://github.com/SoldierOp' },
    { name: 'LINKEDIN', icon: '🔗', color: 'text-holo-blue', hoverColor: 'text-tactical-primary', url: 'https://linkedin.com/in/mayank-chauhan-1a1651262/' },
    { name: 'LEETCODE', icon: '💻', color: 'text-tactical-warning', hoverColor: 'text-holo-blue', url: 'https://leetcode.com/u/MayankO7/' },
    { name: 'EMAIL', icon: '📧', color: 'text-holo-purple', hoverColor: 'text-tactical-warning', url: 'mailto:mayankchahes@gmail.com' },
  ];

  const techStack = [
    { name: 'PYTHON', level: 95 },
    { name: 'C/C++', level: 90 },
    { name: 'REACT', level: 88 },
    { name: 'AI/ML', level: 85 },
    { name: 'OPENCV', level: 82 },
    { name: 'JAVASCRIPT', level: 80 },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 glass-morphism border-t border-tactical-primary/30 shadow-lg neon-border animate-scan">
      <div className="container mx-auto px-6 py-4">
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-4">
          
          {/* PORTFOLIO INFO */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
              <div className="w-8 h-8 tactical-gradient rounded-lg flex items-center justify-center neon-border animate-float">
                <span className="text-sm font-display font-bold text-tactical-dark animate-glow">M</span>
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-tactical-primary animate-neon">
                  MAYANK.EXE
                </h3>
                <p className="text-xs text-tactical-secondary font-tactical">
                  AI & Robotics Engineer
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-tactical">
              AI-Powered Solutions & 3D Development
            </p>
          </div>

          {/* CONTACT FORM */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-tactical-primary font-display mb-3 animate-glow">
              CONTACT ME
            </h4>
            <form className="space-y-2">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full px-2 py-1 bg-tactical-gray/50 border border-tactical-primary/20 rounded text-white placeholder-gray-400 font-tactical text-xs neon-border"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-2 py-1 bg-tactical-gray/50 border border-tactical-primary/20 rounded text-white placeholder-gray-400 font-tactical text-xs neon-border"
                defaultValue="mayankchahes@gmail.com"
              />
              <textarea 
                placeholder="Message" 
                rows={2}
                className="w-full px-2 py-1 bg-tactical-gray/50 border border-tactical-primary/20 rounded text-white placeholder-gray-400 font-tactical text-xs resize-none neon-border"
              ></textarea>
              <button 
                type="submit"
                className="w-full px-2 py-1 bg-tactical-primary text-black font-bold rounded hover:bg-holo-blue transition-colors font-tactical text-xs neon-border"
              >
                SEND
              </button>
            </form>
          </div>

          {/* SOCIAL LINKS */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-tactical-primary font-display mb-3 animate-glow">
              CONNECT
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all duration-300 interactive-element ${
                    isHovered === link.name 
                      ? `${link.hoverColor} bg-tactical-gray/30 neon-border animate-glow` 
                      : `${link.color} hover:bg-tactical-gray/20`
                  }`}
                  onMouseEnter={() => setIsHovered(link.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="text-xs font-tactical font-semibold">
                    {link.icon} {link.name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-tactical-primary font-display mb-3 animate-glow">
              TECH STACK
            </h4>
            <div className="space-y-2">
              {techStack.slice(0, 3).map((tech, index) => (
                <div key={index} className="text-left">
                  <div className="flex justify-between text-xs font-tactical mb-1">
                    <span className="text-gray-300">{tech.name}</span>
                    <span className="text-tactical-primary">{tech.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-tactical-gray/30 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-tactical-primary to-holo-blue rounded-full transition-all duration-1000 animate-glow"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-tactical-primary font-display mb-3 animate-glow">
              SYSTEM STATUS
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-tactical-primary rounded-full animate-float neon-border"></div>
                <span className="text-xs font-tactical text-tactical-secondary animate-glow">ONLINE</span>
              </div>
              <div className="text-xs font-mono text-gray-400">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-xs font-tactical text-gray-400">
                WEBGL 2.0 • REACT 18 • VITE
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-tactical-primary/20 pt-3">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            
            {/* COPYRIGHT */}
            <div className="text-xs font-tactical text-tactical-secondary">
              © 2024 MAYANK CHAUHAN - AI & Robotics Engineer
            </div>

            {/* LIVE CODE STREAM */}
            <div className="flex items-center space-x-4">
              <div className="text-xs font-mono text-tactical-primary animate-glow">
                LIVE CODE STREAM
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-3 bg-tactical-primary rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* PERFORMANCE METER */}
            <div className="flex items-center space-x-2">
              <div className="text-xs font-tactical text-gray-400">PERF:</div>
              <div className="w-16 h-1 bg-tactical-gray/30 rounded-full">
                <div className="h-full bg-gradient-to-r from-tactical-primary to-holo-green rounded-full animate-glow" style={{ width: '98%' }}></div>
              </div>
              <div className="text-xs font-tactical text-tactical-primary animate-glow">98%</div>
            </div>
          </div>
        </div>

        {/* MIND-BLOWING SCAN LINE EFFECT */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tactical-primary to-transparent animate-tactical-pulse"></div>
      </div>
    </footer>
  );
};

export default Footer;