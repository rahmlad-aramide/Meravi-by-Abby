import { createContext, useContext, useState, ReactNode } from 'react';

interface GenderContextProps {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
}

const GenderContext = createContext<GenderContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useGender = () => {
  const context = useContext(GenderContext);
  if (!context) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
};

export const GenderProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};
