
import { Injectable, ViewChild, Injector } from "@angular/core";
import { ServiceBaseService } from "../../services/service-base.service";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
import { BaseModel } from '../../model/base-model';

export abstract class BaseFormListService<
  T extends BaseModel,
  S extends ServiceBaseService<T>
> {
  protected colunas: string[];
  protected dataSource: MatTableDataSource<T>;
  protected fb: FormBuilder;
  protected dialog: MatDialog;
  protected toastr: ToastrService;
  protected form: FormGroup;
  protected dialogConfig;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    protected service: ServiceBaseService<T>,
    protected injector: Injector
  ) {
    this.fb = injector.get(FormBuilder);
    this.dialog = injector.get(MatDialog);
    this.toastr = injector.get(ToastrService);

    console.log("construtor Base");
  }

  ngOnInit() {
    console.log("Init Base");
    this.getAll();
    this.gerarForm();
  }

  protected gerarForm() {
    
  }

  protected getAll() {
    this.service.preGetAll().subscribe(
      resources => {
        this.dataSource = new MatTableDataSource<T>(resources);
        this.dataSource.paginator = this.paginator;
        console.log(resources);
      },
      error => {
        console.log("Erro ao carregar a lista");
        this.toastr.error("Erro ao carregar a lista!");
      }
    );
  }

  protected update(model: T) {
    this.service.preUpdate(model).subscribe(
      data => {
        this.toastr.success("Solicitação processada com sucesso!");
      },
      error => {
        this.toastr.error("Erro ao realizar a operação!");
      }
    );
  }

  protected removePop(id: number) {
    let dialogRef = this.confirmDialogPop();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remover(id);
      }
    });
  }
  private confirmDialogPop() {
    this.dialogConfig = {
      height: "25%",
      width: "25%",
      disableClose: true,
      data: { title: "Deseja apagar este registro ?" }
    };
    let dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);
    return dialogRef;
  }

  remover(id: number) {
    this.service.preDelete(id).subscribe(
      data => {
        console.log("Removeu certo");
        this.toastr.success("Solicitação processada com sucesso!");
        this.getAll();
      },
      error => {
        this.toastr.error("Erro ao realizar a operação!");
      }
    );
  }
}
