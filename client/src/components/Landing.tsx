import wisoftLogo from "/wisoft.png";

export function Landing() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center p-8 relative">
      {/* 우주 홀로그램 효과를 위한 오버레이 (애니메이션 제거) */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(56, 189, 248, 0.1) 2px,
              rgba(56, 189, 248, 0.1) 4px
            )`,
            // 애니메이션 제거하여 성능 개선
          }}
        />
      </div>
      
      <div className="space-y-8 relative z-10">
        <div className="flex items-center justify-center">
          <div className="relative group">
            {/* 로고 주변 우주 파티클 효과 (애니메이션 제거) */}
            <div className="absolute -inset-4 rounded-full opacity-30 blur-sm bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400" />
            <img
              src={wisoftLogo}
              alt="WISOFT logo"
              className="relative w-72 md:w-80 h-auto transition-all duration-700 
                        drop-shadow-[0_0_2rem_rgba(56,189,248,0.4)] 
                        hover:drop-shadow-[0_0_3rem_rgba(99,102,241,0.6)]
                        hover:scale-105 group-hover:rotate-3"
            />
            {/* 홀로그램 스캔 라인 효과 제거로 성능 개선 */}
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-purple-300 to-pink-200 bg-clip-text text-transparent
                        hover:from-cyan-100 hover:via-purple-200 hover:to-pink-100 transition-all duration-500">
            2025 Summer Seminar
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto relative">
            2025 Summer Seminar with MCP
            {/* 텍스트 뒤 글로우 효과 */}
            <span className="absolute inset-0 blur-sm bg-gradient-to-r from-cyan-400/20 to-purple-400/20 -z-10" />
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="https://wrtnlabs.io/agentica/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg 
                      hover:from-cyan-400 hover:to-purple-500 transition-all duration-300
                      shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]
                      transform hover:scale-105 active:scale-95"
          >
            Documentation
          </a>
          <a
            href="https://github.com/MoonDongmin/2025-summer-seminar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-purple-500/50 bg-transparent text-purple-200 rounded-lg 
                      hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300
                      shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]
                      transform hover:scale-105 active:scale-95"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
