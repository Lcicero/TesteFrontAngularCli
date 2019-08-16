import { BaseModel } from "./../model/base-model";

import { Injector } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Icriteria } from '../model/icriteria';

export abstract class ServiceBaseService<T extends BaseModel> {
  protected http: HttpClient;
  protected apiPath: string;

  constructor(
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getAllPredicate(params: HttpParams): Observable<T[]> {
    return this.http.get(this.apiPath, { params }).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    console.log(url);
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(model: T): Observable<T> {
    return this.http.post(this.apiPath, model).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  abstract preDelete(id: number): Observable<any>;
  abstract preCreate(model: T): Observable<T>;
  abstract preUpdate(model: T): Observable<T>;
  abstract preGetById(id: number): Observable<T>;
  abstract preGetAll(): Observable<T[]>;
  abstract preGetCriteria(criteria: Icriteria): Observable<T[]>;

  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any): T[] {
    const resources: T[] = [];

    jsonData.forEach(element =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
