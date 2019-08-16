import { BaseModel } from 'src/app/shared/model/base-model';

export class Livro extends BaseModel {
   
    constructor(
        public id?:number,
        public Titulo?: string,
        public Genero?: string,
        public DataPublicacao?: Date,
        public Pagina?: string,
        public Autor?: string,
        public Editora?: string,
        public Descricao?: string,
        public CapaURL?: string,
        public LinkURL?: string
      ){
        super();
      }

    static fromJson(jsonData: any): Livro {
        return Object.assign(new Livro(), jsonData );
      }

}


//○ Título - obrigatório
//○ Gêneros - obrigatório
//○ Data de publicação - obrigatório
//○ Páginas - obrigatório
//○ Autor - obrigatório
//○ Editora - obrigatório
//○ Descrição - obrigatório
//○ Sinopse - obrigatório
//○ Capa(imagem) - obrigatório
//○ Links de compra(Submarino, Saraiva, etc) - opcional