import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breadcrumb: string[] = [];
  footerData = [
    {
      id: 0,
      name: 'Angular',
      description: 'Built with Angular 13',
      icon: '/assets/icons/angular.png',
    },
    {
      id: 1,
      name: 'Angular Material',
      description: 'Angular UI library',
      icon: '/assets/icons/angular_material.png',
    },
    {
      id: 2,
      name: 'Nginx',
      description: 'Light and efficient server',
      icon: '/assets/icons/nginx.png',
    },
    {
      id: 3,
      name: 'PHP',
      description: 'Popular back-end language',
      icon: '/assets/icons/php.png',
    },
  ];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        // @ts-ignore
        return this.route?.firstChild.data;
      }))
      .subscribe(data => {
        if (data['breadcrumb']?.length) {
          this.breadcrumb = data['breadcrumb'];
        }
      });
  }



  ngOnInit(): void {
  }

  getLink(item: string): string | undefined {
    return item === 'Home' ? 'Home' : undefined;
  }

}
