import { useEffect, useState } from "react";
import splash from "@/assets/perikoma-splash.jpg.asset.json";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1600);
    const t2 = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0D0D0D] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={splash.url}
          alt="Perikoma"
          className="h-auto w-[28vw] max-w-[110px] rounded-full object-contain"
        />
        <span className="font-display text-base font-semibold tracking-tight text-white/70">
          Perikoma
        </span>
      </div>
    </div>
  );
}
