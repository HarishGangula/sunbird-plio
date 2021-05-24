import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QumlLibraryModule, QuestionCursor } from '@project-sunbird/sunbird-quml-player-v8';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { SunbirdVideoPlayerModule} from '@project-sunbird/sunbird-video-player-v8';
import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SunbirdVideoPlayerModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    QumlLibraryModule
  ],
  providers: [{
    provide: QuestionCursor,
    useClass: QuestionCursorImplementationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
