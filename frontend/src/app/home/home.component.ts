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
