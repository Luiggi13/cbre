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
  const tt =await supabase.from('usuarioscbre').select();

  // const resultado: DataRest[] = data!;
  res.status(200).json(tt.data)
  
}

