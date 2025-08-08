import { Chat } from "./components/chat/Chat";
import { Landing } from "./components/Landing";
import { AgenticaRpcProvider } from "./provider/AgenticaRpcProvider";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 우주 배경 레이어들 */}
      {/* 기본 우주 배경: 깊은 보라 → 블랙 그라데이션 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#1a0b2e] to-[#000000]" />
      
      {/* 애니메이션 네뷸라 레이어 1 (시안-보라) */}
      <div 
        className="fixed inset-0 pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(ellipse 800px 600px at 20% 30%, 
                      rgba(56, 189, 248, 0.15) 0%, 
                      rgba(99, 102, 241, 0.12) 40%, 
                      transparent 70%)`,
          animationDuration: '8s'
        }}
      />
      
      {/* 애니메이션 네뷸라 레이어 2 (핑크-보라) */}
      <div 
        className="fixed inset-0 pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(ellipse 600px 400px at 80% 70%, 
                      rgba(244, 114, 182, 0.08) 0%, 
                      rgba(139, 92, 246, 0.12) 50%, 
                      transparent 80%)`,
          animationDuration: '12s',
          animationDelay: '2s'
        }}
      />
      
      {/* 움직이는 별들 레이어 1 - 작은 별들 */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle, #ffffff 0.5px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'moveStars 20s linear infinite'
        }}
      />
      
      {/* 움직이는 별들 레이어 2 - 중간 별들 */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle, #ffffff 0.8px, transparent 1.5px)`,
          backgroundSize: '80px 80px',
          animation: 'moveStars 35s linear infinite reverse'
        }}
      />
      
      {/* 움직이는 별들 레이어 3 - 큰 별들 */}
      <div 
        className="fixed inset-0 opacity-15"
        style={{
          background: `radial-gradient(circle, #ffffff 1px, transparent 2px)`,
          backgroundSize: '150px 150px',
          animation: 'moveStars 50s linear infinite'
        }}
      />
      
      {/* 반짝이는 큰 별들 */}
      <div 
        className="fixed inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 2px)`,
          backgroundSize: '200px 200px',
          animation: 'twinkle 3s ease-in-out infinite alternate'
        }}
      />
      
      {/* 우주 먼지/은하수 효과 */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(45deg, 
                      transparent 40%, 
                      rgba(255,255,255,0.1) 50%, 
                      transparent 60%)`,
          transform: 'rotate(30deg) scale(2)',
          animation: 'drift 60s linear infinite'
        }}
      />

      {/* Content */}
      <div className="relative flex w-full min-h-screen z-10">
        <div className="hidden lg:flex md:flex-1">
          <Landing />
        </div>
        <AgenticaRpcProvider>
          <Chat />
        </AgenticaRpcProvider>
      </div>
    </div>
  );
}

export default App;
