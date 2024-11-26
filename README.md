
# BYB Exam UI

The UI that uses BYB Exam API for BYB Technical Challenge.

This is an Angular project that showcases functionalities such as user authentication (login and registration), and downloading a sample inspection report. The application is built with modern web technologies including Angular, Bootstrap, and RxJS, ensuring a secured access to important files from the server.

Note, that proper styling and validations were not included in this implementation.

## Installation

1. Clone the repository:

```bash
git clone git@github.com:iamosem/bybexam-ui.git
cd bybexam-ui
```

2. Install dependencies by running

```bash
yarn install #or simply yarn
```

## Run Locally
Install dependencies

```bash
yarn
```

Start the application

```bash
yarn start
```

## Project Structure


```

src/
  app/
    auth/
      guards/
      login/
      register/
      auth-router.module.ts
    home/
    layout/
    models/
    services/
    app-routing.module.ts
    app.component.html
    app.component.scss
    app.component.spec.ts
    app.component.ts
    app.constants.ts
    app.module.ts
  assets/
  environments/
  index.html
  main.ts
  polyfills.ts
  styles.scss
  test.ts
angular.json
karma.conf.js
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```


## Potential Improvements

- Implement more input/form validations
- Add CRUD for managing Products
- Add CRUD for managing Orders
- Implement responsive styling
- Implement more authentication guards
