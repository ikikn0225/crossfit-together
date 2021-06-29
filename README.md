# crossfit-together-backend :weight_lifting_man:
> CrossFit is also meant to keep the body healthy, but at the same time, to have a good relationship with others. The project can manage CrossFit exercise records, share records with people in the box, and allow them to feel a sense of belonging, thereby helping them with physical health and emotional stability.

## :hammer_and_wrench: Skill Spec
+ NodeJS FrameWork - NestJS
    + reason to choose -
+ Graphql Server - Apollo Server
    + reason to choose - 
+ Database - PostgreSQL
    + reason to choose - 
+ Language - Typescript
    + reason to choose - 

## :memo: Development Log
### :curly_haired_man: User
+ User Model
    + Common
        + id
        + created_at
        + updated_at
    + Particular
        + name
        + email
        + password
        + role
        + affiliated
        
### :hammer: User CRUD
+ ~~Create Account~~ **profile image soon**
+ Log In
    + ~~JWT~~
    + ~~AuthUser, context~~
    + ~~AuthGuard and AuthGuard Decorator~~
+ ~~Edit Profile~~
+ ~~Verify Email~~
+ ~~Delete Account~~
+ Log Out
+ [Crossfiter]Subscription to affiliatedBox Coach that have an authorization to invite to the box 

### :bald_man: MyPage

### :bricks: Box
+ ~~Relation with User~~
+ ~~Relation with Wod~~
+ Relation with Board of Record
+ Relation with Leader Board
+ Hold and Free Trial system
+ ~~Create Box~~
+ ~~Delete Box~~
+ Edit Box(change main image) - process on frontend part

### :clipboard: Wod
+ ~~Relation with Box~~
+ ~~Create Wod~~
+ ~~Read Wod~~
+ ~~Edit Wod~~
+ ~~Delete Wod~~

### :file_folder: Board of Record
+ Create Board of Record
+ Read Board of Record
+ Edit Board of Record
+ Delete Board of Record

### :trophy: Leader Board

### :stop_sign: Hold System

### :tickets: Free Trial System
