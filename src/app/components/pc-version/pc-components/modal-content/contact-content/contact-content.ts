import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contact, Link } from '../../../../interfaces/contact-interface';
import { CONTACTS, LINKS } from '../../../../../mocks/contact.mock';
import { LanguageService } from '../../../../../service/language-service';
import { ModalSevice } from '../../../../../service/modal-service';

@Component({
  selector: 'app-contact-content',
  imports: [CommonModule],
  templateUrl: './contact-content.html',
  styleUrl: './contact-content.scss'
})
export class ContactContent {
  language: any;
  /* Variables */
  contacts: Contact[] = CONTACTS
  links: Link[] = LINKS

  constructor(private langService: LanguageService, private modalService: ModalSevice) { }

  ngOnInit() {
    this.langService.language$.subscribe(() => {
      this.language = this.langService.words;
    });
  }

  openWebSite(link: string) {

    if (link.includes('Software-Developer-Portfolio')) {
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

  /* Copia il valore */
  copy(value: string) {
    if (value === '+39 380 194 9521') {
      const cleanNumber = value.replace(/\s+/g, '');
      navigator.clipboard.writeText(cleanNumber);
    } else {
      navigator.clipboard.writeText(value)
    }
  }
}
