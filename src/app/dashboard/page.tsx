'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return <h1>Bem vindo ao Classplanner</h1>;
};

export default Dashboard;
