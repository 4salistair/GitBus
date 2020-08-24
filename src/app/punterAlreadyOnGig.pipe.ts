import { Pipe, PipeTransform } from '@angular/core';
import { Gigs } from './gigModel';




@Pipe({

      name: 'PunterAlreadyOnGig',
      pure: true
})


 export class PunterAlreadyOnGig implements PipeTransform {

 count: number;
 resultArray: Gigs[];
 gigDataPush: Gigs[];
    transform( value: any, filteredGigs: Gigs[] ): Gigs[] {




    if (value === undefined || filteredGigs === undefined ) {
        return value;
        }


    this.resultArray  = value;
    this.count = 0;

    for (const ItemFilteredGig of filteredGigs) {

            for (const ItemFromValue of value) {

              if (ItemFromValue.id === ItemFilteredGig.gigID) {

                   this.resultArray.splice(this.count, 1);
             }
              this.count = this.count + 1;
            }
      }

    console.log(this.resultArray.length);
    value = this.resultArray;

    return value;

    }
    removeGig(value, index) {
      value.splice(index, 1);
  }
  }
