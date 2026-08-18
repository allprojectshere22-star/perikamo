import { useEffect, useState } from "react";
import splash from "@/assets/perikoma-splash-new.png.asset.json";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 5000);
    const t2 = setTimeout(() => setVisible(false), 5600);
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
      <img
        src={splash.url}
        alt="Perikoma"
        className="max-h-[40vh] w-[52vw] max-w-[240px] rounded-2xl object-contain"
      />
    </div>
  );
}
