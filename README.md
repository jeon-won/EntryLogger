# EntryLogger

전산실 출입대장을 전산화 해보기 위해 만들어 본 Next.js 프로젝트.


## 사용한 솔루션

* Next.js 15.1.0
* MongoDB 8.0.4


## 프로젝트 구조

### @/

`docker-compose.yaml`: MongoDB 도커 이미지 빌드용 파일. 

  * 이 yaml 파일 경로에서 `docker compose up -d` 명령어 실행하면 빌드 및 컨테이너 실행됨
  * 보통 DB는 도커로 구축하지 않는다고 하지만... 그냥 해봄

`.env` 파일엔 아래 상수 값이 들어가야 함.

```env
APP_NAME=
MONGODB_IP=
MONGODB_PORT=docker-compose.yaml 파일의 ports 값과 일치해야 함
MONGODB_ID=docker-compose.yaml 파일의 MONGO_INITDB_ROOT_USERNAME 값과 일치해야 함
MONGODB_PASSWORD=docker-compose.yaml 파일의 MONGO_INITDB_ROOT_PASSWORD 값과 일치해야 함
MONGODB_DB_NAME=
MONGODB_COLLECTION_NAME=
```

### @/app

`layout.js`: 모든 컴포넌트의 상위에 위치하는 컴포넌트

  * `@/_components/navMenu.js`: 상단 네비게이션 바

`page.js`: 메인 페이지
  * `@/_components/entryForm.js`: 출입이력을 입력 받는 컴포넌트
    - `@/_components/infoModal.js`: 개인정보 수집 및 이용에 대한 안내 모달 컴포넌트
  * `@/_components/entryTodayList.js`: 오늘의 출입이력을 DB에서 가져오는 컴포넌트
    - `@/_components/entryTodayListTable.js`: 오늘의 출입이력을 보여주는 테이블 컴포넌트


### @/app/list

`page.js`: 출입이력 조회 페이지

  *  `@/_components/searchBar.js`: 검색조건(query)를 입력 받는 컴포넌트
  *  `@/_components/entryListTable.js`: 검색조건(query)에 맞게 출입이력을 보여주는 컴포넌트


### @/_util

* `database.js`: MongoDB 접속 모듈
* `insertDocument.js`: 출입이력을 DB에 저장하는 모듈
* `insertExitTime.js`: 퇴실시간을 DB에 저장하는 모듈
* `selectDocument.js`: 검색조건(query)을 사용하여 DB에서 데이터를 꺼내오는 모듈