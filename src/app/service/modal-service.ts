import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WindowsApps, WindowState } from '../components/interfaces/modal-interface';
import { WINDOWS_APPS_MOCK } from '../mocks/windows-app.mock';
import { AppItem, StartApp } from '../components/interfaces/app-interface';

@Injectable({ providedIn: 'root' })
export class ModalSevice {
    /* Sub per passare il componente della modale */
    private modalComponent = new Subject<WindowState>();
    modalData$ = this.modalComponent.asObservable();
    private windowsApps: WindowsApps = WINDOWS_APPS_MOCK;

    sendModalData(value: AppItem | StartApp) {
        const app = this.windowsApps[value.fileType];
        if (app) {
            this.modalComponent.next(app);
        }
    }

    /* Sub per passare i file aprire nel componente della modale */
    /* Cv */
    private componentCvDetails = new BehaviorSubject<{ name: string; file: string, maximized?: boolean } | null>(null);
    componentCvData$ = this.componentCvDetails.asObservable();
    /* About Me */
    private componentAboutMeDetails = new BehaviorSubject<{ name: string; file: string, maximized?: boolean } | null>(null);
    componentAboutMeData$ = this.componentAboutMeDetails.asObservable();
    /* Image */
    private componentImageDetails = new BehaviorSubject<{ name: string; file: string, maximized?: boolean } | null>(null);
    componentImageData$ = this.componentImageDetails.asObservable();

    /* Cv */
    sendComponentCvData(value: AppItem | StartApp) {
        const app = { name: this.windowsApps[value.fileType].appInfo.name, file: this.windowsApps[value.fileType].appInfo.file, maximized: this.windowsApps[value.fileType].maximazed };

        if (app) {
            this.componentCvDetails.next(app);
        }
    }

    /* About Me */
    sendComponentAboutMeData(value: AppItem | StartApp) {
        const app = { name: this.windowsApps[value.fileType].appInfo.name, file: this.windowsApps[value.fileType].appInfo.file, maximized: this.windowsApps[value.fileType].maximazed };

        if (app) {
            this.componentAboutMeDetails.next(app);
        }
    }

    /* Image */
    sendComponentImage(value: AppItem | StartApp) {
        const app = { name: this.windowsApps[value.fileType].appInfo.name, file: this.windowsApps[value.fileType].appInfo.file, maximized: this.windowsApps[value.fileType].maximazed };

        if (app) {
            this.componentImageDetails.next(app);
        }
    }

    /* File Explorer custom */
    private componentFileExp = new BehaviorSubject<{ optName: string, appKey: string } | null>(null);
    componentFileExpData$ = this.componentFileExp.asObservable();
    private isExplorerOpen = false;

    sendComponentFileExpData(value: { optName: string, appKey: string }) {
        if (value) {
            this.componentFileExp.next(value);
            this.isExplorerOpen = true
        }
    }

    checkIsExplorerOpen() {
        return this.isExplorerOpen;
    }

    updateIsExplorerOpen(opt: boolean) {
        this.isExplorerOpen = opt;
    }

    /* Internet */

    private componentInternet = new BehaviorSubject<{ link: string, appKey: string } | null>(null);
    componentInternetData$ = this.componentInternet.asObservable();
    private isInternetOpen = false;
    private listLinks: string[] = []

    sendComponentInternetData(value: { link: string, appKey: string }) {
        if (value) {
            this.updateListLinks(value.link)
            this.componentInternet.next(value);
            this.isInternetOpen = true
        }
    }

    getListLinks() {
        return this.listLinks;
    }

    updateListLinks(link: string) {
        this.listLinks.push(link)
    }

    removeLink(link: string | string[]) {
        if (typeof link === 'string') {
            this.listLinks = this.listLinks.filter(l => l !== link)
        } else {
            this.listLinks = link
        }
    }

    getIsInternetOpen() {
        return this.isInternetOpen;
    }

    updateIsInternetOpen(opt: boolean) {
        this.isInternetOpen = opt;
    }

    clearInternetState() {
        this.componentInternet.next(null);
    }
}