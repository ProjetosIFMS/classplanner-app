'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('jwtToken');
  }, [router]);
  return <h1>Bem vindo ao Classplanner</h1>;
}
