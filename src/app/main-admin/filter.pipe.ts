import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

 	transform(value: any, fil:string) {
    		if(value.toLowerCase().indexOf(fil) != -1){
   			return value;
   		}
  	}
}