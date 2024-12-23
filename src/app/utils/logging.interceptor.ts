import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.debug(...createLogMessage(req, event, elapsed));
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(...createErrorLogMessage(req, error));
        }
      }
    })
  );
};

function createLogMessage(req: HttpRequest<any>, res: HttpResponse<any>, elapsed: number): any[] {
      return [
    `HTTP communication: ${req.method} "${req.urlWithParams}" succeeded with code ${res.status} in ${elapsed} ms.`,
    `Request body: ${JSON.stringify(req.body)}`,
    `Response body: ${JSON.stringify(res.body)}`
  ];
}

function createErrorLogMessage(req: HttpRequest<any>, res: HttpErrorResponse): any[] {
  const message = [
    `HTTP communication error: ${req.method} "${req.urlWithParams}"`,
    `Request body: ${JSON.stringify(req.body)}`,
    `Failed with code ${res.status}: ${res.message}`,
    `Response body: ${JSON.stringify(res.error)}`
  ];

  const messageArray = [
    res?.error?.messages?.[0]?.translation,
    res?.error?.message?.translation,
    res?.error?.detail,
    res?.error?.title
  ].filter(item => item !== null && item !== undefined && item.trim() !== '');

  const firstNotBlankMessage = messageArray.length > 0 ? messageArray[0] : null;
  if (firstNotBlankMessage) {
    message.push(` - ${firstNotBlankMessage}`);
  }

  return message;
}
