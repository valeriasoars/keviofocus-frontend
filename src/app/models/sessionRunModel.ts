export interface SessionRunModel {
    id?: string
  sessionId: string;
  // StatusEnum Status
  currentCycle: number;
  startedAt: Date;
  finishedAt: Date;
  totalFocusSeconds: number;
  totalBreakSeconds: number;
}
