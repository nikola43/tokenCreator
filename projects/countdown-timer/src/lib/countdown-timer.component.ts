import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ctimer-countdown-timer',
  template: `
    <div id="timer">
      <h6>UNLOCK COUNTDOWN</h6>
      <div class="progress">
        <div
          class="progress-bar"
          style="width: 82%"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="count">
        {{ time.days }}<span>D</span> - {{ time.hours }}<span>H</span> -
        {{ time.minutes }}<span>M</span> - {{ time.seconds }}<span>S</span>
      </div>
    </div>
  `,
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  time!: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  @Input() finishDateString: string = '';
  finishDate: Date = new Date();

  ngOnInit(): void {
    // Inicializamos el momento que falta hasta llegaral tiempo objetivo con valores en 0
    this.time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    // Creamos la fecha a partir de la fecha en formato string AAAA-MM-dd HH:mm:ss
    this.finishDate = new Date(this.finishDateString);

    let counterTimer$ = this.start().subscribe((_) => {
      if (this.time.days <= 0) {
        this.time = {
          hours: 0,
          minutes: 0,
          seconds: 0,
          days: 0,
        };
        counterTimer$.unsubscribe();
      }
    });
  }

  updateTime() {
    const now = new Date();
    const diff = this.finishDate.getTime() - now.getTime();

    // Cálculos para sacar lo que resta hasta ese tiempo objetivo / final
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    // La diferencia que se asignará para mostrarlo en la pantalla
    this.time.days = days;
    this.time.hours = hours - days * 24;
    this.time.minutes = mins - hours * 60;
    this.time.seconds = secs - mins * 60;
  }

  // Ejecutamos la acción cada segundo, para obtener la diferencia entre el momento actual y el objetivo
  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }
}