import { api } from "@/api/index.ts";

// return api.post('/api/v1/test/solution/test', {
//     method: 'PATCH',
//     data: JSON.stringify({ currentPassword, password, confirmPassword }),
//   });
export async function test(): Promise<void> {
  
  return api.get('/solutions/test');
}