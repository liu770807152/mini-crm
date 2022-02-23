import {Injectable} from '@angular/core';
import axios, {AxiosPromise} from 'axios';
import User from "../types/user";
import SearchParams from "../types/search";


const baseURL = 'http://localhost:4200/api';
const withCredentials = false;
const timeout = 10000;

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  axiosInstance = axios.create({
    baseURL,
    withCredentials,
    timeout,
  });
  request(options: object): AxiosPromise{
    return this.axiosInstance(options)
      .then((response: { data: User | User[] }) => response.data)
      .catch((error: any) => error);
  }

  async getAllUsers(): Promise<AxiosPromise> {
    return this.request({
      method: 'GET',
      url: baseURL
    });
  }

  async getUserById(id: number): Promise<AxiosPromise> {
    return this.request({
      method: 'GET',
      url: baseURL,
      params: {id}
    });
  }

  async getUsersBySearchParams(searchParam: SearchParams): Promise<AxiosPromise> {
    return this.request({
      method: 'GET',
      url: baseURL,
      params: searchParam
    });
  }

  async addNewUser(data: User): Promise<AxiosPromise> {
    return this.request({
      method: 'POST',
      url: baseURL,
      headers: {
        'X-REST-Method': 'POST',
      },
      data: data
    });
  }

  async updateUser(data: any, id: number): Promise<AxiosPromise> {
    console.log(data)
    return this.request({
      method: 'POST',
      url: baseURL,
      headers: {
        'X-REST-Method': 'PUT',
      },
      data: {
        ...data,
        id: id
      }
    });
  }

  async deleteOneUser(id: number): Promise<AxiosPromise> {
    return this.request({
      method: 'POST',
      url: baseURL,
      headers: {
        'X-REST-Method': 'DELETE',
      },
      data: {id: id}
    });
  }
}
