# Solor-monitoring-app

## Description
Solor monitoring application.

## Package structure
```
src
│   app.js          # App entry point
└───api             # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───jobs            # Jobs definitions for agenda.js
└───loaders         # Split the startup process into modules
└───models          # Database models
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
└───types           # Type declaration files (d.ts) for Typescript
└───web             # front-end files
```

## Installation
```
$ npm install
```

## Run
```
$ cd src
$ node app
```

## Others
테스트 도구
```
$ npm install --save-dev mocha

계정 : sysAdmin // 1234
```

## Page Description
JS
└───localDistrict
    └───지역지구 분석
        └─── 소유 및 기타정보 [ 국가공간 - 토지소유정보속성조회 REST API ]
        └─── 소유 및 기타정보 [ 국가공간 - 개별공시지가속성조회 REST API ]
        └─── 건축물 정보 [ 공공데이터포털 - 국토교통부_건축물대장 표제부 조회 ]
        └─── 지역지구/가능여부/조건·제한·예외사항 조회하기
└───landType
    └─── 토지유형
        └─── 토지이동이력속성 조회하기
└───lawData
    └─── 조례정보
        └─── 국가법령정보(조례정보 목록-법규ID)
        └─── 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준

ROUTER
└───localDistrict

└───landType

└───lawData
