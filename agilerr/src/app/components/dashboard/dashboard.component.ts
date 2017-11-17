import {Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { AuthService } from '../../services/auth.service';
import { isNullOrUndefined } from 'util';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  projects: any;
  isMaster: boolean;
  isAvailable: boolean= false;

  classes = ['light-green accent-2', 'red accent-2', 'blue lighten-2', 'orange lighten-2' , 'red lighten-2' , 'pink lighten-2' , 'purple lighten-2' , 'deep-purple lighten-2' , 'indigo lighten-2' , 'lime lighten-2' , 'brown lighten-2'];

  constructor(
    private dashService: DashService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dashService.loadProjects().subscribe(projects => {
      // this.projects = projects;
      if (projects) {
        this.projects = projects;
        this.isAvailable = true;
      } else {
        // this.isAvailable = false;
      }

      if (isNullOrUndefined(localStorage.getItem('currentProject'))) {
        console.log(this.projects[0]);
      }
    }, err => {
      console.log(err);
    });

    this.isMaster = this.authService.isMaster();
  }

  ngOnInit() {

  }

  // Save project as current project when a project clicked
  projectClicked(item) {
    this.dashService.setCurrentProject(item);
    this.dashService.projectChanged.emit(this.dashService.getProjectId());
    this.router.navigate(['/sprints']);
  }

  // Get Random classes
  getRandomClasses() {
    const x = Math.floor((Math.random() * 11) + 0);
    return this.classes[x];
  }
}
