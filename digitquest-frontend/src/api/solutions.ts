import { api } from "@/api/index.ts";

// return api.post('/api/v1/test/solution/test', {
//     method: 'PATCH',
//     data: JSON.stringify({ currentPassword, password, confirmPassword }),
//   });
export async function test(): Promise<void> {
  
  return api.get('/solutions/test');
}

export async function generateAllSolutions(): Promise<void> {

  let data = {
    "solverStrict": 1
  }
  let response = await api.post('/solutions/generate', data);
  
  return response.data;
}


export async function getFirstSolution(idSolution: number): Promise<void> {
  let response = await api.get('/solutions/solution/'+ idSolution);
  
  return response.data;
}

export async function getAllSolutions(): Promise<void> {
  let response = await api.get('/solutions/');
  
  return response.data;
}

