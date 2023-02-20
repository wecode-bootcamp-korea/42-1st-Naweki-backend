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

* 회원가입 기능 구현
  * 필수 입력정보에서 Email, Password 정규 표현식으로 유효성 검사.
  * 유효성 검사 통과하면 Mysql Users 테이블에 유저정보 추가.
  * Node.js bcrypt library 사용하여 유저 비밀번호 암호화.

<br>

* 장바구니 기능 구현
  * 장바구니 조회 API [GET]
  * 장바구니 추가 API [POST]
  * 장바구니 업데이트 API [PATCH]
  * 장바구니 삭제 API [DELETE]

<br>

* 주문하기 기능 구현
  1. Transaction 시작.
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
