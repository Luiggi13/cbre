import Head from 'next/head'
import Image, { StaticImageData } from 'next/image'
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Options.module.css'
import logoCbre from 'public/assets/cbre-logo.png'
import santaclaraImg from 'public/assets/santa-clara.png'
import laselvaImg from 'public/assets/la-selva.png'
import casapetraImg from 'public/assets/casa-petra.png'
import fuocoImg from 'public/assets/fuocco-2.png'
import locavoreImg from 'public/assets/locavore.png'
import steakImg from 'public/assets/steak.png'
import defaultImage from 'public/assets/default.png'
import check from 'public/assets/check.png'
import uncheck from 'public/assets/uncheck.png'
import question from 'public/assets/question.png'
import { ToastContainer, toast } from 'react-toast'
import { isRestParameter } from 'typescript';


interface Usuarios {
  id: number;
  username: string;
  data: Votos[]
}
interface Votos {
  idDb: number;
  votes: number;
  voted: boolean;
}
interface Restaurante {
  idDb: number;
  name: string;
  menu: string;
  carta: string;
  img?: StaticImageData;
}
export default function Options() {
  const restaurantes: Restaurante[] = [
    {
      "idDb": 1,
      "name": "Santa Clara",
      "menu": "https://www.santaclararestaurante.com/es/menu-grupo",
      "carta": "https://www.santaclararestaurante.com/es/restaurante",
      "img": santaclaraImg
    },
    {
      "idDb": 2,
      "name": "La Selva",
      "carta": "https://laselvabarcelona.es/carta/",
      "menu": "",
      "img": laselvaImg
    },
    {
      "idDb": 3,
      "name": "Casa Petra",
      "carta": "https://www.casapetrarestaurante.com/menus",
      "menu": "",
      "img": casapetraImg
    },
    {
      "idDb": 4,
      "name": "Bendito Fuocco",
      "carta": "https://www.benditofuoco.com/_files/ugd/2958ac_89886b58ce5c4c258ccdcd3beca248c0.pdf",
      "menu": "",
      "img": fuocoImg
    },
    {
      "idDb": 5,
      "name": "Locavore",
      "carta": "https://www.thefork.es/restaurante/locavore-r706353/menu",
      "menu": "",
      "img": locavoreImg
    },
    {
      "idDb": 6,
      "name": "Carnal Steak House",
      "carta": "https://carnalsteakhouse.com/#menu",
      "menu": "",
      "img": steakImg
    },
  ]
  const wave = () => toast.error('No puedes volver a votar al mismo restaurante 2 veces')

  const [actualVotos, setActualVotos] = useState<Votos[]>([])
  const router = useRouter()
  const [user, setUser] = useState('');
  const [tableData, setTableData] = useState<Usuarios[]>();
  const [actualUser, setActualUser] = useState<Usuarios>();
  const [isPermited, setIsPermited] = useState(false);
  const up = async (idRestaurant: number, name: string) => {
    let preVote = actualUser!;
    preVote!.data.forEach((item: Votos) => {
      if (item.idDb === idRestaurant) {
        if (item.voted === true) setIsPermited(false);
        else {
          setIsPermited(true)
          item.votes++
          item.voted = true
          return item;
        }
      }
    })
    if (isPermited) {
      await fetch('/api/vote/update', {
        method: 'POST',
        body: JSON.stringify(preVote.data),
        headers: {
          'Content-Type': 'application/json',
          'user': name
        }
      })
      setIsPermited(false);
      router.reload()
    } else if (!isPermited){

      const res = await fetch(`/api/vote`)
      const data = await res.json()
      checkUser(name, data)
      wave()
    }

  }
  const down = async (idRestaurant: number, name: string) => {
    let preVote = actualUser!;
    preVote!.data.forEach((item: Votos) => {
      if (item.idDb === idRestaurant) {
        if (item.voted === true) setIsPermited(false);
        else {
          setIsPermited(true)
          item.votes--
          item.voted = true
          return item;
        }
      }
    })
    if (isPermited) {
      await fetch('/api/vote/update', {
        method: 'POST',
        body: JSON.stringify(preVote.data),
        headers: {
          'Content-Type': 'application/json',
          'user': name
        }
      })
      setIsPermited(false);
      router.reload()
    } else if (!isPermited){

      const res = await fetch(`/api/vote`)
      const data = await res.json()
      checkUser(name, data)
      wave()
    }

  }

  const checkUser = (name: string, data: Usuarios[]) => {
    data.forEach((usuario) => {
      if (usuario.username.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        setActualUser(usuario);
        setActualVotos(usuario.data)
      }
    })
  }

  const tableDataFetch = () => {
    tableData!.forEach(element => {
      
    });
  }
  useEffect(() => {
    const getUser = async () => {
      await setUser(JSON.parse(localStorage.getItem('userCbre')!))
      await getData(JSON.parse(localStorage.getItem('userCbre')!))
    }
    const getData = async (name: string) => {
      const res = await fetch(`/api/vote`)
      const data = await res.json()
      setTableData(data)
      checkUser(name, data)

    }
    if (localStorage.getItem('userCbre')) {
      getUser();

    } else {
      setUser('')
      router.push('/')
    }
  }, [router]);
  return (
    <div className={styles.main}>
      <Head>
        <title>CBRE Night Dinner 🎄</title>
        <meta name="description" content="CBRE Night Dinner AP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.bgxmaswhite}>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative w-48 mx-auto mb-10">
            <Image
              alt=""
              src={logoCbre}
              className={"mx-auto w-48 rounded-full" && styles.avatar}
            />
          </div>
          <p className="text-xl text-center tracking-tight text-gray-500 mb-5">Bienvenida {user}, en esta página podrás ver los menús de Navidad y votar los que más te gusten 🎄</p>
          <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 uppercase">Ver menús de los restaurantes</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {restaurantes.map((item, index) => {
              return <div key={index} className="group relative mb-5 mt-5">
                <div className="h-full">
                  <ToastContainer delay={3000} />
                  <div className="h-full aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none shadow-red-200 shadow-md relative">
                    <Image
                      src={item.img ? item.img : defaultImage}
                      priority={true}
                      key={index}
                      alt="Front of menus Basic Tee in black."
                      className={"h-full w-full object-cover object-center lg:h-full lg:w-full"}
                    />
                    <div className='absolute bottom-0 left-0 w-full'>
                      <div className="w-full flex justify-between ">
                        <button className="flex bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded items-center text-sm"
                          onClick={() => up(item.idDb, user)}
                        >
                          <span>👍 Me gusta</span>
                        </button>
                        <button className="flex bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded items-center text-sm" onClick={() => down(item.idDb, user)}>
                          <span>👎 No me gusta</span>
                        </button>
                      </div>
                      {/* <div className="flex flex-row justify-between">
                      <button className="flex bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center ">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Me gusta</span>
                      </button>
                      <button className="flex bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>No me gusta</span>
                      </button>
                    </div> */}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    {item.menu ? <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.menu}
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mr-1"
                    >
                      Ver menú
                    </a> : null}
                    {item.carta ? <a
                      href={item.carta}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ml-1"
                    >
                      Ver carta
                    </a> : null}
                  </div>
                </div>
              </div>
            })}


          </div>
        </div>
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 uppercase">Ver menús de los restaurantes</h2>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
          <div className="flex flex-col">
            <div className="overflow-x sm:-mx-6 lg:-mx-8 w-full">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Nombre
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Santa Clara
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          La Selva
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Casa Petra
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Bendito Fuoco
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Locavore
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Carnal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        { tableData?.map((user,index)=> {
                          return (<tr key={index} className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.data[0].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[0].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.data[1].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[1].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.data[2].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[2].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.data[3].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[3].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.data[4].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[4].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.data[5].votes === 1 ?
                            <Image
                            alt=""
                            src={check}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          /> : user.data[5].votes === -1 ?
                          <Image
                            alt=""
                            src={uncheck}
                            width="100"
                            height="100"
                            className={"mx-auto w-10 rounded-full"}
                          />:<Image
                          alt=""
                          src={question}
                          width="100"
                          height="100"
                          className={"mx-auto w-10 rounded-full"}
                        />} 
                          </td>
                          </tr>)
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

