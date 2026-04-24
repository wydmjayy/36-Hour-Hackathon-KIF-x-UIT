import React from 'react';

const ZombieScoreBar = ({ score }) => {
  // 0 is Good (Green), 100 is Bad (Red)
  const getBarColor = (val) => {
    if (val < 30) return 'bg-green-500';
    if (val < 70) return 'bg-orange-500';
    return 'bg-error';
  };

  const getTextColor = (val) => {
    if (val < 30) return 'text-green-600';
    if (val < 70) return 'text-orange-600';
    return 'text-error';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Zombie Score</span>
        <span className={`text-xs font-bold ${getTextColor(score)}`}>{score}/100</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ZombieScoreBar;
