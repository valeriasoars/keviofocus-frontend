import { Component, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { SessionModel } from '../../../models/sessionModel';
import { KevioService } from '../../../services/kevio-service';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnInit, OnDestroy, OnChanges {
  @Input() session!: SessionModel;

  timeLeft = signal<number>(0);
  timerRunning = signal<boolean>(false);
  currentCycle = signal<number>(1);
  isBreak = signal<boolean>(false);
  toast = signal<string>('');

  currentRunId: string | null = null;
  private intervalId: any;
  private toastTimer: any;

  constructor(private service: KevioService) {}

  ngOnInit() {
    this.timeLeft.set(this.session.focusDurationMinutes * 60);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['session'] && !changes['session'].firstChange) {
      clearInterval(this.intervalId);
      this.timerRunning.set(false);
      this.currentRunId = null;
      this.currentCycle.set(1);
      this.isBreak.set(false);
      this.timeLeft.set(this.session.focusDurationMinutes * 60);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearTimeout(this.toastTimer);
  }


  get displayTime(): string {
    const m = Math.floor(this.timeLeft() / 60)
      .toString()
      .padStart(2, '0');
    const s = (this.timeLeft() % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  get progressCircumference(): number {
    return 2 * Math.PI * 100;
  }

  get progressOffset(): number {
    const circ = this.progressCircumference;
    const totalTime =
      (this.isBreak() ? this.session.breakDurationMinutes : this.session.focusDurationMinutes) * 60;
    if (!totalTime) return circ;
    const progress = (totalTime - this.timeLeft()) / totalTime;
    return circ - progress * circ;
  }

  get progressColor(): string {
    return this.isBreak() ? '#0F6E56' : '#000000';
  }

  get cycleArray(): number[] {
    return Array.from({ length: this.session?.cycles ?? 0 }, (_, i) => i + 1);
  }

  getCycleDotClass(i: number): string {
    if (i < this.currentCycle()) return 'done';
    if (i === this.currentCycle() && !this.isBreak()) return 'active';
    return '';
  }

  startTimer() {
    if (this.timerRunning()) return;

    if (!this.currentRunId) {
      this.service.startRun({ sessionId: this.session.id }).subscribe((run: any) => {
        this.currentRunId = run.id;
      });
      this.currentCycle.set(1);
      this.isBreak.set(false);
    }

    if (this.timeLeft() === 0) {
      const mins = this.isBreak()
        ? this.session.breakDurationMinutes
        : this.session.focusDurationMinutes;
      this.timeLeft.set(mins * 60);
    }

    this.timerRunning.set(true);

    this.intervalId = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((t) => t - 1);
      } else {
        this.clearTimer();
        this.nextStep();
      }
    }, 1000);
  }

  pauseTimer() {
    this.clearTimer();
  }

  stopTimer() {
    this.clearTimer();
    this.finishRun();
  }


  private clearTimer() {
    clearInterval(this.intervalId);
    this.timerRunning.set(false);
  }

  private finishRun() {
    if (this.currentRunId) {
      this.service.finishRun(this.currentRunId).subscribe();
      this.currentRunId = null;
    }
    this.timeLeft.set(this.session.focusDurationMinutes * 60);
    this.currentCycle.set(1);
    this.isBreak.set(false);
  }

  private nextStep() {
    if (!this.isBreak()) {
      if (this.currentCycle() < this.session.cycles) {
        this.showToast('Hora da pausa! Respira um pouco.');
        this.isBreak.set(true);
        this.timeLeft.set(0);
        this.startTimer();
      } else {
        this.showToast('Sessão completa! Ótimo trabalho.');
        this.finishRun();
      }
    } else {
      this.showToast('Volte ao foco!');
      this.isBreak.set(false);
      this.currentCycle.update((c) => c + 1);
      this.timeLeft.set(0);
      this.startTimer();
    }
  }

  showToast(msg: string) {
    this.toast.set(msg);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2800);
  }
}
