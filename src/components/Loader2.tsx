
export default function Loader2() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      
      <div className="flex flex-col items-center gap-6">

        {/* Circle Draw Animation */}
        <svg
          className="w-40 h-40 animate-drawCircle"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#facc15"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="565"
            strokeDashoffset="565"
          />
        </svg>

        {/* H letter */}
        <h1 className="text-yellow-400 text-6xl font-bold animate-logoPop drop-shadow-[0_0_20px_gold]">
          H
        </h1>

        {/* HASEEB text */}
        <p className="text-yellow-300 tracking-[12px] text-xl animate-fadeText">
          H A S E E B
        </p>

      </div>
    </div>
  );
}