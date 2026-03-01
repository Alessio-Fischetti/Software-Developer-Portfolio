import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { WINDOWS_START_APPS } from '../../../../../mocks/windows-app.mock';
import { StartApp } from '../../../../interfaces/app-interface';
import { ModalSevice } from '../../../../../service/modal-service';
import { LanguageService } from '../../../../../service/language-service';

@Component({
  selector: 'start-content',
  imports: [CommonModule],
  templateUrl: './start-content.html',
  styleUrl: './start-content.scss'
})
export class StartContent {
  @Output() isStartOpen = new EventEmitter<boolean>();
  language: any;
  appList: StartApp[] = WINDOWS_START_APPS;
  fileSelected: string | undefined;
  explorerOpt: { optName: string, appKey: string }[] = [
    { optName: 'Documenti', appKey: 'file_explorer' },
    { optName: 'Download', appKey: 'file_explorer' },
    { optName: 'Immagini', appKey: 'file_explorer' },
    { optName: 'Contatti', appKey: 'file_explorer' },
  ]
  otherOt: { optName: string }[] = [
    { optName: 'Pannello di controllo' },
    { optName: 'Programmi predefiniti' },
    { optName: 'Aiuto e supporto' },
  ]

  constructor(private modalService: ModalSevice, private langService: LanguageService) { }

  ngOnInit() {
    this.langService.language$.subscribe(() => {
      this.language = this.langService.words;
    });
  }

  /* Recupera la view selezionata */
  contentSelected(app: StartApp) {

    if (app.open) return;
    this.fileSelected = app.appName;
    app.open = true;
    this.modalService.sendModalData(app);

    switch (app.fileType) {
      case 'cv':
        this.modalService.sendComponentCvData(app);
        break;
      case 'about_me':
        this.modalService.sendComponentAboutMeData(app);
        break;
      case 'images':
        this.modalService.sendComponentImage(app)
        break;
      case 'internet':
        this.modalService.updateIsInternetOpen(true)
        break;
    }

    this.isStartOpen.emit(false)
  }

  /* Apre fileExp con appropriata view */
  openExplorer(opt: { optName: string, appKey: string, cambiaScheda?: boolean }) {
    let isOpen = this.modalService.checkIsExplorerOpen();

    if (!isOpen) {
      this.modalService.sendComponentFileExpData(opt);
    } else {
      opt.cambiaScheda = true;
      this.modalService.sendComponentFileExpData(opt);
    }
    this.isStartOpen.emit(false)
  }

}

