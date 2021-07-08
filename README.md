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
+ ~~Log In~~
    + ~~JWT~~
    + ~~AuthUser, context~~
    + ~~AuthGuard and AuthGuard Decorator~~
+ ~~Edit Profile~~
+ ~~Verify Email~~
+ ~~Delete Account~~
+ Log Out(Should be Working in Apollo Client LocalStorage)
+ [Crossfiter]Subscription to affiliatedBox Coach that have an authorization to invite to the box 

### :bald_man: MyPage
+ ~~CRUD User Profile~~
+ ~~CRUD Leader Board~~
+ ~~CRUD Board of Record~~
+ ~~Hold~~
    + ~~Count~~
    + ~~History~~

### :bricks: Box
+ ~~Relation with User~~
+ ~~Relation with Wod~~
+ ~~Relation with Board of Record(Box -> Wod -> Bor)~~
+ ~~Relation with Leader Board~~
+ ~~Hold and Free Trial system~~
+ Notice
+ Comment
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
+ ~~Create Board of Record~~
+ ~~Read Board of Record~~
    + ~~Main(all users)~~
    + ~~Mypage(only mine)~~
+ ~~Edit Board of Record~~
+ ~~Delete Board of Record~~

### :trophy: Leader Board
+ ~~constants of 1RM~~
+ ~~constants of Named WODs~~
+ ~~Create 1RM and Named WODs~~
+ ~~Read 1RM and Named WODs(Both Main(all users) and Mypage(only mine))~~
+ ~~Edit 1RM and Named WODs~~
+ ~~Delete 1RM and Named WODs~~

### :stop_sign: Hold System
+ ~~Register Hold~~
+ ~~Read Holds(Both Main(all users) and Mypage(only mine))~~
    + ~~Main(all users) orerby holdAt~~
    + ~~Mypage(only mine) orerby holdAt~~
+ ~~Delete Hold~~

### :tickets: Free Trial System
+ ~~Create Free Trial~~
+ ~~Read Free Trials~~
+ ~~Delete Free Trial~~

### :loudspeaker: Notice
+ ~~Create Notice~~
    + ~~Only Coach Authorization~~
+ ~~Read Notice~~
+ ~~Edit Notice~~
+ ~~Delete Notice~~
+ Relationship with Comment

### :left_speech_bubble: Comment(early on Notice, then goin to apply on other Components)
+ ~~Relationship with Notice(ManyToOne)~~
+ ~~Relationship with User(ManyToOne)~~
+ ~~Relationship with Reply(OneToMany)~~
+ ~~Create Comment~~
+ ~~Read Comment~~
+ ~~Edit Comment~~
+ ~~Delete Comment~~

### :arrow_right_hook: Reply(early on Notice, then goin to apply on other Components)
+ Relationship with Notice(ManyToOne)
+ Relationship with User(ManyToOne)
+ Create Reply
+ Read Reply
+ Edit Reply
+ Delete Reply

### :heart: Like(early on Wod, then goin to apply on other Components)
+ ~~Relationship with Wod(ManyToOne)~~
+ ~~Relationship with User(ManyToOne)~~
+ ~~Create Like  On Wod~~
+ ~~Read Like On Wod~~
+ ~~Cancel Like  On Wod~~

### :date: TimeTable
+ Upload TimeTable Iamge(Working in FrontEnd)

### :speech_balloon: Chat



