import { http } from './user';  // 重用 Axios 实例

export function getAnimals(page = 1, pageSize = 10) {
  return http.get('/animals', { params: { page, pageSize } });
}

export function getAnimalDetail(animalId) {
  return http.get(`/animals/${animalId}`);
}

export function createAnimal(data) {
  return http.post('/admin/animals', data);
}

export function updateAnimal(animalId, data) {
  return http.put(`/admin/animals/${animalId}`, data);
}

export function deleteAnimal(animalId) {
  return http.delete(`/admin/animals/${animalId}`);
}
