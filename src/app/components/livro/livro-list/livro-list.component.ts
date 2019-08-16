import { Livro } from "./../shared/livro";
import { Component, OnInit, Injector } from "@angular/core";
import { LivroService } from "../shared/service/livro.service";
import { BaseFormListService } from "src/app/shared/components/form-base-list/base-form-list.service";
import { LivroCriteria } from "../shared/livro-criteria";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-livro-list",
  templateUrl: "./livro-list.component.html",
  styleUrls: ["./livro-list.component.css"]
})
export class LivroListComponent extends BaseFormListService<Livro, LivroService>
  implements OnInit {
  colunas = ["id", "Titulo", "Autor", "dataPublicacao",  "Ação"];
  statusSelect: string[];
  Livros: Livro[];

  constructor(
    private livroService: LivroService,
    protected injector: Injector
  ) {
    super(livroService, injector);
  }

  gerarForm() {
    this.form = this.fb.group({
      titulo: ["", []],
      autor: ["", []]
    });

    this.livroService.preGetAll().subscribe(
      data => {
        this.Livros = data;
      },
      error => {
        console.log("Erro ao carregar a lista", error);
      }
    );
  }

  searchByPredicate() {
    console.log(
      this.form.get("titulo").value,
      this.form.get("autor").value
    );

    const criteria: LivroCriteria = {
      titulo: this.form.get("titulo").value,
      autor: this.form.get("autor").value
    };
    console.log(criteria);

    this.livroService.preGetCriteria(criteria).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Livro>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log("Erro ao carregar a lista", error);
      }
    );
  }
}
