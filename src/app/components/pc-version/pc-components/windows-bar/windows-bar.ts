import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalSevice } from '../../../../service/modal-service';
import { LanguageService } from '../../../../service/language-service';

@Component({
  selector: 'app-windows-bar',
  imports: [CommonModule],
  templateUrl: './windows-bar.html',
  styleUrl: './windows-bar.scss'
})
export class WindowsBar {
  @Input() windowsApps: any;
  @Input() newApps: any[] = []
  @Input() showStartMenu!: boolean;
  @Output() windowSelected = new EventEmitter<string>();
  @Output() showStartMenuChange = new EventEmitter<boolean>();
  currentHour: Date = new Date()
  interval!: any;
  shrinkRightCorner!: number;
  linkApps: { linkName: string, linkImg: string, link: string }[] = [
    { linkName: 'linkedin', linkImg: 'assets/icons/linkedin.svg', link: 'https://www.linkedin.com/in/alessio-fischetti-a085ab20a/' },
    { linkName: 'GitHub', linkImg: 'assets/icons/github.svg', link: 'https://github.com/Alessio-Fischetti' },
    { linkName: 'Medium', linkImg: 'assets/icons/medium.svg', link: 'https://medium.com/@afischetti.work' },
  ];
  showHiddenLinks: boolean = false;
  showLanguage: boolean = false;
  languageSelected: string = 'ITA';
  otherLanguage: string = 'ENG';

  /* Update link visibili o meno */
  get visibleLinks() {
    if (this.shrinkRightCorner < 800) {
      return this.linkApps.slice(0, 2);
    }
    return this.linkApps;
  }
  modalSub!: Subscription;

  constructor(private modalService: ModalSevice, private langService: LanguageService) { }

  get hiddenLinks() {
    if (this.shrinkRightCorner < 800) {
      return this.linkApps.slice(2);
    }
    return [];
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.currentHour = new Date();
    }, 1000);

    this.modalSub = this.modalService.modalData$.subscribe(value => {
      this.openInternalModal(value)
    });

    this.onResize();
  }

  /* Recupera la grandezza della pagina */
  @HostListener('window:resize')
  onResize() {
    this.shrinkRightCorner = window.innerWidth;
  }

  /* Seleziona la finestra */
  selectWindow(appKey: string, link?: string) {
    const app = this.windowsApps[appKey];
    if (!app) return;

    if (app.appInfo.name === 'file_explorer') {
      this.modalService.updateIsExplorerOpen(true)
    }

    /* Verifica se si vuole aprire i link*/
    if (!link) {
      this.windowSelected.emit(appKey);
      return;
    }
    /* Se internet non aperto crea la finestra */
    if (!this.modalService.getIsInternetOpen()) {

      this.modalService.sendComponentInternetData({ link: link, appKey: 'internet' });
      return;
    }
    /* Altrimenti aggiunge solo links tranne quello gia presente */
    const linkExists = this.modalService.getListLinks().includes(link);

    if (!linkExists) {
      this.modalService.sendComponentInternetData({ link: link, appKey: 'internet' })
    }
  }

  /* Nasconde links */
  toggleHiddenLinks() {
    this.showHiddenLinks = !this.showHiddenLinks;
  }

  /* Apertura file interni */
  openInternalModal(value: any) {
    const exists = this.newApps.some(app => app.appInfo.name === value.appInfo.name);

    if (!exists) {
      this.selectWindow(value.appInfo.name)
    }
  }

  /* mostra lingue */
  showLanguageOpt() {
    this.showLanguage = !this.showLanguage
  }

  /* Seleziona lingue */
  selectLanguage() {
    if (this.languageSelected === 'ITA') {
      this.languageSelected = 'ENG'
      this.otherLanguage = 'ITA'

      this.langService.setLanguage('ENG');

    } else {
      this.languageSelected = 'ITA'
      this.otherLanguage = 'ENG'

      this.langService.setLanguage('ITA');

    }
  }

  /* Apre start */
  openStart(event: MouseEvent) {
    event.stopPropagation();
    this.showStartMenu = !this.showStartMenu;
    this.showStartMenuChange.emit(this.showStartMenu)
  }


  ngOnDestroy() {
    clearInterval(this.interval);
    this.modalSub.unsubscribe();
  }
}
