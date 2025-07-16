'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();

type DecodedToken = {
  userId: string;
  orchestraId: string;
  name: string;
  accessLevel: string;
};

type CookieContextType = {
  setCookie: (key: string, value: string) => void;
  getCookie: (key: string) => string | undefined;
  removeCookie: (key: string) => void;
  userData: DecodedToken | null;
};

const CookieContext = createContext<CookieContextType | null>(null);

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);

  const setCookie = (key: string, value: string) => {
    cookies.set(key, value, { path: '/' });
    if (key === 'authTokenSmart') {
      try {
        const decoded = jwtDecode<DecodedToken>(value);
        setUserData(decoded);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
  };

  const getCookie = (key: string) => {
    return cookies.get(key);
  };

  const removeCookie = (key: string) => {
    cookies.remove(key, { path: '/' });
    if (key === 'authTokenSmart') {
      setUserData(null);
    }
  };

  useEffect(() => {
    const token = cookies.get('authTokenSmart');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserData(decoded);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
  }, []);


  return (
    <CookieContext.Provider value={{ setCookie, getCookie, removeCookie, userData }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie deve ser usado dentro de um <CookieProvider>');
  }
  return context;
};
