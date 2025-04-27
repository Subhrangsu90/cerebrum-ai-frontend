import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  provideMarkdown,
} from 'ngx-markdown';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-markup.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-scss.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-sass.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-git.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-cpp.min.js';
import 'prismjs/components/prism-csharp.min.js';
import 'prismjs/components/prism-dart.min.js';
import 'prismjs/components/prism-powershell.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-jsx.min.js';

import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e0f7f8', // very light cyan
      100: '#b3ecef', // lighter cyan
      200: '#80e0e5', // soft light cyan
      300: '#4dd3db', // light cyan
      400: '#26c6cf', // medium-light cyan
      500: '#00adb5', // base primary
      600: '#009aa1', // slightly darker
      700: '#00878d', // dark
      800: '#00686d', // darker
      900: '#00494c', // darkest
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),

    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    }),

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
};
