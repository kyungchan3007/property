# 🧱 프로젝트 정보 (Project Overview)

## 📌 프로젝트명 (Project Name)
**Property_project (PinBot.AI)** — 부동산 실거래가·학군·지하철 기반 맞춤형 챗봇 서비스  

> 부동산 데이터를 실시간으로 제공하고,  
> 사용자의 질의(예: “매탄힐스테이트 시세 알려줘”)를 AI가 해석해  
> 자연스럽게 대화로 답변하는 **설치형 Next.js + OpenAI 챗봇 프로젝트**

---

## 🎯 프로젝트 목적 (Project Goal)
이 프로젝트를 통해 달성하고자 하는 목표

- 부동산 관련 데이터(시세, 학군, 지하철, 주변 편의시설 등)를 AI 챗봇으로 쉽게 조회  
- 매물, 시세, 학군, 대출 등 다양한 부동산 정보에 대한 자동 응답 기능 제공  
- ChatGPT(OpenAI API)를 Next.js 프론트엔드에 직접 연동하는 설치형 구조 제공  
- React Query + Zustand 기반 상태 관리로 대화 히스토리 및 로딩 상태 효율적으로 처리  
- 향후 국토부 실거래가 API / 공공데이터포털 API 연동을 위한 확장 구조 마련  

---

## ⚙️ 기술 스택 (Tech Stack)

### 🧩 **Frontend**
- **Next.js (App Router)** — 서버 액션 및 Route Handler 기반 API 구성  
- **TypeScript** — 정적 타입 안정성 확보  
- **React Query** — GPT 요청 캐싱 및 비동기 상태 관리  
- **Zustand** — 대화 히스토리, 로딩 상태 등 클라이언트 상태 관리  
- **TailwindCSS** — 유틸리티 기반 디자인 시스템  
- **Lucide-react** — 아이콘 컴포넌트 관리  
- **class-variance-authority (CVA)** — 공통 UI Variant 관리  
- **Framer Motion** — 메시지 전환 및 애니메이션 처리  

---

### 🤖 **AI / API**
- **OpenAI API (gpt-4o-mini / gpt-5-nano)**  
  - 부동산 전문 시스템 프롬프트(PROMPT_RULES) 적용  
  - 대화형 API Route(`/api/chat`) 구현  
  - Prompt 규칙 기반으로 **BASE**, **POLICY** 등 응답 모드 분리  

---

### 🛠️ **Tools & Workflow**
- **ESLint / Prettier** — 코드 일관성 유지  
- **Vercel** — 클라우드 배포 및 환경 변수 관리  
- **GitHub Projects + Issue Template** — 프로젝트 이슈 관리 자동화  

---

## 📂 프로젝트 구조 (예시)
```bash
src/
 ├─ app/
 │   └─ api/
 │       └─ chat/route.ts          # GPT 통신 API Route (Next.js Server Actions)
 │
 ├─ features/
 │   └─ chatbot/
 │       ├─ ui/ChatHistory.tsx     # 개별 메시지 렌더링 컴포넌트
 │       ├─ ui/SumitButton.tsx     # 입력창 및 전송 버튼
 │       ├─ model/userChatBot.ts   # HistoryMessage 타입 정의
 │       ├─ model/promptRules.ts   # 프롬프트 규칙 (BASE / POLICY)
 │       ├─ hooks/useChatAI.ts     # GPT 연동 커스텀 훅
 │       └─ lib/detectPromptType.ts# 입력 분석 로직
 │
 ├─ widgets/
 │   └─ ChatbotUI/
 │       └─ page.tsx               # 메인 챗봇 UI 페이지 구성
 │
 ├─ shared/
 │   ├─ store/ui.store.ts          # UI 상태 관리 (사이드바, 모달 등)
 │   └─ ui/button/                 # Button Variants 관리


# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 배포
vercel --prod

