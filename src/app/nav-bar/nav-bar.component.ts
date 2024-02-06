import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AuthenticationCardComponent } from '../authentication-card/authentication-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(
    public modalService: NgbModal,
    private translocoService: TranslocoService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.activeSection = 'home';
  }
  ngOnInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      const isClickedInside = this.el.nativeElement.contains(event.target);

      if (!isClickedInside) {
        this.isDropdownOpen = false; // Close the dropdown
      }
    });
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }
  isScrolled = false;
  logo = 'logo-b';
  showMenu = false;
  activeSection: string;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 150;
    this.logo = this.isScrolled || this.showMenu ? 'logo' : 'logo-b';
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
    this.isScrolled = true;
    this.logo = this.isScrolled ? 'logo' : 'logo-b';
  }
  click(Id: string) {
    this.activeSection = Id;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  openPopup() {
    this.modalService.open(AuthenticationCardComponent, {
      size: 'xl',
      modalDialogClass: 'modal-dialog-centered',
    });
  }

  switchLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  isDropdownOpen = false;
  selectedLanguage = 'En';
  languageOptions = ['English', 'French'];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  changeLanguage(language: string) {
    this.translocoService.setActiveLang(language.substring(0, 2));
    this.selectedLanguage = language.substring(0, 2);
    this.isDropdownOpen = false;
  }
}
