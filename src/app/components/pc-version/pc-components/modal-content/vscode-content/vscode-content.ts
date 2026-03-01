import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalSevice } from '../../../../../service/modal-service';
import { MarkdownModule } from 'ngx-markdown';
import { Projects } from '../../../../interfaces/vscode-interface';
import { VSCODE_LISTA_PROGETTI } from '../../../../../mocks/vscode.mock';
import { LanguageService } from '../../../../../service/language-service';


@Component({
  selector: 'app-vscode-content',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './vscode-content.html',
  standalone: true,
  styleUrl: './vscode-content.scss'
})
export class VscodeContent {
  language: any;
  /* Variables */
  componentSub!: Subscription;
  fileToOpen!: string;
  rotateListArrow: boolean = false;
  listaProgetti: Projects[] = VSCODE_LISTA_PROGETTI;
  listOpenedProjects: Projects[] = [];
  selectedWindow: string = 'AI Implementation';

  constructor(private modalService: ModalSevice, private langService: LanguageService) { }

  ngOnInit() {
    this.componentSub = this.modalService.componentCvData$
      .subscribe(value => {
        if (!value) return;
        this.fileToOpen = value.file;
      });

    this.langService.language$.subscribe(() => {
      this.language = this.langService.words;
    });


    this.selectedProject(this.listaProgetti[0])
  }

  /* Seleziona progetto e apre finestra */
  selectedProject(project: { nomeProgetto: string, readMe: string, selectedProject: boolean, linkProject: string }) {
    this.listaProgetti.forEach(p => p.selectedProject = false);
    project.selectedProject = true;

    const exists = this.listOpenedProjects.find(p => p.nomeProgetto === project.nomeProgetto);
    if (!exists) {
      this.listOpenedProjects.push(project);
      this.selectedProjectWindow(project);
    } else {
      project.selectedProject = true;
      this.selectedWindow = project.nomeProgetto;
    }
  }

  /* Selezione da finestra */
  selectedProjectWindow(project: { nomeProgetto: string, readMe: string, selectedProject: boolean }) {
    this.selectedWindow = project.nomeProgetto;
    this.listaProgetti.forEach(p => p.selectedProject = false);
    project.selectedProject = true;
  }

  /* Chiude finestra */
  closeWindow(project: { nomeProgetto: string, readMe: string, selectedProject: boolean }) {
    project.selectedProject = false;
    this.listOpenedProjects = this.listOpenedProjects.filter(p => p.nomeProgetto !== project.nomeProgetto);

    if (this.selectedWindow === project.nomeProgetto) {
      this.selectedWindow = this.listOpenedProjects.length
        ? this.listOpenedProjects[this.listOpenedProjects.length - 1].nomeProgetto
        : '';
    }
  }

  ngOnDestroy() {
    this.componentSub.unsubscribe();
  }
}
