import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WindowsBar } from './pc-components/windows-bar/windows-bar';
import { CommonModule } from '@angular/common';
import { OpenAppModal } from "./pc-components/open-app-modal/open-app-modal";
import { WindowsApps, WindowState } from '../interfaces/modal-interface';
import { WINDOWS_APPS_CONTENT, WINDOWS_APPS_MOCK } from '../../mocks/windows-app.mock';
import { AppItem, Folder } from '../interfaces/app-interface';
import { ModalSevice } from '../../service/modal-service';
import { Subscription } from 'rxjs';
import { StartContent } from "./pc-components/windows-bar/start-content/start-content";

@Component({
  selector: 'app-pc-version',
  imports: [CommonModule, WindowsBar, OpenAppModal, StartContent],
  templateUrl: './pc-version.html',
  styleUrl: './pc-version.scss'
})
export class PcVersion {
  /* Variables */
  windowsApps: WindowsApps = WINDOWS_APPS_MOCK;
  openedWindows: { appName: string, appId: number }[] = [
    { appName: 'cmd', appId: 1 }
  ];
  showStartMenu: boolean = false;
  highestZIndex = 1
  listApps: Folder[] = WINDOWS_APPS_CONTENT;
  fileSelected: string | undefined;
  newApps: any[] = [];
  fileExpSub!: Subscription;
  internetSub!: Subscription;

  constructor(private modalService: ModalSevice) { }

  @ViewChild('startMenu') startMenu!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    if (!this.showStartMenu) return;

    if (!this.startMenu?.nativeElement.contains(event.target)) {
      this.manageStartMenu(false)
    }
  }

  ngOnInit() {
    this.fileExpSub = this.modalService.componentFileExpData$
      .subscribe(value => {
        if (!value) return;
        if (this.modalService.checkIsExplorerOpen()) return;
        this.selectWindow(value.appKey)
      });
    this.internetSub = this.modalService.componentInternetData$.subscribe(
      value => {
        if (!value) return;
        if (this.modalService.getIsInternetOpen()) return;
        this.selectWindow(value.appKey)
      }
    )
  }

  /* Recupera la view selezionata */
  contentSelected(fileRequested: string) {
    this.listApps.forEach(app => {

      const file = app.folderContent.find(
        file => file.appName === fileRequested
      );

      if (file) {
        this.fileSelected = file.appName;
      }
    });
  }

  /* Apre la modale dal desktop */
  openWindowFromDesktop(windowToOpen: AppItem) {

    const folder = this.listApps.find(f =>
      f.folderContent.some(file =>
        file.appName === windowToOpen.appName && file.referenceFolder === windowToOpen.referenceFolder
      )
    );

    if (folder) {
      const file = folder.folderContent.find(f =>
        f.appName === windowToOpen.appName && f.referenceFolder === windowToOpen.referenceFolder
      );

      if (file) {
        this.fileSelected = file.appName;
        this.modalService.sendModalData(file);
        file.fileType == 'cv' ? this.modalService.sendComponentCvData(file) :
          file.fileType == 'about_me' ? this.modalService.sendComponentAboutMeData(file) :
            this.modalService.sendComponentImage(file)
      }
    }
  }

  /* Gestione finestra aperta */
  selectWindow(appKey: string) {

    const app = this.windowsApps[appKey];

    if (app) {

      /* Se aperta → minimizza */
      if (app.id != 0 && !app.isMinimized) {
        app.isOpen = false;
        app.isSelected = false;
        app.isMinimized = true;

        this.minimizeSelectedWindow(app, appKey);

        /* Se minimizzata → riapri */
      } else if (app.id !== 0 && app.isMinimized) {
        app.isOpen = true;
        app.isSelected = true;
        app.isMinimized = false;
        this.openMinimizzedWindow(app, appKey);

        /* Se non esiste → creane una nuova */
      } else if (app.id === 0 && !app.isMinimized) {
        app.isOpen = true;
        app.isSelected = true;
        app.onBackground = true;
        app.isMinimized = false;

        app.id = 1;
        /* Controllo per evitare di aprire doppioni di oggetti statici */
        if (app.appInfo.name != 'file_explorer' && app.appInfo.name != 'cmd') {
          this.newApps.push(app)
        }
        this.openSelectedWindow(appKey, app);
      }

    }
  }

  /* Salva la posizione della modale */
  saveDragHandle(event: { appKey?: string; appId?: number; dragPosition?: { x: number, y: number } }) {
    const app = this.windowsApps[event.appKey!];
    if (!app || app.id !== event.appId) return;

    if (event.dragPosition) {
      app.dragPosition = { ...event.dragPosition };
    }
  }

  /* Gestione apertura */
  openSelectedWindow(appKey: string, app?: WindowState) {
    this.openedWindows.push({
      appName: appKey,
      appId: app!.id!
    });
    this.bringToFront(appKey)
  }

  /* Gestione minimizzazione */
  minimizeSelectedWindow(app: WindowState, appKey: string) {

    if (!app.maximazed) {
      app.lastDragPosition = app.dragPosition
    }
    this.openedWindows = this.openedWindows.filter(
      win => !(win.appName === appKey && win.appId === app.id)
    );
  }

  /* Apre dal minimizzato */
  openMinimizzedWindow(app: WindowState, appKey: string) {
    const exists = this.openedWindows.some(
      win => win.appName === appKey && win.appId === app.id
    );

    if (!exists) {
      this.openedWindows.push({ appName: appKey, appId: app.id! });
    }

    this.bringToFront(appKey);
  }

  /* Modifica index e aggiusta la windows bar per la selezione app aperta  */
  bringToFront(appKey: string) {
    const app = this.windowsApps[appKey];
    if (!app) return;

    this.highestZIndex++;
    app.zIndex = this.highestZIndex;
    app.isSelected = true;
  }

  /* Gestisce apertura e chiusura start menu */
  manageStartMenu(status: boolean) {
    this.showStartMenu = status
  }

  /* Gestione chiusura */
  closeModal(appValue: {
    appKey?: string | undefined;
    appId?: number | undefined;
  }) {
    const app = this.windowsApps[appValue.appKey!];
    if (!app) return;

    app.id = 0;
    app.isOpen = false;
    app.isSelected = false;
    app.isMinimized = false;
    app.onBackground = false;
    this.newApps = this.newApps.filter(
      newApp => (newApp.appInfo.name !== app.appInfo.name)
    );

    this.openedWindows = this.openedWindows.filter(
      win => !(win.appName === appValue.appKey && win.appId === appValue.appId)
    );
  }

}
