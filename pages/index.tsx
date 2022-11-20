import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logoCbre from 'public/assets/cbre-logo.png'
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)

  const submitContact = async (event: any) => {
    event.preventDefault();
    const res = await fetch(`/api/users`)
    const data:any [] = await res.json()
    data.forEach((item:string)=> {
      if(item.toLocaleLowerCase() === (event.target.name.value).toLocaleLowerCase()) {
        setIsValid(true);
        localStorage.setItem('userCbre', JSON.stringify(event.target.name.value))
        router.push('/options')
      }else if(String(event.target.name.value).toLocaleLowerCase().includes('AR'.toLocaleLowerCase()) && String(event.target.name.value).toLocaleLowerCase().includes('Raquel'.toLocaleLowerCase())) {
        setIsValid(true);
        localStorage.setItem('userCbre', JSON.stringify('Raquel AR'))
        router.push('/options')
      }
      else if(String(event.target.name.value).toLocaleLowerCase().includes('María'.toLocaleLowerCase()) || String(event.target.name.value).toLocaleLowerCase().includes('Maria'.toLocaleLowerCase())) {
        setIsValid(true);
        localStorage.setItem('userCbre', JSON.stringify('Maria'))
        router.push('/options')
      }
      else if(String(event.target.name.value).toLocaleLowerCase().includes('Jessica'.toLocaleLowerCase()) || String(event.target.name.value).toLocaleLowerCase().includes('Jéssica'.toLocaleLowerCase())) {
        setIsValid(true);
        localStorage.setItem('userCbre', JSON.stringify('Jessica'))
        router.push('/options')
      }
      else if(String(event.target.name.value).toLocaleLowerCase().includes('Miriam'.toLocaleLowerCase()) || String(event.target.name.value).toLocaleLowerCase().includes('Míriam'.toLocaleLowerCase())) {
        setIsValid(true);
        localStorage.setItem('userCbre', JSON.stringify('Miriam'))
        router.push('/options')
      }
    })

  };
  return (
    <div className={styles.main}>
      <Head>
        <title>CBRE Night Dinner 🎄</title>
        <meta name="description" content="CBRE Night Dinner AP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex max-h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="relative w-48 mx-auto">

            <Image
              alt=""
              src={logoCbre}
              className="mx-auto w-48 rounded-full"
              width="100"
              height="100"
            />
          </div>
          <div className="w-full">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Introduce tu nombre
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitContact}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md">
              <div>
                <label htmlFor="name-user" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name-user"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Nombre del usuario"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Empezamos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
