# Project Name
TravelBID

## Description
TravelBID is an open platform enabling users to offer and find short stay accommodation around the world. Accomodation seekers are able to post offers indicating stay duration, location, and budget. Accommodation providers can see all offers posted by seekers and bid in order to provide the service.

## MVP
- **Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **Sign up** - As a user I want to sign up on the webpage so that I can use the services provided
- **Login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **MyOffers list** - As a user I want to see all the offers I have created on the platform
- **MyBids list** - As a user I want to see all bids I have made on the platform 
- **Offer create** - As a user I want to be able to create new offers whenever I want 
- **Bid create** - As a user I want to be able to bid on the offers I find interesting 
- **Accept Bids** - As a user I must have the power to accept bids others have made on my offers.
- **Reject Bids** - As a user I should be able to reject bids made on my offers.
- **Offer detail** - As a user I want to see the details of the offers I have created, including the bids that other users have made on it.
- **Bid detail** - As a user I want to see the details of my own bids. Also the details of other bids that are competing with mine. 
- **Update My Bids&Offers** - As a user I must be able to edit and update all my created offers and bids
- **Delete My Bids&Offers** - As a user I must be able to delete the offers and bids I have created.
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

## Backlog
List of other features outside of the MVPs scope

#### User profile:
- see my profile
- Update profile
- Upload my profile picture
- see other users profile

#### Geo Location:
- See Bids locations
- View all bids for one offer on the map

#### Social Login
- Facebook

#### Private Messages
- User can send and receive private messages

#### Confirmation email
- Users receive confirmation emails when signing up, and when their offers and bids are accepted or rejected

#### Push Notifications
- Users receive live notifications when:
  - Receiving private messages
  - When a new offer is placed in their city
  - When one of their offers or bids is accepted or rejected
  - When a new bid is made on one of their offers


#### Favorites
- Users can save their favorite offers and bids


#### Ratings
- Users can rate other users

#### Responsive Design
- Make app responsive for deskop

  
# Client

## Pages

| url | public | Functionality |
|-----|-------|---------------|
| `/` | true | landing page |
| `/signup` | true | Signup user |
| `/login` | true | login user |
| `/dashboard` | false | user dashboard |
| `/search` | false | profile of user |
| `/offer/id` | false | profile of user |
| `/bid/id` | false | profile of user |
| `/room/id` | false | profile of user |
| `/profile` | false | profile of user |


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous

- Offer Service
  - Offer.list()
  - Offer.search(terms)
  - Offer.create(data)
  - Offer.detail(id)
  - Offer.addFavorite(id)
  - Offer.removeFavorite(id)

- Bid Service
  - Bid.list()
  - Bid.search(terms)
  - Bid.create(data)
  - Bid.detail(id)
  - Bid.addFavorite(id)
  - Bid.removeFavorite(id)
  
- Room Service
  - Room.list()
  - Room.update(data)
  - Room.create(data)
  - Room.detail(id)

- User Service
  - User.update(data)
  - User.detail(id)



# Server

## MODELS

#### User Model
```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '', required: true },
  age: { type: Number, default: '' },
  gender: { type: String, default: '' },
  description: { type: String, default: '' },
  userImage: { type: String },
}, { timestamps: true });
```


#### Bid Model
```javascript
{
  userID: {
    type: ObjectId,
    ref: 'User',
  },
  offerID: {
    type: ObjectId,
    ref: 'Offer',
  },
  roomID: {
    type: ObjectId,
    ref: 'Room',
  },
  bidValue: {
    type: Number,
  },
  bidDescription: {
    type: String,
  },
  Status: {
    type: Number,
    default: 0,
  },
  accomodationImage: {
    type: String,
  },
}, { timestamps: true });
```
#### Room Model
```javascript
{
  userID: {
    type: ObjectId,
    ref: 'User',
  }, 
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  facilities: [
    privateRoom: { type: String },
    sharedRoom: { type: String },
    entireProperty: { type: String },
    tv: { type: String },
    wifi: { type: String },
    air: { type: String },
    garage: { type: String },
    termo: { type: String },
    whaser: { type: String },
    pool: { type: String },
    privateBathroom: { type: String },
    wheelchair: { type: String },
    smoke: { type: String },
    pet: { type: String },
    couples: { type: String },
    accomodationDescription: { type: String },
    accomodationImage: { type: String },
  ],
}, { timestamps: true });
```


#### Offer Model
```javascript
{
  userID: {
    type: ObjectId,
    ref: 'User',
  },
  image: { type: String },
  from: { type: Date },
  until: { type: Date },
  location: { type: String, uppercase: true },
  budget: { type: Number },
  Status: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });
```

## API Endpoints (backend routes)

### Index Router
| Description        | Method                  | Test Text     |
| :---               |    :----:               |          :---:|
| api'/’             | GET           | Renders homepage with service info and login & signup buttons |
| api/login          | POST    | Authenticates |
| api/signup         | POST    | Authenticates |

### Dashboard Router
| Description        | Method                  | Test Text     |
| :---               |    :----:               |          :---:|
| api/dashboard      | GET | Renders user start page, showing open offers and bids. |
| api/dashboard/q    | GET | Renders list of offers matching query string |


### Offer Router
| Description           | Method                  | Test Text     |
| :---                  |    :----:               |          :---:|
| api/offer/:ID         | GET  | Renders info for a specific offer and the bids made on it. |
| api/offer             | POST | Renders create form and posts to DB. |
| api/offer/:ID         | PUT  | Renders update form and posts update. |
| api/offer/:ID         | DELETE  | Renders update form and posts update. |


### Bid Router
| Description        | Method                  | Test Text     |
| :---               |    :----:               |          :---:|
| api/bid/:ID        | GET    | Renders bid info / Accept / reject button || Update button || Only info|
| api/bid            | POST   | creates new BID (Required: Offer ID)
| api/bid/:ID        | PUT    | Renders update form and updates DB |
| api/bid/:ID        | DELETE | Renders update form and updates DB |

### User Router
| Description           | Method                  | Test Text     |
| :---                  |    :----:               |          :---:|
| api/user/:ID          | GET   | Renders info for a specific offer and the bids made on it. |
| api/user/:ID          | PUT   | Renders update form and posts update. |


### Room Router
| Description         | Method                  | Test Text     |
| :---                |    :----:               |          :---:|
| api/room/:ID        | GET  | Room info |
| api/room            | POST | Renders create form and posts to DB. |
| api/room/:ID        | PUT  | Renders update form and posts update. |

## Tech Challenges
- Geo Maps
- Private messages
- Push Notifications
  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/FU3XOPef/travelbid)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Mauricio-xxi/TraveBidReact)

[Server repository Link](https://github.com/Mauricio-xxi/TravelBidApi)

[Deploy Link Backend](http://heroku.com)

[Deploy Link Frontend]()

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/margal/travelbid/edit)
