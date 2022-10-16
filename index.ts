import './style.css';

import { of, map, Observable, fromEvent, tap, Observer } from 'rxjs';

console.clear();

// Получаем ссылку на элемент кнопки.
const btn = document.getElementById('myButton');

// Создаем поток из кликов по кнопке.
const myObservable = fromEvent(btn, 'click');

// Создаем подписчика, выводящего лог на каждый клик
const sub1 = myObservable.subscribe({
  next: (event) => console.log(`sub1 -> next:`, event),
  error: (error) => console.error('sub1 -> error'),
  complete: () => console.log('sub1 -> complete'),
});

const sub2 = myObservable.subscribe({
  next: (event) => console.log(`sub2 -> next:`, event),
  error: (error) => console.error('sub2 -> error'),
  complete: () => console.log('sub2 -> complete'),
});

fromEvent(document.getElementById('unsub'), 'click').subscribe({
  next: (event) => {
    sub1.unsubscribe();
    console.log('Unsubscribe: sub1');
  },
});

// myObservable
//   .pipe(tap((item) => console.log(`Tap item: ${item}`)))
//   .subscribe((event) => console.log(event));

// fromEvent создает холодный поток, который будет испускать события, только при наличии подписки.

const myStream = new Observable((observer: Observer<string>) => {
  setTimeout(() => {
    observer.next('first');
  }, 2000);

  setTimeout(() => {
    observer.next('second');
  }, 4000);

  setTimeout(() => {
    // Завершает стрим, следующие выховы next() не вызовут итерации.
    observer.complete();
  }, 5000);

  setTimeout(() => {
    observer.next('third');
  }, 6000);
});

// myStream.subscribe(
//   (data: string) => console.log(data),
//   (error: string) => console.log(error),
//   () => console.log('completed')
// );
