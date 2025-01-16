import React from 'react';
import { Button } from './button';
import { Separator } from './separator';
import Link from 'next/link';
import Image from 'next/image';

export const Login = () => {
  return (
    <section className='flex flex-col'>
      <h2 className='text-center mb-4 font-semibold'>Faça seu login</h2>

      <p className='text-sm text-muted-foreground'>
        Continue com seu e-mail institucional
      </p>
      <Separator className='my-3' />
      <Button variant='outline'>
        <Image src='/gmail.png' alt='Gmail icon' width={13} height={13} />
        <Link href='http://localhost:3000/google'>Login com Gmail</Link>
      </Button>
    </section>
  );
};
