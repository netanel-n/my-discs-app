# My Discs App

## Instructions
1. Run `npm i`.
2. Run `ng serve -o`.
3. Press `Sign In` in Menu\Header.

## For Hadar
- Tested in `Chrome v129` - `Windows` - `1920 x 920` - `Desktop` - `@angular/cli@18.2.5`.
- I made a use of new features, some might not work for you.
- In the test, section 1.4 - A component for a row, In Angular MD, Is not allowed.
- The `*` in `package.json` is only for this demo.
- Timeframe 26/09 12:30+- => 26/09 20:00+-, 27/09 10:30+- => 27/09 18:00+- | Almost one day.
  - 28/09 19:00+- => 28/09 03:00+- | Almost half a day.
  - 29/09 20:30+- => 29/09 04:30+- | Almost half a day.

## ToDo
- In Home Page: Apply a radio button strategy in the filter area.
 - Add a scroll, height, StickyHeader to the table.
 - Put SearchQuery to url, for convenience.
- Display App name in title + header.
- Rename a few pages as their title.
- Add a nice FavIcon.
- Keep in .gitignore only what necessary + ReOrganize + Ignore sensitive info.
- Implement a state with `NgRx`. We do have now `signals` :]
- Implement a translation with `@angular/localize`.
- Implement an `injection tokens` for `auth.service.ts`, in a few forms, for an encapsulation.
- Make a separate file: `_variables.scss`, `_base.scss`.
- Implement Tests.
- Bring back `src/app/app.component.spec.ts`, deleted by an accident.
- Display error messages.
- Auto SignOut when an error occur in a network call.
- Create a `requestInterceptor` with an auto `BlockUI`.
- Spotify: Is it a good npm package: `@spotify/web-api-ts-sdk`, Is it a good type: `NewReleases` ?
- Spotify: HowTo return a specific columns only. For performance.
- Spotify: HowTo return data in a `lowerCamelCase` convention.
- Instead of `getTitle()`, subscribe to route changes. 
- RegEx: More QA.
- RegEx: Put in Patterns instead of Functions...
- RegEx: Make a Service for Validations.
- Add `Guards`.