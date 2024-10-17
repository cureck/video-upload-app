import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import * as imagepicker from "@nativescript/imagepicker";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private routerExtensions: RouterExtensions) {}

  onUploadVideo() {
    let context = imagepicker.create({
      mode: "single",
      mediaType: imagepicker.ImagePickerMediaType.Video
    });

    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        if (selection.length > 0) {
          let selected = selection[0];
          this.routerExtensions.navigate(['/transcription'], {
            queryParams: {
              videoPath: selected.path
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}