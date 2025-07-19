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


export async function getFirstSolution(idSolution: number): Promise<Solution> {
  let response = await api.get('/solutions/solution/'+ idSolution);
  
  return response.data;
}

export async function getAllSolutions(): Promise<void> {
  let response = await api.get('/solutions/');
  
  return response.data;
}

export async function checkSolution(solution: string): Promise<void> {
  let data = {
    "positions": solution
  }
  let response = await api.post('solutions/solution/check', data);
  
  return response.data;
}

export async function getSolutionByPosition(index: number, value: number): Promise<void> {
  let data = {
    "index": index, 
    "value": value
  }
  let response = await api.post('/solutions/solution/find', data);
  return response.data;
}

export async function deleteAllSolutions(): Promise<void> {
  let response = await api.delete('/solutions/deleteAll');
  
  return response.data;
}

interface Solution {
  gridJson: any;
}

async function getSolutionById(idSolution: string): Promise<Solution> {
  let response = await api.get('/solutions/solution/' + idSolution);
  return response.data;
}


export async function deleteSolution(idSolution: string): Promise<void> {
  let response = await api.delete('/solutions/solution/' + idSolution);
  
  return response.data;
}

export async function modifySolution(idSolution: string, solution: string): Promise<void> {
  let originalSolution = await getSolutionById(idSolution);
  let data = {
    "positions": solution,
    "gridJson": originalSolution.gridJson,
    "isValid": false,
    "calculationTimeMs": 0
  }

  let response = await api.patch('/solutions/solution/update/' + idSolution, data);
  
  // return response.data;
}


