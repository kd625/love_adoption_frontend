import { http } from './user';  

export function applyAdoption(animalId, message = '') {
  return http.post('/adoptions', { animalId, message });
}

export function getMyApplications() {
  return http.get('/user/adoptions');
}

export function getAllApplications() {
  return http.get('/admin/adoptions');
}

export function reviewApplication(applicationId, status) {
  return http.put(`/admin/adoptions/${applicationId}`, { status });
}
