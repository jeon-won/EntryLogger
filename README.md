# EntryLogger

전산실 출입대장을 전산화 해보기 위해 만들어 본 Next.js 프로젝트.


## 사용한 솔루션

* Next.js 15.1.0
* MongoDB 8.0.4


## Next.js 프로젝트 구조

### @/

`.env` 파일엔 아래 상수 값이 들어가야 함.

```env
MONGODB_IP=
MONGODB_PORT=
MONGODB_ID=
MONGODB_PASSWORD=
MONGODB_DB_NAME=
MONGODB_COLLECTION_NAME=
```

### @/app

* `layout.js`
  * `@/_components/navMenu.js`: 상단 네비게이션 바
  * `page.js`: 메인 페이지
    + `@/_components/entryForm.js`: 출입이력을 입력 받는 컴포넌트
      - `@/_components/infoModal.js`: 개인정보 수집 및 이용에 대한 안내 모달 컴포넌트
    + `@/_components/entryList.js`: 출입이력을 DB에서 가져오는 컴포넌트
      - `@/_components/entryListTable.js`: 출입이력 테이블 컴포넌트

### @/pages/api

* `insert.js`: DB에 출입이력 저장
* `update.js`: DB에 저장된 출입이력 수정

