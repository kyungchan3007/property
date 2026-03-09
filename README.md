## 개요

- **프로젝트 유형**: 한국 부동산 질의응답에 특화된 Next.js(App Router) 기반 챗봇 웹 애플리케이션
- **주요 런타임**: React 19, Next.js 16, TypeScript
- **상태/데이터 흐름**: UI/세션 상태는 Zustand로 관리하며, 네트워크 요청은 feature 단의 gateway 패턴으로 분리
- **모노레포 구성**: npm workspaces를 사용하며, `packages/chat-core`에서 챗봇 공통 도메인 로직 제공

## 최상위 구조

- `app/`: Next.js 진입점 및 API 라우트(`/api/chat`)
- `src/features/chatbot/`: 챗봇 핵심 UI 및 모델 로직
- `src/widget/ui/chatPanel/`: 페이지 수준 화면 조합 컴포넌트
- `packages/chat-core/`: 프롬프트, 메시지 타입, 팩토리 유틸
- `propertyInfo/`: 향후 데이터 연계를 위한 부동산 통계 엑셀(`.xls`) 자료

## 아키텍처 메모

### 1. UI 구성

- `app/page.tsx`가 페이지 루트이며 `ChatbotUI`를 렌더링
- `ChatbotUI`는 `messages`, `input`, `isLoading` 등 화면 상태와 스크롤 동작을 관리
- 입력 및 전송 동작은 `SumitButton` 컴포넌트로 위임되어 있음  
  - 현재 코드 기준 오타가 유지된 상태

### 2. 세션 처리

- `BrowserSessionGateway`가 브라우저 스토리지에서 세션 ID를 조회하거나 새로 생성함(UUID)
- `useChatSession`이 Zustand 스토어(`useSessionIdStore`)에 세션 ID를 1회 주입함

### 3. 요청 흐름

- `useChatSubmit` 훅이 사용자 메시지와 어시스턴트 메시지를 생성하고 `sendChat`을 호출
- `useChatAI`는 `HttpChatGateway`를 통해 `/api/chat`으로 POST 요청 전송
- 서버 라우트(`app/api/chat/route.ts`)는 OpenAI Responses API를 호출해 `message`, `thread_id`를 반환

### 4. 공통 도메인 패키지

- `packages/chat-core`는 다음 항목을 export함
  - 프롬프트 규칙 및 입력 기반 프롬프트 타입 판별
  - 요청 메시지 변환 유틸
  - 사용자/어시스턴트/에러 메시지 생성 팩토리
- 앱에서는 해당 패키지를 `pinhouse-chat` 이름으로 import하여 사용 중

## 장점

- UI, 도메인 훅, 전송 계층(gateway)의 분리가 명확함
- 세션 처리 추상화가 단순해 테스트 및 확장에 유리함
- 프롬프트 규칙이 UI에서 분리되어 재사용성이 좋음
- gateway 인터페이스 기반 구조라 향후 API 공급자 교체에 대응하기 쉬움

## 확인된 리스크 및 이슈

### 1. ESLint 설정 실행 오류

- `npm run lint` 실행 시 `eslint.config.mjs`에서 ESM 환경과 맞지 않는 `require` 사용으로 실패

### 2. 빌드 시 폰트 네트워크 의존성 이슈

- `npm run build` 실행 시 `app/layout.tsx`의 Google Fonts(`Geist`, `Geist Mono`) fetch 실패로 빌드 중단

### 3. 네이밍 및 일관성 부채

- `SumitButton` 오타 존재
- 네이밍 규칙이 일부 혼재되어 있음
- 비어 있거나 사용 흔적이 약한 파일이 존재할 가능성 있음

### 4. 패키지 명칭 불일치 가능성

- 내부 패키지 메타데이터는 `@kyungchan3007/pinhouse-chat`
- 앱 내부 import는 `pinhouse-chat` 사용 중
- 현재 설정 의존성이 크며, 환경에 따라 해석 문제가 발생할 수 있음

### 5. API 검증 강건성 부족

- `/api/chat`에서 `promptType` 등 요청 본문에 대한 스키마 검증이 없음

## 권장 후속 작업

1. ESLint flat config를 ESM 방식(`import`)으로 정리
2. Google Fonts 런타임 fetch 의존성을 줄이고 로컬 또는 대체 폰트 전략 적용
3. `/api/chat` 요청 스키마 검증(zod 등) 및 에러 타입 안정성 강화
4. `SubmitButton` 등 네이밍 표준화 및 미사용/빈 모듈 정리
5. `packages/chat-core`에 프롬프트 판별 및 메시지 팩토리 단위 테스트 추가

## 본 분석에서 수행한 검증

- `npm run lint` 실행 결과: 실패  
  - 원인: ESM 환경에서 `require` 사용
- `npm run build` 실행 결과: 실패  
  - 원인: Next font 단계에서 Google Fonts 네트워크 fetch 오류
