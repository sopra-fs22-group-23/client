# SOPRA group 23

### Introduction
**Wevent** is an interactive Event planning tool.  Thereby, Wevent enables its customers to create and engage in live Event planning sessions with their friends or colleagues. In these sessions invited Users can decide what task each individual has to perform. Additionally, what makes Wevent special is that it has the dimension of public and private events. For Private Events only invited Users can take part in the event planning session. However, for Public events, every registered user can take part in the event planning session and unregistered Users can see the event details. Other special features that we added is a Google Maps interface of all the location of public events as well as your specific private event and an Email Notification system.

### Technologies
The technologies that we used were npm and react. Thereby, we implemented the code in the languages JavaScript, CSS, and HTML. Additionally, we implemented the google maps API.

### High-level Components
**_TODO_: needs to be added**

### Launch and Deployment

This repository can be downloaded via Github. We used npm to manage dependencies.

#### Install
```
./npm install
```
This can be used to search and install any missing dependencies. 
#### Run
```
./npm run dev
```
Runs the app in the development mode. It should open the webpage automatically otherwise you can find it under: [http:localhost:3000](http://localhost:3000). 
If you apply edits the page will automatically reload.
#### Test
```
./npm run test
```
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.
#### Build
```
./npm run build
```
Builds the app for production to the build folder. It's now ready to be deployed. See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### Illustration (_Maybe add some images_)
Lets show how the Application works by giving a work through of the main functionalities. The following main steps have to be performed:
1. Login or Register page. Additionally, this `landing page` includes an integrated google map where all public events are located.
2. After one has Logged in or registered, one comes to their personal overview page. This page includes all public events and private events for this specific user.
3. One can create an event by clicking on the create Event button.
4. After adding the event details the user navigates through the invitation pages of the guests and collaborators.
5. After the event is created the Event overview page is shown
6. Before the interactive session can be started, the user has to add tasks that relate to the event.
7. Then the session can be started, and every invited user can take part. During this session the the tasks can be assigned.
After this quick step through of how to create and plan an event, a further functionality is the user profile page. This page includes all the user detail and the events with their corresponding  tasks the specific user has.

### Roadmap
The four main features that can be added are the following:
1. Making the application mobile responsive. At the moment the application is optimized for Computer usage. However our users may also want to use their mobile devices to access the application. Therefore it would be preferable to give them an optimized version of the sytem.
2. Limit the number of guest for a specific event. For a specific public or private event it may be helpful to limit the number of user that can access or join the event.
3. Implement an external API to link the Dates of the event with the local calendar. This is helpful as it gives the user more flexibility of how he or she wants to get informed for a specific event taking place.
4. Making the map only loaded the events that are in a certain view. At the momemnt, the application is loading all of the active events. However if there are to many events, this could potentially reduce the performance of this functionality. Therefore one should in the future only load those Events that are in a certain area.

### Authors and acknowledgment
The authors of this Application are the UZH SoPra Group 23:
- Adam Bauer
- Mark Düring
- Wesley Müri
- Paolo Tykko
- Kai Zinnhardt

Further aknowledgements go to:
- Samuel Brügger (TA)
- Tomas Fritz, Prof. Dr.


### [License](https://github.com/sopra-fs22-group-23/client/blob/master/LICENSE) &copy;

# Old version, needs to be deleted!!!


# Getting Started with Create React App 2
![Deployment](https://github.com/sopra-fs22-group-23/client/actions/workflows/deploy.yml/badge.svg)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
