import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranscriptionService } from '../services/transcription.service';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
})
export class TranscriptionComponent implements OnInit {
  videoPath: string;
  transcription: string = 'Transcribing...';
  summary: string = 'Summarizing...';
  notes: string = 'Generating notes...';

  constructor(
    private route: ActivatedRoute,
    private transcriptionService: TranscriptionService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.videoPath = params['videoPath'];
      this.processVideo();
    });
  }

  async processVideo() {
    try {
      this.transcription = await this.transcriptionService.transcribeVideo(this.videoPath);
      this.summary = await this.transcriptionService.summarizeTranscription(this.transcription);
      this.notes = await this.transcriptionService.generateNotes(this.transcription);
    } catch (error) {
      console.error('Error processing video:', error);
      this.transcription = 'Error transcribing video';
      this.summary = 'Error summarizing transcription';
      this.notes = 'Error generating notes';
    }
  }
}