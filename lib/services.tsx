// lib/services.ts
import api from "./axios";

export async function createService(service: {
  title: string;
  description: string;
  price: number;
  emergencyAvailable: boolean;
  equipment: string;
}) {
  const res = await api.post("/services", service);
  return res.data;
}

export async function getMyServices() {
  const res = await api.get("/services/mine");
  return res.data;
}

export async function getAllServices() {
  const res = await api.get("/services");
  return res.data;
}

export async function getServiceById(id: number) {
  const res = await api.get(`/services/${id}`);
  return res.data;
}

export async function updateService(id: number, data: { title?: string; description?: string; price?: number; emergencyAvailable?: boolean; equipment?: string }) {
  const res = await api.put(`/services/${id}`, data);
  return res.data;
}


export async function uploadServiceFiles(serviceId: number, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const res = await api.post(`/services/${serviceId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data as string[]; 
}

export async function getServiceImages(serviceId: number) {
  const res = await api.get(`/services/${serviceId}/images`);
  return res.data as string[];
}


export async function getFilteredServices(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`/services/filtered${query ? '?' + query : ''}`);
  return res.data;
}