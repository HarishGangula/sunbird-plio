import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from './quml-library-data';
import { data as plioData } from './plio-data'
import * as _ from 'lodash-es'
import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
import { $ } from 'protractor';
declare var jQuery:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  eventsSubject: Subject<any> = new Subject<any>();
  isQUMLPlayerShown: boolean = false
  showProceed = false;
  videoDisplay = 'block'
  QumlPlayerConfig = data;
  markers = _.map(plioData, (marker) => {
    return {time : marker.time}
  })

  playerConfig: any = {
    context: {
      mode: 'play',
      authToken: '',
      sid: '7283cf2e-d215-9944-b0c5-269489c6fa56',
      did: '3c0a3724311fe944dec5df559cc4e006',
      uid: 'anonymous',
      channel: '505c7c48ac6dc1edc9b08f21db5a571d',
      pdata: { id: 'prod.diksha.portal', ver: '3.2.12', pid: 'sunbird-portal.contentplayer' },
      contextRollup: { l1: '505c7c48ac6dc1edc9b08f21db5a571d' },
      tags: [
        ''
      ],
      cdata: [],
      timeDiff: 0,
      objectRollup: {},
      host: '',
      endpoint: '',
      userData: {
        firstName: 'Harish Kumar',
        lastName: 'Gangula'
      }
    },
    config: {
      traceId: 'afhjgh',
      sideMenu: {
        showShare: true,
        showDownload: true,
        showReplay: true,
        showExit: true
      },
      markers: {
        markerStyle: {
          'height': '9px',
          'z-index': '4',
          'bottom': '39%',
          'background-color': 'orange'
        },
        onMarkerReached: (marker) => {
          this.showQUMLPlayer(marker)
          this.updateQUMLPlayerConfig(marker);
        },
        markers: this.markers
      }
    },
    // tslint:disable-next-line:max-line-length
    metadata: { compatibilityLevel: 2, "copyright": "NCERT", "subject": ["CPD"], "channel": "0125196274181898243", "language": ["English"], "mimeType": "video/mp4", "objectType": "Content", "gradeLevel": ["Others"], "appIcon": "https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31309320735055872011111/artifact/nishtha_icon.thumb.jpg", "primaryCategory": "Explanation Content", "artifactUrl": "https://sunbirddev.blob.core.windows.net/sunbird-content-dev/content/assets/do_11328606477475020811325/opiniontrainingvideopickupanddeliveryprocess-1.mp4", "contentType": "ExplanationResource", "identifier": "do_31309320735055872011111", "audience": ["Student"], "visibility": "Default", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": ["en"], "license": "CC BY-SA 4.0", "name": "Engagement with Language", "status": "Live", "code": "1c5bd8da-ad50-44ad-8b07-9c18ec06ce29", "streamingUrl": "https://sunbirdde.blob.core.windows.net/sunbird-content-dev/content/assets/do_11328606477475020811325/opiniontrainingvideopickupanddeliveryprocess-1.mp4", "medium": ["English"], "createdOn": "2020-08-24T17:58:32.911+0000", "copyrightYear": 2020, "lastUpdatedOn": "2020-08-25T04:36:47.587+0000", "creator": "NCERT COURSE CREATOR 6", "pkgVersion": 1, "versionKey": "1598330207587", "framework": "ncert_k-12", "createdBy": "68dc1f8e-922b-4fcd-b663-593573c75f22", "resourceType": "Learn", "orgDetails": { "email": "director.ncert@nic.in", "orgName": "NCERT" }, "licenseDetails": { "name": "CC BY-SA 4.0", "url": "https://creativecommons.org/licenses/by-sa/4.0/legalcode", "description": "For details see below:" } },
    data: {}
  };

  constructor(private questionCursor: QuestionCursorImplementationService) {
    
  }

  showQUMLPlayer(marker) {
    this.eventsSubject.next({ action: 'pause', data: null });
    this.eventsSubject.next({ action: 'seekTo', data: { seconds: marker.time } });
    this.isQUMLPlayerShown = true
    this.videoDisplay = 'none'
  }

  updateQUMLPlayerConfig(marker) {
    this.QumlPlayerConfig = this.questionCursor.getQUMLPlayerConfig(marker.time);
  }

  playerEvent(event) {
    // console.log(event);
  }

  telemetryEvent(event) {
    console.log('in app: ', JSON.stringify(event));
  }


  

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));
    let time = this.questionCursor.getTime(event.item.id)
    this.showProceed = true
    if(event.pass == 'No') {
      jQuery(`div[data-marker-time='${time}']`).css('background-color', 'red')
    } else {
      jQuery(`div[data-marker-time='${time}']`).css('background-color', 'green')
    }
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }
  proceedOrClose() {
    this.showProceed = false
    this.isQUMLPlayerShown = false
    this.videoDisplay = 'block'
    this.eventsSubject.next({ action: 'play', data: null });
  }
}
