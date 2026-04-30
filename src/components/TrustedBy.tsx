import React from 'react';

export const TrustedBy: React.FC = () => {
  const logos = [
    { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Meta', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'LinkedIn', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    { name: 'GitHub', url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
  ];

  return (
    <section className="py-12 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-10">
          Trusted by engineers at world-class companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 hover:opacity-100 transition-all duration-500">
          {logos.map((logo) => (
            <img 
              key={logo.name} 
              src={logo.url} 
              alt={logo.name} 
              className="h-6 md:h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
