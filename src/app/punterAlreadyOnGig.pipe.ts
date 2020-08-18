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

    
    
    // console.log(filteredGigs);

    if (value === undefined || filteredGigs === undefined ) {
     //   console.log('null');
        return value;
        }
        // else {

    //    // console.log('value ' + value[0].id);
   // this.removeGig(value, 0);
    //    // console.log('value ' + value[0].id);

    //   //  console.log('value ' + value.splice[0]);
    // }
 //   console.log('value ' + value[0].id);
      // 3 arrays
      // 1 array has all gigs in it - value
      // 1 array has only gigs for current user - filteredGig
      // 1 array is the output - resultArray

    

    this.resultArray  = value;
    this.count = 0;
    console.log('***** START  ******' + this.count);
    for (const ItemFilteredGig of filteredGigs) {

           
            // console.log('gigID ' + ItemFilteredGig.gigID);
            console.log('** Filter Loop **' );
            console.log('gigArtistName filter ' + ItemFilteredGig.gigArtistName);

            for (const ItemFromValue of value) {
            //  console.log('** Filter Value **' );
            //  console.log('gigArtistName value ' + ItemFromValue.gigArtistName);


              if (ItemFromValue.id === ItemFilteredGig.gigID) {

                   console.log('** MATCH **  ' + ItemFromValue.id + '=' + ItemFilteredGig.gigID );
                 //  console.log('value ' + this.resultArray.length;
                //  
              //   this.removeGig(value, 0);
                   const getID = (id) => id > ItemFromValue.id;

                   console.log(this.resultArray.findIndex(getID));
// expected output: 3

                   console.log('length ' + this.resultArray.length);
                   console.log('count ' + this.count);
                   this.resultArray.splice(this.resultArray.findIndex(getID));
                   this.count = this.count - 1;
                // console.log('value ' + value[0].id);
               //  console.log('** HAS VALUE BEEN SPLICED ??? **  ');
              //   console.log('this.resultArray ' + this.resultArray);
                  // ;+ ItemFromValue.id + '=' + ItemFilteredGig.gigID );
            //   console.log('item in Result value ' + value);
     //            console.log(ItemFilteredGig.gigArtistName + ' ' + ItemFilteredGig.gigID);
            //   console.log(ItemFromValue.gigArtistName + ' ' + ItemFromValue.id);
            // //  resultArray.splice(this.count);
            //   console.log('item in Result value ' + value);
             }
              this.count = this.count + 1;
          }
      }
    // console.log(resultArray);
    value = this.resultArray;
   // console.log('this.resultArray ' + this.resultArray[0].gigArtistName);
    return value;

    //  console.log('Gigs - ' + gigs);
    //  console.log('Gigs filter - ' + filteredGigs);


    }
    removeGig(value, index) {
      value.splice(index, 1);
  }
  }

      // this.isOnBusChanged.next(true);

      // console.log('this.setBoolean');

    //   setInterval(() => {
    //     if (this.setBoolean === false) {this.setBoolean = true; }
    //     console.log('this.setBoolean');
    //     this.isOnBusChanged.next(this.setBoolean);

    //     return  this.isOnBusChanged.asObservable();
    // }, 2000);

  //  //   this.isOnBusChanged.next(false);
  //     this.setBoolean = false;

  //     const filter = this.db.collection('puntersGigs', ref => ref.where('userid', '==', this.userID)
  //                                                                .where('gigID', '==', GigID )
  //             );

  //     filter
  //     .snapshotChanges()
  //     .pipe(map(docData => {
  //     return docData.map(doc => {
  //     return {
  //       id: doc.payload.doc.id,
  //       gigArtistName: doc.payload.doc.data()['gigArtistName'],
  //       gigDescription: doc.payload.doc.data()['gigDescription'],
  //       gigVenueName: doc.payload.doc.data()['gigVenueName'],
  //       gigDate: doc.payload.doc.data()['gigDate'],
  //       gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
  //       gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
  //       giguserID: doc.payload.doc.data()['userid'],
  //       gigID: doc.payload.doc.data()['gigID']
  //       };
  //     });
  //     })
  //     )
  //     .subscribe((filteredGigs: Gigs[]) => {
  //     this.filteredGigs =  filteredGigs;


  //     if ( this.filteredGigs.length > 0) {

  //       console.log(this.filteredGigs.length);
  //       console.log(this.filteredGigs[0].gigArtistName);
  //       this.isOnBusChanged.next(true);

  //   this.setBoolean = true;

  //     }
  //     return;
  //   });


              
                //  this.gigDataPush[this.count].gigID = ItemFromValue.id;
                //  this.gigDataPush[this.count].gigDescription = ItemFromValue.gigDescription;
                //  this.gigDataPush[this.count].gigVenueName = ItemFromValue.gigVenueName;
                //  this.gigDataPush[this.count].gigDate = ItemFromValue.gigDate;
                //  this.gigDataPush[this.count].gigTotalPrice = ItemFromValue.gigTotalPrice;
               
                //  this.resultArray.push(this.gigDataPush); // .push(gigDataPush);
                 //   commnetData.name = 'something';
                 //  this.resultArray.push( // ItemFromValue.id
                  // resultArray.id : ItemFromValue.id,
                 //  gigArtistName: ItemFromValue.gigArtistName,
                  // gigDescription: string;
                  // gigVenueName: string;
                  // string;
                  // gigDate: Date;
                  // gigTotalPrice: number;
                  // gigRunningCostPerPunter?: number;
                  // gigPunterCount?: number;
                  // giguserID?: string;
                  // gigID?: string;
                  // // gigArtistName: doc.payload.doc.data()['gigArtistName'],
                  // gigDescription: doc.payload.doc.data()['gigDescription'],
                  // gigVenueName: doc.payload.doc.data()['gigVenueName'],
                  // gigDate: doc.payload.doc.data()['gigDate'],
                  // gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
                  // gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter'],
                  // gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
                  // gigID: doc.payload.doc.id
                  
                // console.log(this.resultArray);
                //  );




    // return   this.isOnBusChanged.asObservable();
