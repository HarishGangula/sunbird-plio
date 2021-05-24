import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v8';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { of, throwError as observableThrowError, Observable } from 'rxjs';
import * as _ from 'lodash-es';
import { Injectable } from '@angular/core';
import { data } from './quml-library-data';
import { data as plioData } from './plio-data'

@Injectable({providedIn: 'root'})
export class QuestionCursorImplementationService implements QuestionCursor {
    listUrl: string; // Define this url to call list api in server
    currentTime: number;
    currentQuestion: any;
    constructor(private http: HttpClient) { }

    getQuestions(identifiers: string[]): Observable<any> {
        if (this.listUrl) {
            const option: any = {
                url: this.listUrl,
                data: {
                    request: {
                        search: { identifier: identifiers }
                    }
                }
            };
            return this.post(option).pipe(map((data) => {
                return data.result;
            }));
        } else {
            let question = _.find(plioData, (data) => data.question.identifier === identifiers[0])['question']
            return of({
                "questions": [question],
                "count": 1
            });
        }
    }

    getQuestion(identifier: string): Observable<any> {
        if (this.listUrl) {
            const option: any = {
                url: this.listUrl,
                data: {
                    request: {
                        search: { identifier: [identifier] }
                    }
                }
            };
            return this.post(option).pipe(map((data) => {
                return data.result;
            }));
        } else {
            return of({
                "questions": [this.currentQuestion],
                "count": 1
            });
        }
    }

    private post(requestParam): Observable<any> {
        const httpOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        return this.http.post(requestParam.url, requestParam.data, httpOptions).pipe(
            mergeMap((data: any) => {
                if (data.responseCode !== 'OK') {
                    return observableThrowError(data);
                }
                return of(data);
            }));
    }

    getQUMLPlayerConfig(currentTime) {
        let config = data;
        this.currentQuestion = _.find(plioData, (data) => data.time === currentTime)['question']
        config.metadata.childNodes = [this.currentQuestion.identifier]
        return config
    }
}
