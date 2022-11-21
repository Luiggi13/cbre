// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://utlbqbzipryqmkcinunf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bGJxYnppcHJ5cW1rY2ludW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4MDExOTUsImV4cCI6MTk4NDM3NzE5NX0.IdKGj1RXUA3IA4IghdDSIs_qD7xLuAlC6ByX4OezP00');
type DataRest = {
  username: string
  votes: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    const rest:number = +req.headers['restaurante']!
    if(req.body[rest-1].voted === true) res.status(200).json({message: 'No puedes volver a votar al mismo restaurante 2 veces', success: false})
    else {
      const objToSend = req.body;
      if(req.headers['fn'] === 'up') {
        objToSend[rest-1].voted = true;
        objToSend[rest-1].votes++;
      }
      if(req.headers['fn'] === 'down') {
        objToSend[rest-1].voted = true;
        objToSend[rest-1].votes--;
      }
      await supabase
      .from('usuarioscbre')
      .update({data:objToSend})
      .eq('username', req.headers['user'])
      .select()
      res.status(200).json({message: 'Votado', success: true})
    }
} else {
    res.status(403).json({message: "Method not Allowed"})
  }


  
}

