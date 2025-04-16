// components/DotNavigation.tsx
interface DotButtonProps {
    active: boolean;
    onClick: () => void;
  }
  
  export const DotButton = ({ active, onClick }: DotButtonProps) => {
    return (
      <button
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          active ? 'bg-black' : 'bg-red-200'
        }`}
        onClick={onClick}
      />
    );
  };
  