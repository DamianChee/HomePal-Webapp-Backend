# HomePal Backend

API Endpoints

## Status

| Method | URL        | Description                                        |
| ------ | ---------- | -------------------------------------------------- |
| `GET`  | `/status/` | Retrieve current status of connection to firebase. |

## Beds

| Method | URL                             | Description                                  |
| ------ | ------------------------------- | -------------------------------------------- |
| `GET`  | `/beds/`                        | Retrieve all beds.                           |
| `GET`  | `/beds/id/FAC001-WRD001-BED001` | Retrieve bed id: FAC001-WRD001-BED001.       |
| `GET`  | `/beds/assigned/true`           | Retrieve all assigned beds.                  |
| `GET`  | `/beds/occupied/true`           | Retrieve all occupied beds.                  |
| `GET`  | `/beds/wardid/FAC001-WRD001`    | Retrieve all beds in ward id: FAC001-WRD001. |
| `GET`  | `/beds/wardnumber/1`            | Retrieve all beds in ward number: 1.         |

## Devices

| Method | URL                      | Description                     |
| ------ | ------------------------ | ------------------------------- |
| `GET`  | `/devices/`              | Retrieve all devices.           |
| `GET`  | `/devices/id/RP42A00001` | Retrieve device id: RP42A00001. |
| `GET`  | `/devices/status/online` | Retrieve all online devices.    |

## Events

| Method | URL                           | Description                                     |
| ------ | ----------------------------- | ----------------------------------------------- |
| `GET`  | `/events/`                    | Retrieve all events.                            |
| `GET`  | `/events/id/RP42A00001`       | Retrieve event id: RP42A00001-EVT1731435178003. |
| `GET`  | `/events/deviceId/RP42A00001` | Retrieve all events from device id: RP42A00001. |
| `GET`  | `/events/handled/true`        | Retrieve all events that has been handled.      |
| `GET`  | `/events/action/Bedside-Fall` | Retrieve all Bedside-Fall events.               |

## Facilities

| Method | URL                                 | Description                                           |
| ------ | ----------------------------------- | ----------------------------------------------------- |
| `GET`  | `/facilities/`                      | Retrieve all facilities.                              |
| `GET`  | `/facilities/id/FAC001`             | Retrieve facility id: FAC001.                         |
| `GET`  | `/facilities/name/Location1`        | Retrieve all facilities with name: Location1.         |
| `GET`  | `/facilities/organizationid/ORG001` | Retrieve all facilities from organization id: ORG001. |
| `GET`  | `/facilities/type/Nursing Home`     | Retrieve all facilities with type: Nursing Home.      |
| `GET`  | `/facilities/contact/12345678`      | Retrieve all facilities with contact point: 12345678. |

## Organizations

| Method | URL                                  | Description                                              |
| ------ | ------------------------------------ | -------------------------------------------------------- |
| `GET`  | `/organizations/`                    | Retrieve all organizations.                              |
| `GET`  | `/organizations/id/ORG001`           | Retrieve organization id: ORG001.                        |
| `GET`  | `/organizations/name/Nursing Home A` | Retrieve all organizations with orgName: Nursing Home A. |
| `GET`  | `/organizations/contact/12345678`    | Retrieve all organizations with contact point: 12345678. |

## Patients

| Method | URL                                         | Description                                                     |
| ------ | ------------------------------------------- | --------------------------------------------------------------- |
| `GET`  | `/patients/`                                | Retrieve all patients.                                          |
| `GET`  | `/patients/id/FAC001-PAT001`                | Retrieve patient with id: FAC001-PAT001.                        |
| `GET`  | `/patients/name/Resident A`                 | Retrieve all patients named Resident A.                         |
| `GET`  | `/patients/gender/Female`                   | Retrieve all patients with gender: Female.                      |
| `GET`  | `/patients/activitylevel/Moderately Active` | Retrieve all patients with activityLevel: Moderately Active.    |
| `GET`  | `/patients/assistancelevel/Independent`     | Retrieve all patients with assistanceLevel: independent.        |
| `GET`  | `/patients/diaper/false`                    | Retrieve all patients that do not require diaper.               |
| `GET`  | `/patients/restraints/false`                | Retrieve all patients that do not require restraints.           |
| `GET`  | `/patients/mobility/Ambulant`               | Retrieve all patients with mobility: Ambulant.                  |
| `GET`  | `/patients/bedexitalerts/true`              | Retrieve all patients with Bed Exit Alerts turned on.           |
| `GET`  | `/patients/attemptedbedexitalerts/true`     | Retrieve all patients with Attempted Bed Exit Alerts turned on. |
| `GET`  | `/patients/bedsidefallalert/true`           | Retrieve all patients with Bedside Fall Alert turned on.        |

## Wards

| Method | URL                        | Description                                     |
| ------ | -------------------------- | ----------------------------------------------- |
| `GET`  | `/wards/`                  | Retrieve all wards.                             |
| `GET`  | `/wards/id/FAC001-WRD001`  | Retrieve wards with id: FAC001-WRD001.          |
| `GET`  | `/wards/facilityid/FAC001` | Retrieve all wards in facility with id: FAC001. |

## Acknowledgements

- [HomePalSG](https://www.homepalsg.com/)
- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
- [Phind](https://www.phind.com/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/)
- [Stackoverflow](https://stackoverflow.com/)
