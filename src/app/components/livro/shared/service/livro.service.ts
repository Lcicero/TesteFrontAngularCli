import { LivroCriteria } from './../livro-criteria';
import { Injectable, Injector } from '@angular/core';
import { Livro } from '../livro';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpParams } from "@angular/common/http";
import { ServiceBaseService } from 'src/app/shared/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends ServiceBaseService<Livro> {
 
  constructor(protected injector: Injector) {
    super(injector, Livro.fromJson);
  }

  preCreate(model: Livro): Observable<Livro> {
    this.apiPath = `${environment.baseUrl}create`;
    return super.create(model);
  }

  preDelete(id: number): Observable<any> {
    this.apiPath = `${environment.baseUrl}remover`;
    return super.delete(id);
  }
  preUpdate(model: Livro): Observable<Livro> {

    console.log(model);
    
    this.apiPath = `${environment.baseUrl}update`;
    return super.update(model);
  }
  
  preGetById(id : number): Observable<Livro> {
    this.apiPath = `${environment.baseUrl}getById`;
    return super.getById(id);
  }
  preGetAll(): Observable<Livro[]> {
    this.apiPath = `${environment.baseUrl}getall`;
    console.log(this.apiPath);
    return super.getAll();
  }

  preGetCriteria(model: LivroCriteria): Observable<Livro[]> {
      return this.getLivrosPredicate(model.titulo , model.autor);
  }
 
  getLivros(): Observable<Livro[]> {
    this.apiPath = `${environment.baseUrl}getall`;
    console.log(this.apiPath);
    return super.getAll();
  }

  getLivrosPredicate(
    titulo?: string,
    autor?: string
  ): Observable<Livro[]> {
    this.apiPath = `${environment.baseUrl}getByCriteria`;

    const params = new HttpParams()
      .set("titulo", titulo)
      .set("autor", autor);

    console.log(this.apiPath, params);

    return super.getAllPredicate(params);
  }

}
