"use client";

import { TimelineHorizontal } from "./TimelineHorizontal";

interface TimelineMobileProps {
  experiences: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
  }>;
}

export function TimelineMobile({ experiences }: TimelineMobileProps) {
  return (
    <div className="timeline-mobile">
      {/* Scroll Container */}
      <div className="overflow-x-auto px-4 py-6">
        <div className="flex min-w-max gap-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="flex-shrink-0 w-64">
              {/* Timeline Node */}
              <div className="relative mb-4">
                {/* Horizontal connector between nodes */}
                {index < experiences.length - 1 && (
                  <div className="absolute top-1/2 left-12 w-52 h-0.5 bg-[#2a2a2a] -translate-y-1/2" />
                )}
                
                {/* Node Circle */}
                <div className={`w-12 h-12 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center ${
                  index === experiences.length - 1 
                    ? 'bg-[#d4af37] border-[#d4af37]' 
                    : 'bg-[#1a1a1a] border-[#2a2a2a]'
                }`}>
                  <div className="w-3 h-3 rounded-full bg-[#ffffff]" />
                </div>
              </div>
              
              {/* Company Details */}
              <div className="pl-16">
                <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center mb-3 ${
                  index === experiences.length - 1 
                    ? 'bg-[#d4af37] border-[#d4af37]' 
                    : 'bg-[#1a1a1a] border-[#2a2a2a]'
                }`}>
                  <span className={`text-sm font-bold ${
                    index === experiences.length - 1 ? 'text-[#0a0a0a]' : 'text-[#888888]'
                  }`}>
                    {exp.company.split(' ').map(word => word[0]).join('').toUpperCase()}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-[#ffffff] mb-1">{exp.company}</h4>
                <p className="text-xs text-[#a0a0a0] mb-1">{exp.role}</p>
                <span className="text-xs font-medium text-[#d4af37]">{exp.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}