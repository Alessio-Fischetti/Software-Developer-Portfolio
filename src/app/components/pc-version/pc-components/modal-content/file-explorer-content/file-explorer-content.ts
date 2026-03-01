import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WINDOWS_APP_VIEWS, WINDOWS_APPS_CONTENT } from '../../../../../mocks/windows-app.mock';
import { ModalSevice } from '../../../../../service/modal-service';
import { AppViews, Folder, AppItem } from '../../../../interfaces/app-interface';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../../../service/language-service';


@Component({
  selector: 'app-file-explorer-content',
  imports: [CommonModule],
  templateUrl: './file-explorer-content.html',
  styleUrl: './file-explorer-content.scss'
})
export class FileExplorerContent {
  language: any;
  /* Variables */
  folderSelected!: string
  listOfPossibleViews: AppViews[] = WINDOWS_APP_VIEWS;
  showSizeOpt: boolean = false;
  showArrow: boolean = false;
  rotateListArrow: boolean = false;
  listApps: Folder[] = WINDOWS_APPS_CONTENT;
  fileSelected: string | undefined;
  componentSub!: Subscription;

  constructor(private modalService: ModalSevice, private langService: LanguageService) { }

  ngOnInit() {
    this.componentSub = this.modalService.componentFileExpData$
      .subscribe(value => {
        if (!value) return;
                
        this.selectFolder(undefined, value)
      });

    this.langService.language$.subscribe(() => {
      this.language = this.langService.words;
    });

    if (this.folderSelected === undefined) {
      this.folderSelected = 'Desktop'
    }

    if (sessionStorage.getItem('explorerViewSelected')) {
      this.selectView(sessionStorage.getItem('explorerViewSelected')!)
    }
  }

  /* Seleziona la vıew */
  selectView(viewSelected: string) {
    this.listOfPossibleViews.forEach(v => {

      if (viewSelected === v.optName) {
        v.isOptSeleted = true

        sessionStorage.setItem('explorerViewSelected', viewSelected)
      } else {
        v.isOptSeleted = false;
      }
    })
  }

  /* Recupera la view selezionata */
  contentSelected(fileRequested: AppItem) {

    const folder = this.listApps.find(f =>
      f.folderContent.some(file =>
        file.appName === fileRequested.appName && file.referenceFolder === fileRequested.referenceFolder
      )
    );

    if (folder) {
      const file = folder.folderContent.find(f =>
        f.appName === fileRequested.appName && f.referenceFolder === fileRequested.referenceFolder
      );

      if (file) {
        this.fileSelected = file.appName;
        this.modalService.sendModalData(file);
        file.fileType == 'cv' ? this.modalService.sendComponentCvData(file) : this.modalService.sendComponentAboutMeData(file)
      }
    }
  }

  /* Seleziona la folder */
  selectFolder(selectedFolder?: Folder, openByOutside?: { optName: string, appKey: string }) {    
    if (selectedFolder) {
      this.listApps.forEach(folder => folder.isFolderSelected = folder === selectedFolder);
      this.folderSelected = selectedFolder.folderName;

    } else if (openByOutside) {
      this.listApps.forEach(folder => folder.isFolderSelected = folder.folderName === openByOutside.optName);
      this.folderSelected = openByOutside.optName
    }

  }
}
