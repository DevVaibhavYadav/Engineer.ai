import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import {FilerPipe} from '../filer.pipe'
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-service-call',
  templateUrl: './service-call.component.html',
  styleUrls: ['./service-call.component.scss'],
  providers: [DecimalPipe]
})
export class ServiceCallComponent implements OnInit {

  public searchText : string;
  hits$: any;

  data;
  filterData;
  aaa;

  constructor(private rest : RestService, private http: HttpClient,private modalService: NgbModal) {
   }

  ngOnInit() {
    this.http.get("https://hn.algolia.com/api/v1/search_by_date?tags=story")
      .subscribe(
        res => {
          debugger;
          this.data = res["hits"];
          this.filterData = res["hits"];
        },
        err => {
          console.log('Error occured');
        }
      );
  }
  openJsonModel(content, data) {
    debugger;
    this.aaa = JSON.stringify(data, null, 4);
    this.modalService.open(content, { size: 'lg' });
  }

  search(term: string) {
    if(!term) {
      this.filterData = this.data;
    } else {
      this.filterData = this.data.filter(x => 
         x.title.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }
}
