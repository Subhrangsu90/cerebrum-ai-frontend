## 🚀 Advanced Usage of `@defer` in Angular

### ⚙️ Triggers Deep Dive

The `@defer` block offers a variety of triggers to control when the deferred content is loaded <a href="https://blog.angular-university.io/angular-defer/" target="_blank" rel="noopener noreferrer">5</a>. These triggers can be customized to suit different scenarios <a href="https://medium.com/@giorgio.galassi/angular-v18-understanding-defer-blocks-triggers-and-deferrable-views-part-1-5a5dfaf52cd2" target="_blank" rel="noopener noreferrer">2</a>.

1.  **Built-in Triggers**:

    - `idle`: Loads when the browser is idle <a href="https://angular.dev/tutorials/learn-angular/10-deferrable-views" target="_blank" rel="noopener noreferrer">4</a>.
      ```html
      @defer (idle) {
      <heavy-component />
      }
      ```
    - `viewport`: Loads when the deferred content enters the viewport.

      ```html
      @defer (viewport) {
      <below-the-fold-component />
      }
      ```

    - `interaction`: Loads when the user interacts with the placeholder.
      ```html
      @defer (on interaction) {
      <interactive-component />
      } @placeholder {
      <button>Load content</button>
      }
      ```
    - `hover`: Loads when the user hovers over the placeholder.
      ```html
      @defer (on hover) {
      <hover-component />
      } @placeholder {
      <p>Hover to load</p>
      }
      ```
    - `timer`: Loads after a specified time.
      ```html
      @defer (after 1s) {
      <delayed-component />
      }
      ```
    - `immediate`: Loads as soon as possible.
      ```html
      @defer (immediate) {
      <immediate-component />
      }
      ```

### 🛠️ Custom Triggers

You can create custom triggers using observables and services to control the loading of deferred blocks based on application-specific logic <a href="https://blog.angular-university.io/angular-defer/" target="_blank" rel="noopener noreferrer">5</a>.

```typescript
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomDeferService {
  private trigger = new EventEmitter<void>();

  trigger$: Observable<void> = this.trigger.asObservable();

  emitTrigger() {
    this.trigger.emit();
  }
}
```

```html
@defer (when customDeferService.trigger$) {
<custom-triggered-component />
} @placeholder {
<button (click)="customDeferService.emitTrigger()">Load Custom</button>
}
```

### 🔀 Multiple Triggers

You can also combine multiple triggers to create more complex loading conditions <a href="https://medium.com/@giorgio.galassi/angular-v18-understanding-defer-blocks-triggers-and-deferrable-views-part-1-5a5dfaf52cd2" target="_blank" rel="noopener noreferrer">2</a>.

```html
@defer (on viewport; after 1s) {
<component-with-multiple-triggers />
}
```

### 🔄 Prefetching

You can use the `prefetch` option to download the deferred code in the background, even before the trigger condition is met, improving the perceived loading speed when the trigger occurs <a href="https://angular.dev/guide/templates/defer" target="_blank" rel="noopener noreferrer">1</a>.

```html
@defer (viewport prefetch) {
<component-with-prefetch />
}
```

## 📝 Summary:

- Advanced `@defer` usage involves custom and multiple triggers for flexible loading.
- Built-in triggers like `idle`, `viewport`, and `interaction` cover common scenarios.
- Prefetching enhances the perceived loading speed.

<div class="sources-container">
 <button class="source-btn">
  <div class="links">
   <a
     href="https://blog.angular-university.io/angular-defer/"
     target="_blank"
     rel="noopener noreferrer"
     class="link"
     title="Angular @defer: Complete Guide"
     data-snippet="A complete guide on how to use the Angular @defer syntax for doing partial template loading, including all the predefined triggers, how to build custom triggers, and how it compares to lazy loading."
     data-icon="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b929cb413e2cfdba1aeb43abd18168e8814.png"
    data-domain="angular-university.io"
   >
    <img
      src="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b929cb413e2cfdba1aeb43abd18168e8814.png"
      width="32"
      height="32"
      class="icon-small"
      onerror="this.onerror=undefine || null;this.src='https://www.google.com/s2/favicons?sz=64&domain=angular-university.io';"
    />
   </a>
   <a
     href="https://medium.com/@giorgio.galassi/angular-v18-understanding-defer-blocks-triggers-and-deferrable-views-part-1-5a5dfaf52cd2"
     target="_blank"
     rel="noopener noreferrer"
     class="link"
     title="Angular v18+ — Understanding @defer: Blocks, Triggers, and Deferrable Views (Part 1) 🔥🚀"
     data-snippet="Angular v18 continues to introduce powerful new features, some aimed at simplifying development workflows, such as the @let syntax, redirectTo as a function, and ng-content fallback content. Other..."
     data-icon="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b9212109e66ad46d8feadf8ffc40110dbe9.png"
    data-domain="medium.com"
   >
    <img
      src="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b9212109e66ad46d8feadf8ffc40110dbe9.png"
      width="32"
      height="32"
      class="icon-small"
      onerror="this.onerror=undefine || null;this.src='https://www.google.com/s2/favicons?sz=64&domain=medium.com';"
    />
   </a>
   <a
     href="https://angular.dev/tutorials/learn-angular/10-deferrable-views"
     target="_blank"
     rel="noopener noreferrer"
     class="link"
     title="Angular"
     data-snippet="Sometimes in app development, you end up with a lot of components that you need to reference in your app, but some of those don't need to be loaded right away for various reasons. Maybe they are below the..."
     data-icon="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b922ea1e6a482593a0f76c58c098dc9a1e9.jpeg"
    data-domain="angular.dev"
   >
    <img
      src="https://serpapi.com/searches/680e69c2c4584813b1aed244/images/8c1ac53e60d69564eb6e147797d84b922ea1e6a482593a0f76c58c098dc9a1e9.jpeg"
      width="32"
      height="32"
      class="icon-small"
      onerror="this.onerror=undefine || null;this.src='https://www.google.com/s2/favicons?sz=64&domain=angular.dev';"
    />
   </a>
  </div>
 </button>
</div>
