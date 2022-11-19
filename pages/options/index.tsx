import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Options.module.css'


export default function Options() {
  const router = useRouter()
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUser = () => {
      if(localStorage.getItem('userCbre') === '' ) router.push('/')
      setUser(localStorage.getItem('userCbre')!)
    }
    getUser();
  }, [router]);  
  return (
    <div className={styles.main}>
      <Head>
        <title>CBRE Night Dinner</title>
        <meta name="description" content="CBRE Night Dinner AP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex max-h-full w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='col-12'>asdasd</div>
      </div>
    </div>
  )
}
function usetState(arg0: string | null): [any, any] {
  throw new Error('Function not implemented.')
}

