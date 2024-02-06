import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements AfterViewInit {
  routpath: boolean = true;
  private swiperInstance: Swiper | undefined;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeSwiper();
        this.handleResponsiveBehavior();
      });
    }
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  private initializeSwiper(): void {
    this.swiperInstance = new Swiper('.swiper-container', {
      slidesPerView: 3,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  private handleResponsiveBehavior(): void {
    // Use Angular's breakpointObserver to detect changes in screen size
    this.breakpointObserver
      .observe(['(min-width: 768px)', '(min-width: 640px)'])
      .subscribe((result) => {
        if (this.swiperInstance) {
          this.updateSlidesPerView(result);
        }
      });
  }

  private updateSlidesPerView(breakpointState: any): void {
    // Update slidesPerView based on the detected breakpoint
    if (breakpointState.breakpoints['(min-width: 768px)']) {
      this.swiperInstance!.params.slidesPerView = 3; // Large screens
    } else if (breakpointState.breakpoints['(min-width: 640px)']) {
      this.swiperInstance!.params.slidesPerView = 2; // Medium screens
    } else {
      this.swiperInstance!.params.slidesPerView = 1; // Small screens
    }

    // Update Swiper
    this.swiperInstance!.update();
  }
  goToNextSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }
  goToPrevSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }

  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const path = url == undefined ? 'home' : url.path;
      this.formationdetails =
        path == 'home'
          ? this.formationdetails.slice(0, 4)
          : this.formationdetails;
      this.routpath = path == 'home' ? true : false;
    });
  }
  formationdetails = [
    {
      path: '../../assets/images/AngularJs.png',
      title: 'AngularJS',
      begin: '06/01/2023',
      end: '16/01/2023',
      description:
        'Master the fundamentals of AngularJS, the powerful JavaScript framework, in this comprehensive training. Learn to build dynamic and responsive web applications using declarative programming techniques.',
      hours: '2h/j',
      location: 'Online',
      tags: ['JavaScript', 'AngularJS', 'TypeScript', 'HTML', 'CSS', 'SCSS'],
    },
    {
      path: '../../assets/images/JS.png',
      title: 'JavaScript',
      begin: '07/01/2023',
      end: '16/01/2023',
      description:
        'Unleash the power of JavaScript with our dynamic formation. Dive into the fundamentals of this versatile programming language, from basic syntax to advanced concepts.',
      hours: '2h/j',
      location: 'Online',
      tags: ['JavaScript'],
    },
    {
      path: '../../assets/images/tailwind.png',
      title: 'Tailwind',
      begin: '02/01/2023',
      end: '5/01/2023',
      description:
        'Elevate your web design skills with our Tailwind Formation. Delve into the modern utility-first CSS framework, Tailwind CSS, and learn to craft visually stunning and responsive user interfaces effortlessly.',
      hours: '3h/j',
      location: 'Tunisa',
      tags: ['Tailwinds', 'CSS', 'HTML'],
    },
    {
      path: '../../assets/images/HTML.png',
      title: 'HTML',
      begin: '02/01/2023',
      end: '12/01/2023',
      description:
        'Explore the foundational language of the web with our HTML Formation. Perfect for beginners and those looking to solidify their skills, this course guides you through the essentials of HTML.',
      hours: '3h/j',
      location: 'Online',
      tags: ['HTML', 'CSS'],
    },
    {
      path: '../../assets/images/typscript.jpg',
      title: 'TypeScript',
      begin: '07/01/2023',
      end: '17/01/2023',
      description:
        'Transform your JavaScript development with our TypeScript Formation. This course is designed for developers seeking enhanced maintainability and scalability in their projects.',
      hours: '2h/j',
      location: 'Tunisa',
      tags: ['TypeScript', 'JavaScript', 'HTML'],
    },
  ].sort((a, b) => Date.parse(b.begin) - Date.parse(a.begin));
}
