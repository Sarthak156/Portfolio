"use client";

export default function LiveWallpaper() {
  return (
    <div className="live-wallpaper" aria-hidden="true">
      <div className="hex-grid hex-grid-a" />
      <div className="hex-glow glow-orange glow-orange-1" />
      <div className="hex-glow glow-orange glow-orange-2" />
      <div className="hex-glow glow-cyan glow-cyan-1" />
      <div className="hex-glow glow-cyan glow-cyan-2" />
      <div className="hex-glow glow-blue glow-blue-1" />
      <div className="hex-glow glow-purple glow-purple-1" />
      <div className="hex-glow glow-green glow-green-1" />
      <div className="hex-line line-orange line-orange-1" />
      <div className="hex-line line-orange line-orange-2" />
      <div className="hex-line line-cyan line-cyan-1" />
      <div className="hex-line line-cyan line-cyan-2" />
      <div className="hex-line line-blue line-blue-1" />
      <div className="hex-line line-purple line-purple-1" />
      <div className="hex-line line-green line-green-1" />
      <div className="wall-vignette" />
    </div>
  );
}
