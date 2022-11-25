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

interface ApiResponse {
  message: string;
  success: boolean;
}
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
interface Total {
  idDb: number;
  votes: number;
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
  const noVote = (message: string) => toast.error(message)
  const voted = (message: string) => toast.success(message)

  const [actualVotos, setActualVotos] = useState<Votos[]>([])
  const router = useRouter()
  const [user, setUser] = useState('');
  const [tableData, setTableData] = useState<Usuarios[]>();
  const [actualUser, setActualUser] = useState<Usuarios>();
  const [isPermited, setIsPermited] = useState(false);
  const [needReload, setNeedReload] = useState(false);
  const [totalClara, setTotalClara] = useState(0);
  const [totalSelva, setTotalSelva] = useState(0);
  const [totalCasaPetra, setTotalCasaPetra] = useState(0);
  const [totalFuoco, setTotalFuoco] = useState(0);
  const [totalLocavore, setTotalLocavore] = useState(0);
  const [totalCarnal, setTotalCarnal] = useState(0);
  const up = async (idRestaurant: number, name: string) => {
    let preVote = actualUser!;
    const respuesta = await fetch('/api/vote/update', {
      method: 'POST',
      body: JSON.stringify(preVote.data),
      headers: {
        'Content-Type': 'application/json',
        'user': name,
        'restaurante': String(idRestaurant),
        'fn': 'up',
      }
    });
    const tt = respuesta.json()
    tt.then((res: ApiResponse) => {
      if (!res.success) { noVote(res.message); setNeedReload(true) }
      if (res.success) { voted(res.message); setNeedReload(false) }
    }).finally(async () => {
      const res = await fetch(`/api/vote`)
      const data = await res.json()
      setTableData(data)
      checkUser(name, data)
      contar()
    })
    // if (needReload === true) router.reload()


  }
  const down = async (idRestaurant: number, name: string) => {
    let preVote = actualUser!;
    const respuesta = await fetch('/api/vote/update', {
      method: 'POST',
      body: JSON.stringify(preVote.data),
      headers: {
        'Content-Type': 'application/json',
        'user': name,
        'restaurante': String(idRestaurant),
        'fn': 'down',
      }
    });
    const tt = respuesta.json()
    tt.then((res: ApiResponse) => {
      if (!res.success) { noVote(res.message); setNeedReload(true) }
      if (res.success) { voted(res.message); setNeedReload(false) }
    }).finally(async () => {
      const res = await fetch(`/api/vote`)
      const data = await res.json()
      setTableData(data)
      checkUser(name, data)
      contar()
    })
    // if (needReload === true) router.reload()

    // const res = await fetch(`/api/vote`)
    // const data = await res.json()
    // checkUser(name, data)

  }

  const contar = async () => {
    const res = await fetch(`/api/vote/count`)
    const data = await res.json()
    let votos: Total[] = [
      {
        idDb: 1, votes: 0,
      },
      {
        idDb: 2, votes: 0,
      },
      {
        idDb: 3, votes: 0,
      },
      {
        idDb: 4, votes: 0,
      },
      {
        idDb: 5, votes: 0,
      },
      {
        idDb: 6, votes: 0,
      },
    ]
    let total: Total[] = [{
      idDb: 1, votes: 0,
    },
    {
      idDb: 2, votes: 0,
    },
    {
      idDb: 3, votes: 0,
    },
    {
      idDb: 4, votes: 0,
    },
    {
      idDb: 5, votes: 0,
    },
    {
      idDb: 6, votes: 0,
    }];
    data.forEach((item: any) => {
      item.data.forEach((datas: Votos) => {
        votos[datas.idDb - 1].votes = votos[datas.idDb - 1].votes + datas.votes
      })
    })
    total = votos
    total.forEach((item) => {
      if (item.idDb === 1) setTotalClara(item.votes)
      if (item.idDb === 2) setTotalSelva(item.votes)
      if (item.idDb === 3) setTotalCasaPetra(item.votes)
      if (item.idDb === 4) setTotalFuoco(item.votes)
      if (item.idDb === 5) setTotalLocavore(item.votes)
      if (item.idDb === 6) setTotalCarnal(item.votes)
    })
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
      contar()

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
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 relative">
          <div className="relative w-48 mx-auto mb-10">
            <Image
              alt=""
              src={logoCbre}
              className={"mx-auto w-48 rounded-full" && styles.avatar}
            />
          </div>
          <p className="text-xl text-center tracking-tight text-gray-500 mb-5">Bienvenida {user}, por fin ya tenemos restaurante. 🎄</p>
          <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white w-full sm:w-2/3 lg:w-2/3 xl:w-1/2">
                <Image
                  src={steakImg}
                  priority={true}
                  key={String(steakImg)}
                  alt="Steak restaurant"
                  className="rounded-t-lg w-full"
                />
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2 text-center uppercase">Restaurante Carnal</h5>
              </div>
              <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                <p className="mb-3"><span className="font-bold">Dirección:</span> Calle Enric Granados, 52 08008 – Barcelona</p>
                <p className="mb-3"><span className="font-bold">Fecha de la reserva:</span> Viernes, 2 de Diciembre de 2022</p>
                <p className="mb-3"><span className="font-bold">Hora de la reserva:</span> 20:00h</p>
                <p className="mb-3"><span className="font-bold">Ver mapa:</span></p>
                <a
                rel="noreferrer"
                href="https://goo.gl/maps/zWo2WrYuVUYPGoLt8"
                target="_blank"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-5"
              >
                Carnal en Google Maps
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

