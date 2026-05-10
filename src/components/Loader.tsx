
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen ">
      
      <div className="relative w-32 h-32">
        
        <div className="absolute inset-0 rounded-full border-4 border-t-yellow-400 border-yellow-900 animate-spin"></div>

        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center
         shadow-[0_0_25px_gold]">
          
          <span className="text-4xl font-bold text-yellow-400 tracking-widest animate-pulse">
            H
          </span>

        </div>
      </div>

    </div>
  );
}