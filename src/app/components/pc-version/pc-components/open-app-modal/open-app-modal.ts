import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Type } from '@angular/core';
import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { WindowState } from '../../../interfaces/modal-interface';
import { StartApp } from '../../../interfaces/app-interface';
import { WINDOWS_START_APPS } from '../../../../mocks/windows-app.mock';
import { ModalSevice } from '../../../../service/modal-service';
import { LanguageService } from '../../../../service/language-service';

@Component({
  selector: 'open-app-modal',
  imports: [CdkDrag, CdkDragHandle, CommonModule],
  templateUrl: './open-app-modal.html',
  styleUrl: './open-app-modal.scss'
})
export class OpenAppModal {
  language: any;

  /* Variables */
  @Input() selectedApp: WindowState | undefined
  @Input() appKey: string | undefined
  @Output() app = new EventEmitter<{ appKey?: string; appId?: number }>();
  @Output() saveDragPosition = new EventEmitter<{ appKey?: string; appId?: number; dragPosition?: { x: number, y: number } }>();

  dragPosition!: { x: number, y: number }
  startApps: StartApp[] = WINDOWS_START_APPS

  constructor(private elementRef: ElementRef, private modalService: ModalSevice, private langService: LanguageService) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.selectedApp!.isSelected = false
    }
  }

  ngOnInit() {
    this.langService.language$.subscribe(() => {
      this.language = this.langService.words;
    });

    if (!this.selectedApp?.maximazed) {
      this.dragPosition = this.selectedApp!.lastDragPosition ?? { x: 50, y: 50 };
    }
  }
  
  minimizeWindow() {
    if (!this.selectedApp) return;

    this.selectedApp.isMinimized = true;

    this.selectedApp.lastDragPosition = { ...this.dragPosition };
  }

  /* Ingrandisce la modale 
    salva la grandezza e l ultima posizione della modale
  */
  increaseSizeByMax() {
    if (!this.selectedApp?.maximazed) {
      this.selectedApp!.lastXSize = this.selectedApp!.xSize;
      this.selectedApp!.lastYSize = this.selectedApp!.ySize;

      this.selectedApp!.xSize = '100%';
      this.selectedApp!.ySize = '100%';

      this.selectedApp!.lastDragPosition = this.dragPosition;
      this.dragPosition = { x: 0, y: 0 };
      this.selectedApp!.maximazed = true

    } else {
      this.selectedApp!.xSize = this.selectedApp!.lastXSize
      this.selectedApp!.ySize = this.selectedApp!.lastYSize

      this.dragPosition = this.selectedApp!.lastDragPosition
      this.selectedApp!.maximazed = false
    }

  }
  /* Recupera posizione */
  onDragEnded(event: CdkDragEnd) {
    if (!this.selectedApp) return;

    this.dragPosition = { ...event.source.getFreeDragPosition() };
    this.selectedApp.dragPosition = this.dragPosition;

    this.saveDragPosition.emit({
      appKey: this.appKey,
      appId: this.selectedApp.id,
      dragPosition: this.dragPosition
    });
  }

  /* Chiude modale */
  closeModal() {
    /* Chiusra per start */
    const file = this.startApps.find(
      app => app.fileType === this.selectedApp!.appInfo.name
    );

    if (file) {
      file.open = false;
      file.fileType === 'file_explorer' ? this.modalService.updateIsExplorerOpen(false) : null
    }

    if (this.modalService.getIsInternetOpen()) {
      this.modalService.updateIsInternetOpen(false)
      this.modalService.removeLink([])
    }

    this.app.emit({ appKey: this.appKey, appId: this.selectedApp?.id })
  }
}
