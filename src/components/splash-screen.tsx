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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative size-40 overflow-hidden rounded-3xl ring-1 ring-border shadow-2xl">
        <img
          src={splash.url}
          alt="Perikoma"
          className="size-full object-cover"
        />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
        Perikoma
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Learn your cycle</p>
    </div>
  );
}
