import React from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Device } from '../data';

export interface DeviceCounterProps {
  device: Device;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const DeviceCounter: React.FC<DeviceCounterProps> = ({ device, count, onIncrement, onDecrement }) => {
  const Icon = device.icon;
  
  return (
    <motion.div 
      layout
      className={`flex items-center justify-between p-4 rounded-xl border transition-all h-[5.5rem] ${
        count > 0 
          ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${count > 0 ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-400'}`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className={`font-medium ${count > 0 ? 'text-white' : 'text-gray-300'}`}>{device.name}</h3>
          {device.description && <p className="text-xs text-gray-500">{device.description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onDecrement}
          disabled={count === 0}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            count === 0 
              ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Minus size={16} />
        </button>
        
        <span className={`w-6 text-center font-semibold ${count > 0 ? 'text-cyan-400' : 'text-gray-600'}`}>
          {count}
        </span>

        <button 
          onClick={onIncrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </motion.div>
  );
}
