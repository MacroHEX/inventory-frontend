import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ArrayDataSubject} from "../../../../base/rx/array-data.subject";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnDestroy {

  // ::: views
  //
  @ViewChild("list") protected table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // ::: inputs
  //
  @Input("headers") withHeaders = true;
  @Input("content") content = []; // init data
  @Input("cols") columns = ["id", "name", "description", "actions"];

  // ::: outputs
  //
  @Output("action") protected emitter: EventEmitter<object> = new EventEmitter<object>();

  // ::: vars
  //
  dataSource = new MatTableDataSource();
  protected dataSubject = new ArrayDataSubject<any>(this.content);

  // ::: constructor
  //
  constructor(/*public appService: AppService*/) {
    this.dataSubject.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }


  // ::: ng
  //
  ngOnDestroy() {
    this.dataSubject.unsubscribe();
  }

  // ::: api
  //
  getDataSubject() {
    return this.dataSubject;
  }

  // ::: ui
  //
  emit(eventName: string, data?: any, event?: any) {
    if (event) {
      event.stopPropagation();
    }
    this.emitter.emit({"name": eventName, "data": data});
  }
}
