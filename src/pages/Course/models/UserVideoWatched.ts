export class UserVideoWatched {
    id?: number
    courseId: number
    videoId: number
    userId: number
    isWatched: boolean
    watchedDate: string

    constructor(){
        this.courseId = 0
        this.videoId = 0
        this.userId = 0
        this.isWatched = false
        this.watchedDate = ""
    }
}