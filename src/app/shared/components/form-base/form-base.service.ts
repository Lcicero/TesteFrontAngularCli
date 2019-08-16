import { OnInit, Injector } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BaseModel } from "../../model/base-model";
import { ServiceBaseService } from "../../services/service-base.service";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

export class FormBase<T extends BaseModel, S extends ServiceBaseService<T>>
  implements OnInit {
  protected form: FormGroup;
  currentAction: string;
  protected fb: FormBuilder;
  protected dialog: MatDialog;
  protected toastr: ToastrService;
  protected dialogConfig;
  protected route: ActivatedRoute;
  protected router: Router;
  protected title: string;
 
  constructor(
    protected service: ServiceBaseService<T>,
    protected injector: Injector
  ) {
    this.fb = injector.get(FormBuilder);
    this.dialog = injector.get(MatDialog);
    this.toastr = injector.get(ToastrService);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);

    console.log("construtor form Base");
  }

  ngOnInit() {
    this.gerarForm();
    this.setCurrentAction();
    this.loadResource();
  }

  public onCancel = () => {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    this.router.navigateByUrl(baseComponentPath);
  };

  gerarForm() {}

  save() {
    if (this.currentAction == "new") this.create();
    else this.update();
  }

  private create() {
    this.service.preCreate(this.form.value).subscribe(
      data => {
        this.actionsForSuccess(data);
      },
      error => {
        this.showMessageError(error);
      }
    );
  }

  private update() {
    this.service.preUpdate(this.form.value).subscribe(
      data => {
        this.actionsForSuccess(data);
      },
      error => {
        this.showMessageError(error);
      }
    );
  }

  private showMessageError(error: any) {
    let msg: string = "Tente novamente em instantes.";
    if (error.status == 400) {
      msg = error.error.errors.join(' ');
    }
    this.toastr.error(msg);
    console.log(msg);
  }

  protected actionsForSuccess(model: T) {
    this.toastr.success("Solicitação processada com sucesso!");

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, "edit" , model.id])
    )
  }

  private loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap
        .pipe(switchMap(params => this.service.preGetById(+params.get("id"))))
        .subscribe(
          resource => {
            console.log(resource);
            this.form.patchValue(resource);
          },
          error => {
            alert("Ocorreu um erro no servidor, tente mais tarde.");
            console.log("Erro ao carregar o id", error);
          }
        );
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
      this.title = "Novo Registro";
    } else if (this.route.snapshot.url[0].path == "edit"){
      this.currentAction = "edit";
      this.title = "Alterando Registro";
    }
  }
}
