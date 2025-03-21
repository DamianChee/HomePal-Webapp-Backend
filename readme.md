# HomePal Backend

API Endpoints

# How to run

Download/clone the repo somewhere, open in VSCODE, open terminal and
use "npm run start" to start a local server.

# Description

You can add the following API endpoints to the URL: https://homepal-webapp-backend.vercel.app/ to see the results.

For example: https://homepal-webapp-backend.vercel.app/api/status/
For example: https://homepal-webapp-backend.vercel.app/beds/

## API & Status

| Method | URL            | Description                                        |
| ------ | -------------- | -------------------------------------------------- |
| `GET`  | `/api/status/` | Retrieve current status of connection to firebase. |


## Events

| Method | URL                           | Description                                     |
| ------ | ----------------------------- | ----------------------------------------------- |
| `GET`  | `/events/`                    | Retrieve all events.                            |
| `GET`  | `/events/id/event_id`       | Retrieve event id {event_id}.                     |
| `GET`  | `/events/handled/true`        | Retrieve all events that has been handled.      |
| `GET`  | `/events/action/Bedside-Fall` | Retrieve all Bedside-Fall events.               |


## Acknowledgements

- [HomePalSG](https://www.homepalsg.com/)
- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
- [Phind](https://www.phind.com/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/)
- [Stackoverflow](https://stackoverflow.com/)
