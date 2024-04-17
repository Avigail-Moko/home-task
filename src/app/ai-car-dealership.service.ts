import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiCarDealershipService {
  private myArraySubject = new BehaviorSubject<string[]>([]);
    constructor() {
    this.loadArrayFromLocalStorage();
  }

  //Load the array from local storage and update the BehaviorSubject
  private loadArrayFromLocalStorage(): void {
    const storedArray = localStorage.getItem('myArray');
    if (storedArray) {
      this.myArraySubject.next(JSON.parse(storedArray));
    }
  }

  public getMyArray(): Observable<any> {
    return this.myArraySubject.asObservable();
  }

  //adding new items
  public pushItemToMyArray(item: any): void {
    const currentArray = this.myArraySubject.getValue();
    const newArray = [...currentArray, item];
    this.myArraySubject.next(newArray);
    localStorage.setItem('myArray', JSON.stringify(newArray));

    console.log(localStorage.getItem('myArray'));
  }

}
