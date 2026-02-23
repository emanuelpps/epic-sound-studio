function WaveLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="flex items-end gap-[3px] h-16">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-fuchsia-500 via-pink-500 to-cyan-400 animate-wave"
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default WaveLoading;
