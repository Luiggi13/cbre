import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Options.module.css'
import plato from 'public/assets/plato.png'
import logoCbre from 'public/assets/cbre-logo.png'
interface Restaurante {
  name: string;
  menu: string;
  carta: string;
}
export default function Options() {
  const restaurantes: Restaurante[] = [
    {
      "name": "Santa Clara",
      "menu": "https://www.santaclararestaurante.com/es/menu-grupo",
      "carta": "https://www.santaclararestaurante.com/es/restaurante"
    },
    {
      "name": "La Selva",
      "menu": "https://laselvabarcelona.es/carta/",
      "carta": ""
    },
    {
      "name": "Casa Petra",
      "menu": "https://www.casapetrarestaurante.com/menus",
      "carta": ""
    },
    {
      "name": "Bendito Fuocco",
      "menu": "https://www.benditofuoco.com/_files/ugd/2958ac_89886b58ce5c4c258ccdcd3beca248c0.pdf",
      "carta": ""
    },
    {
      "name": "Locavore",
      "menu": "https://www.benditofuoco.com/_files/ugd/2958ac_89886b58ce5c4c258ccdcd3beca248c0.pdf",
      "carta": ""
    },
  ]
  const router = useRouter()
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUser = () => {
      if (localStorage.getItem('userCbre') === '') router.push('/')
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

      <div className="flex flex-row max-h-full w-full">
        <div className="flex w-full text-black mt-40 mx-20 py-5 bg-white rounded-lg relative mb-10">
          <div className="absolute inset-x-0 -top-10">
            <Image
              alt=""
              src={logoCbre}
              className="mx-auto rounded-full shadow-lg shadow-gray-500"
              width="100"
              height="100"
            />
          </div>
          <div className="flex flex-col w-2/4 max-h-full justify-center px-20">
            <h1 className="title text-3xl">Healthy food to live a healthier life in the future</h1>
            <p className='text-gray-500 text-xl mt-3'>
              sad Lorem ipsum
            </p>
          </div>
          <div className="flex w-2/4 max-h-full justify-center items-center">
            <Image
              alt=""
              src={plato}
              className="mx-auto rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-full w-full justify-center items-center">
        <h2 className="text-2xl uppercase">Restaurantes a escoger</h2>
      </div>
      <div className="flex max-h-full w-full">
        <div className="flex w-full text-black mt-4 mx-20 py-10 bg-white rounded-lg relative mb-10 px-5">
          {restaurantes.map((item,index) => {
            return <div key={index} className=" w-1/4 justify-center drop-shadow-md hover:drop-shadow-xl h-40 bg-white rounded-lg mx-5">
              <p className='bg-green-800'> {item.name} </p>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

