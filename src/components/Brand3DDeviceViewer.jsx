import React from 'react';

// Replaced the blocky CSS code-models with clean placeholders.
// Once you provide the transparent PNGs or .glb 3D files for the laptops/bikes,
// they will be dropped exactly here, and I will code the interactive hover/spin effects around them.
export default function Brand3DDeviceViewer({ brandId }) {
  return (
    <div className="relative w-full h-44 rounded-xl border-2 border-dashed border-[#333] bg-[#0a0a0a] flex flex-col items-center justify-center p-4 group hover:border-[#ffe600] transition-colors mb-4 overflow-hidden">
      
      {/* Magazine-style diagonal tape aesthetic */}
      <div className="absolute -top-4 -right-4 w-12 h-4 bg-[#ffe600]/20 rotate-45" />
      <div className="absolute -bottom-4 -left-4 w-12 h-4 bg-[#ffe600]/20 rotate-45" />

      <span className="font-mono-code text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
        // ASSET PLACEHOLDER
      </span>
      
      <div className="font-display font-black text-sm text-[#ffe600] text-center uppercase tracking-wider mb-2">
        DROP {brandId} <br/> 3D MODEL OR CUTOUT PNG HERE
      </div>

      <p className="font-mono-code text-[8px] text-gray-400 text-center leading-relaxed">
        We need a real, high-quality transparent image or 3D file to get the magazine popup effect.
      </p>
    </div>
  );
}
