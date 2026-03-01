import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalSevice } from '../../../../../service/modal-service';
import { Subscription } from 'rxjs';
import { LINKS } from '../../../../../mocks/contact.mock';
import { Link } from '../../../../interfaces/contact-interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LinkedinPage } from "./internet-pages/linkedin-page/linkedin-page";
import { GithubPage } from "./internet-pages/github-page/github-pages";
import { MediumPages } from "./internet-pages/medium-page/medium-page";

@Component({
  selector: 'app-internet-component',
  imports: [CommonModule, LinkedinPage, GithubPage, MediumPages],
  templateUrl: './internet-component.html',
  styleUrl: './internet-component.scss'
})
export class InternetComponent {
  tabSelected: string = 'Internet';
  componentSub!: Subscription;
  tabList!: string[]
  links: Link[] = LINKS
  linkToLoad!: string

  constructor(private modalService: ModalSevice, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.componentSub = this.modalService.componentInternetData$
      .subscribe(value => {
        if (!value) return;
        this.tabSelected = value?.link!

        this.linkToLoad = value.link
        this.tabList = this.modalService.getListLinks()
      });
  }

  openTab(tabLink: string) {
    const linkExists = this.modalService.getListLinks().includes(tabLink);

    if (!linkExists) {
      this.modalService.sendComponentInternetData({ link: tabLink, appKey: 'internet' })
    }
  }

  addTab() {
    if (this.tabList.length >= 3) return;

    for (let i = 0; i < this.links.length; i++) {
      const value = this.links[i];
      const existingLinks = this.modalService.getListLinks();
      const linkToCheck = value.actualLink;


      if (value.linkType !== 'Portfolio' && !existingLinks.includes(linkToCheck)) {

        this.modalService.sendComponentInternetData({ link: linkToCheck, appKey: 'internet' });
        break;
      }
    }
  }

  switchTab(tabLink: string) {
    this.tabSelected = tabLink;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeTab(tabLink: string) {
    this.tabList = this.tabList.filter(l => l !== tabLink)

    this.modalService.removeLink(tabLink)

    if (tabLink !== this.tabSelected) {
    } else {
      this.tabList[1] ? this.tabSelected = this.tabList[1] :
        this.tabList[0] ? this.tabSelected = this.tabList[0] :
          this.tabSelected = 'Internet'
    }
  }

  ngOnDestroy() {
    this.componentSub.unsubscribe();
    this.modalService.clearInternetState();
  }
}
