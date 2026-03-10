import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
          activeCategory === 'All'
            ? 'bg-zinc-900 text-white shadow-md'
            : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300'
        }`}
      >
        All Projects
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeCategory === category
              ? 'bg-zinc-900 text-white shadow-md'
              : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
