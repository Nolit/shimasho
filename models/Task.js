export const STEP_UP = 0
export const ACHIEVE = 1
export const TIME = 2

export default class Task {
    constructor(id, title, type, dueDate, amount, progress, isAchieved) {
        this.id = id
        this.title = title
        this.type = type
        this.dueDate = dueDate
        this.amount = amount
        this.progress = progress
        this.isAchievedFlag = isAchieved
    }

    isStepUp() {
        return this.type === STEP_UP
    }

    isAchieve() {
        return this.type === ACHIEVE
    }

    isTime() {
        return this.type === TIME
    }

    isAchieved() {
        if (this.isAchieve()) {
            return this.isAchievedFlag
        }
        if (this.isStepUp()) {
            return this.progress >= this.amount
        }
        if (this.isTime()) {
            return false
        }
    }
}

export function createStepUpTask(id, title, dueDate, amount, progress) {
    return new Task(id, title, STEP_UP, dueDate, amount, progress, 0)
}

export function createAchieveTask(id, title, dueDate, isAchieved) {
    return new Task(id, title, ACHIEVE, dueDate, 0, 0, isAchieved)
}