"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TeacherAuthContextType {
  isTeacherLoggedIn: boolean;
  loginTeacher: () => void;
  logoutTeacher: () => void;
}

const TeacherAuthContext = createContext<TeacherAuthContextType | undefined>(undefined);

export const useTeacherAuth = () => {
  const context = useContext(TeacherAuthContext);
  if (context === undefined) {
    throw new Error('useTeacherAuth must be used within a TeacherAuthProvider');
  }
  return context;
};

interface TeacherAuthProviderProps {
  children: ReactNode;
}

export const TeacherAuthProvider = ({ children }: TeacherAuthProviderProps) => {
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);

  useEffect(() => {
    // Check if teacher is logged in from localStorage
    const teacherAuth = localStorage.getItem('teacherAuth');
    if (teacherAuth === 'true') {
      setIsTeacherLoggedIn(true);
    }
  }, []);

  const loginTeacher = () => {
    setIsTeacherLoggedIn(true);
    localStorage.setItem('teacherAuth', 'true');
  };

  const logoutTeacher = () => {
    setIsTeacherLoggedIn(false);
    localStorage.removeItem('teacherAuth');
  };

  return (
    <TeacherAuthContext.Provider value={{ isTeacherLoggedIn, loginTeacher, logoutTeacher }}>
      {children}
    </TeacherAuthContext.Provider>
  );
};
