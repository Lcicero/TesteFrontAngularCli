import { Component, OnInit, Injector } from "@angular/core";
import { Livro } from "../shared/livro";
import { LivroService } from "../shared/service/livro.service";
import { FormBase } from "src/app/shared/components/form-base/form-base.service";
import { Validators } from "@angular/forms";


@Component({
  selector: "app-livro-form",
  templateUrl: "./livro-form.component.html",
  styleUrls: ["./livro-form.component.css"]
})
export class LivroFormComponent extends FormBase<Livro, LivroService>
  implements OnInit {
  constructor(
    private serviceLivro: LivroService,
    protected injector: Injector
  ) {
    super(serviceLivro, injector);
  }

  gerarForm() {
  

    this.form = this.fb.group({
      id: [, []],
      titulo: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      dataPublicacao: [new Date() , ] ,
      descricao: ["", [Validators.required]],
      editora: ["", [Validators.required]],
      linkURL: ["",],
      capaURL: ["", [Validators.required]],
      pagina: ["", [Validators.required]],
    });
  }
}

