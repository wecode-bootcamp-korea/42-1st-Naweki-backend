![image](https://user-images.githubusercontent.com/122417190/219989077-0cfcdff0-b28b-4f87-b36a-adcd0dfea1c8.png)


# 스포츠 용품 판매 사이트 Naweki

# Naweki Goal
* 로그인 기능 구현
  * 로그인 하기 전 Email 체크하여 회원 유무 판단.
  * DB 에 존재하는 유저이면 회원가입 페이지로 이동.
  * DB 에 존재하지 않는 유저이면 로그인 페이지로 이동.
  * bcrypt library 사용하여 유저가 입력한 Password 와 DB 에 있는 암호화 되어있는 Password 비교.
  * 비밀번호 일치하면 response body 로 JWT Token 발급.

<br>

## 기능 구현

* 신혜님

  * 로그인 기능 구현
    * 필수 입력정보에서 Email, Password 정규 표현식으로 유효성 검사.
    * 유효성 검사 통과하면 Mysql Users 테이블에 유저정보 추가.
    * Node.js bcrypt library 사용하여 유저 비밀번호 암호화.

  * 제품 상세 페이지 기능 구현

  * 장바구니 기능 구현
    * 장바구니 조회 API [GET]
    * 장바구니 추가 API [POST]
    * 장바구니 업데이트 API [PATCH]
    * 장바구니 삭제 API [DELETE]

<br>

* 한재님

  * Lookup API 기능 구현
    * 유저 email 정보를 받아 DB 에 있는 유저 이메일인지 검증 한 후 존재하지 않다면
     EMAIL_IS_VERIFIED 라고 응답 메세지를 주도록 구현

  * 회원가입 기능 구현
    1. 유저 정보를 request body 로 전달 받아서 필수 정보가 누락되어있다면 <br>
    400 status code 와 함께 key err 를 응답으로 주도록 구현.
    2. 유저 입력이 적절하다면 email 과 password 유효성을 정규표현식을 이용하여 검증.
    3. email 과 password 가 유효한 상태라면 이미 가입된 유저인지 검증.
    4. 이미 가입된 유저가아니라면 회원가입이 가능한 상태이므로 bcrypt 모듈을 사용하여 유저
    비밀번호 암호화.
    5. 암호화된 비밀번호를 사용하여 DB 의 users 테이블에 유저정보 추가.

  * 제품 목록 페이지 기능 구현
    1. 제품 목록에 대한 페이지 이므로 Route 는 /products 로 설정.
    2. query string 으로 분류 할 수 있는 정보들을 입력 받아 filters 객체에 할당. <br>
      분류 가능 목록 -> category, subCategory, gender, color, limit, offset, sort
    3. filter 정보 인자로 전달하여 Service Layer 에 전달.
    4. Service Layer 에서는 유저의 filter 정보 Dao Layer 에 전달. <br>
    5. 유저가 분류하고자 하는 정보에 대해서만 where 이라는 빈 배열에 요소를 하나씩 push 하도록 구현. <br><br>

    ```javascript
    let where = []

    const { category, subCategory, gender, color, limit, offset, sort } = filter

    category ? where.push(`c.name = '${category}'`) : ''
    subCategory ? where.push(`sc.name = '${subCategory}'`) : ''
    gender ? where.push(`p.gender = '${gender}'`) : ''
    color ? where.push(`p.color = '${color}'`) : ''

    where = where.join(' AND ')
    ```
    6. 유저가 정렬을 원할때에는 sortSets 라는 객체에서 ORDER BY 에 대한 qeury 문을 조회하도록 구현.
    7. Dao 에서 가져온 정보를 Service Layer 에서 재가공.
    8. 숫자에 대한 정보는 Math.ceil() 함수 사용하여 소수점 제거.
    9. 신상품인지 검증하기 위해 isNewProduct 함수 사용. <br>
    현재 시간을 Unix timestamp 값으로 변환하고 제품이 DB 에 추가되었을 때의 시간을 Unix timestamp 값으로 변환하여
    동일한 단위로 맞춰준 후
    두 시간의 차이가 하루보다 적다면 신상품으로 분류되도록 구현. 하루보다 적다면 Products 의 isNew 키값에 true, 그렇지 않다면 false 값이 객체에 저장. <br><br>
    ```javascript
    const isNewProduct = (productCreatedTime) => {
    const currentTime = getCurrentTime()
    const productCreatedTimeInMs = new Date(productCreatedTime).getTime()

    return currentTime - productCreatedTimeInMs < ONE_HOUR_IN_MILLISECONDS
    ```
}

  * 주문하기 기능 구현
    1. Transaction 시작. <br><br>
    ```javascript
      const queryRunner = database.createQueryRunner()
      queryRunner.connect()
      queryRunner.startTransaction()
      // Do something

      // transaction 간 문제 없이 query 가 실행되었다면 실제 DB 의 데이터에 반영되도록 commit 실행.
      await queryRunner.commitTransaction()

      try {

      } catch (err) {
        // 에러가 생겼을 경우 transaction 간 실행했던 qeury 에 대해서 rollback.
        await queryRunner.rollbackTransaction()
      } finally {
        // 정상적인 실행의 try 구문과 에러가 발생한 catch 구문의 마지막에는 db 의 connection 을
        // 끊어주기 위하여 queryRUnner 에 대해서 release 실행.
        queryRunner.relase()
      }
      ```
    <br>

    2. 재고 수량 파악.
    3. Orders Table 에 데이터 추가.
    4. Order Items Table 에 데이터 추가.
    5. Order Items 합산가격으로 유저 포인트 차감.
    6. 장바구니의 수량 만큼 Product_options Table 에서 재고 차감.
    7. 유저의 장바구니에서 상품목록 삭제.
    8. Transaction 종료.

<br>


# 팀 소개

### Front-end
| 신혜린 | 이유진 | 성은정 |
| :-- | :-- | :-- |
| 로그인, 회원가입, 장바구니 | 메인, 제품 상세 페이지 | 제품 목록, 결제 |
[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/shinheylynn) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/yujinni) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/eejungee) |

### Back-end
| 이한재 | 강신혜 |
| :-- | :-- |
| 회원가입, 제품 목록 API | 로그인, 제품 상세, 장바구니 API|
[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/jayhanjaelee) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/ksh0123) |

# Team Github Repository

<!-- | Front-end | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/wecode-bootcamp-korea/42-1st-Naweki-frontend) |
| --- | --- |
| Back-end | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/wecode-bootcamp-korea/42-1st-Naweki-backend) | -->

| Front-end | Back-end |
| :--: | :--: |
[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/wecode-bootcamp-korea/42-1st-Naweki-frontend) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/wecode-bootcamp-korea/42-1st-Naweki-backend)


# Naweki ERD
![ERD](https://user-images.githubusercontent.com/122243107/219989773-306c6d8e-63a6-4172-9c99-cda2e0e1f971.png)

Naweki DB Schema 구조

* users - 유저 정보 저장 하는 테이블
  * shipping_address - 유저 배송지 저장하는 테이블

* products - 상품 목록 저장하는 테이블
  * sub_categories - 상품 서브 카테고리 저장하는 테이블
  * categories - 상품 카테고리 저장하는 테이블
  * product_images - 상품 이미지 저장하는 테이블
  * product_options - 상품 옵션 저장하는 테이블 (재고, 사이즈)

* cart - 장바구니 저장하는 테이블

* orders - 주문 내역 저장하는 테이블, 유저의 상품 정보를 담기 위해 users 와 products 테이블을 n:m 관계로 연결

* order_items - 주문 내역 저장하는 테이블
  * order_status - 상품 주문 상태 저장하는 테이블
  * reviews - 상품 리뷰 저장하는 테이블 주문 내역 있는 사용자만 리뷰 쓸수 있도록 order_items 의 order_id 와 연결


# 개발 기간
* 2023/02/06 ~ 2023/02/17 (2주)

# Tech Stack

## Front-end
|JavaScript|React|Styled</br>Component|SCSS|ESLint|Prettier|
| :--: | :--: | :--: | :--: | :--: | :-- |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://styled-components.com/logo.png" width="65" height="65" /></div> | <img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="65" height="65" /></div> |<img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"> |

<!-- | <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://styled-components.com/logo.png" width="65" height="65" /></div> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="65" height="65" /></div> | -->
## Back-end
|JavaScript|Nodejs|MySQL|Rest|
| :--: | :--: | :--: | :--: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /> |
