export class Video {
  id?: number;
  courseSectionId: number;
  videoPandaId: string;
  title: string;
  description: string;
  createdAt: string;
  videoPanda: VideoPanda;

  constructor() {
    this.courseSectionId = 0;
    this.videoPandaId = "";
    this.title = "";
    this.description = "";
    this.createdAt = "";
    this.videoPanda = new VideoPanda();
  }
}

class VideoPanda {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  folderId: string;
  libraryId: string;
  liveId?: string;
  videoExternalId: string;
  convertedAt?: string;
  createdAt: string;
  updateAt: string;
  storageSize: number;
  length: number;
  videoPlayer: string;
  videoHls: string;
  preview: string;
  thumbnail: string;

  constructor() {
    this.id = "";
    this.title = "";
    this.description = "";
    this.status = "";
    this.userId = "";
    this.folderId = "";
    this.libraryId = "";
    this.videoExternalId = "";
    this.createdAt = "";
    this.updateAt = "";
    this.storageSize = 0;
    this.length = 0;
    this.videoPlayer = "";
    this.videoHls = "";
    this.preview = "";
    this.thumbnail = "";
  }
}
