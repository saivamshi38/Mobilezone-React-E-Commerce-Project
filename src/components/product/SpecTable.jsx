import React from 'react';
import { Cpu, Smartphone, BatteryCharging, Camera, Shield, Wifi, HardDrive, Layers } from 'lucide-react';

export const SpecTable = ({ specs }) => {
  if (!specs || Object.keys(specs).length === 0) {
    return <p className="text-sm text-slate-400 italic">Specifications not available for this item.</p>;
  }

  const specRows = [
    { label: 'Display Screen', value: specs.display, icon: Smartphone },
    { label: 'Resolution', value: specs.resolution, icon: Layers },
    { label: 'Processor / Chipset', value: specs.processor, icon: Cpu },
    { label: 'RAM Memory', value: specs.ram, icon: HardDrive },
    { label: 'Internal Storage', value: specs.storage, icon: HardDrive },
    { label: 'Rear Cameras', value: specs.mainCamera, icon: Camera },
    { label: 'Front Selfie Camera', value: specs.selfieCamera, icon: Camera },
    { label: 'Battery Capacity', value: specs.battery, icon: BatteryCharging },
    { label: 'Charging Speeds', value: specs.charging, icon: BatteryCharging },
    { label: 'Operating System', value: specs.os, icon: Layers },
    { label: 'Weight', value: specs.weight, icon: Layers },
    { label: 'Connectivity & 5G', value: specs.connectivity, icon: Wifi },
    { label: 'Water & Dust Resistance', value: specs.ipRating, icon: Shield },
    { label: 'Total Output', value: specs.totalOutput, icon: BatteryCharging },
    { label: 'Ports', value: specs.ports, icon: Wifi },
    { label: 'Technology', value: specs.technology, icon: Cpu },
    { label: 'Material & Build', value: specs.material, icon: Shield },
    { label: 'Protection Rating', value: specs.protection, icon: Shield },
    { label: 'MagSafe Support', value: specs.magsafe, icon: Shield },
    { label: 'Audio Drivers', value: specs.driver, icon: Cpu },
    { label: 'Noise Cancellation', value: specs.anc, icon: Shield },
    { label: 'Battery Runtime', value: specs.batteryLife, icon: BatteryCharging },
    { label: 'Watch Case Material', value: specs.case, icon: Shield }
  ].filter(r => r.value);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
      {specRows.map((row, idx) => {
        const Icon = row.icon;
        return (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-2.5 sm:w-1/3 text-slate-500 dark:text-slate-400">
              <Icon className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">{row.label}</span>
            </div>
            <div className="sm:w-2/3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 sm:mt-0">
              {row.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
