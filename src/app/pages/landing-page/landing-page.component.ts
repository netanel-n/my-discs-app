import { Component, input } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    host: {
        'class': 'page',
        '[class.with-reason]': 'reason()'
    }
})
/** Home Page for a NotSignedIn identity. */
export default class LandingPageComponent {
    /** ToDo: Create `type` + `const`. */
    reason = input<'AUTO_SIGN_OUT'>();
}