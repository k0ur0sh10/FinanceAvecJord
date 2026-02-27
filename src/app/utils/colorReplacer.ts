// Utility to help identify color replacements needed
// Gold (#F5D366 / var(--gold)) -> Blue (#3B82F6)
// Champagne (#E6C994 / var(--champagne)) -> Light Blue (#60A5FA)

export const COLOR_MAP = {
  'var(--gold)': '#3B82F6',
  'var(--champagne)': '#60A5FA',
  'text-[var(--gold)]': 'text-[#3B82F6]',
  'bg-[var(--gold)]': 'bg-[#3B82F6]',
  'border-[var(--gold)]': 'border-[#3B82F6]',
  'hover:shadow-[var(--gold)]': 'hover:shadow-[#3B82F6]',
  'from-[var(--gold)]': 'from-[#3B82F6]',
  'to-[var(--champagne)]': 'to-[#60A5FA]',
  'ring-[var(--gold)]': 'ring-[#3B82F6]',
  'focus:border-[var(--gold)]': 'focus:border-[#3B82F6]',
  'focus:ring-[var(--gold)]': 'focus:ring-[#3B82F6]',
  'hover:text-[var(--gold)]': 'hover:text-[#3B82F6]',
  'hover:border-[var(--gold)]': 'hover:border-[#3B82F6]',
};
