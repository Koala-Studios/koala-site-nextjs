"use client";
import { useEffect, useRef } from "react";
type Props = { value: number; padTo?: number; prefix?: string; suffix?: string; duration?: number; className?: string; decimals?: number; grouped?: boolean };
export function CountUp({ value, padTo=0, prefix="", suffix="", duration=1200, className, decimals=0, grouped=false }: Props) {
  const ref=useRef<HTMLSpanElement>(null);
  const format=(n:number)=>prefix+(grouped ? n.toLocaleString("en-CA",{minimumFractionDigits:decimals,maximumFractionDigits:decimals}) : n.toFixed(decimals).padStart(padTo,"0"))+suffix;
  const final=format(value);
  useEffect(()=>{
    const el=ref.current;
    if(!el) return;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0, played=false;
    const print=(n:number)=>prefix+(grouped ? n.toLocaleString("en-CA",{minimumFractionDigits:decimals,maximumFractionDigits:decimals}) : n.toFixed(decimals).padStart(padTo,"0"))+suffix;
    const finish=()=>{ if(motion.matches){cancelAnimationFrame(frame);el.textContent=print(value);played=true;} };
    if(motion.matches) { el.textContent=print(value); return; }
    el.textContent=print(0);
    const observer=new IntersectionObserver(entries=>{
      if(played || !entries.some(e=>e.isIntersecting)) return;
      played=true;observer.disconnect();
      const start=performance.now();
      const tick=(now:number)=>{
        const p=Math.min((now-start)/duration,1);
        el.textContent=print(value*(1-Math.pow(1-p,3)));
        if(p<1) frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    },{threshold:.35});
    observer.observe(el);motion.addEventListener("change",finish);
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);motion.removeEventListener("change",finish);};
  },[value,padTo,prefix,suffix,duration,decimals,grouped]);
  return <span className={className} style={{fontVariantNumeric:"tabular-nums"}}><span className="koala-sr-only">{final}</span><span ref={ref} aria-hidden="true" data-count-value={final}>{final}</span></span>;
}
