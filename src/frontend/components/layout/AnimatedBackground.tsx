/** Light, vibrant mesh-gradient backdrop shared across all pages */
export function AnimatedBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="mesh-bg pointer-events-none fixed inset-0 -z-10" aria-hidden />

      {/* Soft drifting color orbs for depth */}
      <div
        className="pointer-events-none fixed -left-20 top-1/4 -z-10 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-16 bottom-1/3 -z-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl animate-floatDelayed"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/3 -z-10 h-64 w-96 rounded-full bg-sky-300/20 blur-3xl"
        aria-hidden
      />

      {children}
    </div>
  );
}
