# Weeth-FE

대학 동아리 관리 플랫폼 프론트엔드 (React 18 + TypeScript + Vite)

## 빌드 및 실행

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드 (build/)
npm run preview      # 빌드 결과 미리보기
npm test             # Jest 테스트 실행
```

## 프로젝트 구조

```
src/
├── api/              # API 통신 (axios 인스턴스, 기능별 API)
│   └── admin/        # 관리자 API (attendance, dues, member, penalty)
├── components/       # React 컴포넌트 (기능별 분류)
│   └── common/       # 공통 컴포넌트 (PrivateRoute, Loading 등)
├── constants/        # 상수 (queryKeys.ts 등)
├── hooks/            # Custom hooks
│   ├── queries/      # React Query 조회 hooks
│   └── mutation/     # React Query 변경 hooks
├── Layout/           # 레이아웃 (ResponsiveLayout, FixedLayout 등)
├── pages/            # 페이지 컴포넌트
│   └── admin/        # 관리자 페이지
├── routes/           # 라우팅 설정 (route.tsx)
├── stores/           # Zustand 상태 관리
├── styles/           # 스타일 (theme.ts, designTokens.ts)
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```

## 기술 스택

- **Core**: React 18.3, TypeScript 5.6, Vite 5.4
- **상태 관리**: Zustand (UI 상태) + React Query (서버 상태)
- **스타일링**: styled-components, MUI
- **API**: Axios (인터셉터로 토큰 자동 갱신)
- **라우팅**: React Router v6
- **테스트**: Jest + Testing Library

## 코딩 컨벤션

### 파일 명명
- 컴포넌트: `PascalCase.tsx` (예: `Attendance.tsx`)
- 훅: `use*.ts` (예: `useUserData.ts`)
- 스타일: `*.styled.ts` (예: `Attendance.styled.ts`)
- 타입: `*.d.ts` 또는 `*.ts`

### 컴포넌트 패턴
```tsx
const Component: React.FC<Props> = ({ prop }) => {
  return <StyledWrapper>...</StyledWrapper>;
};
```

### API 호출 패턴
```tsx
// hooks/queries/useUserData.ts
const useUserData = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: Infinity,
  });
};
```

### Zustand 패턴
```tsx
// stores/menuModalStore.ts
export const useMenuModalStore = create(devtools((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
})));
```

## 주요 도메인

| 도메인 | 경로 | 설명 |
|--------|------|------|
| 인증 | /login, /register | Kakao/Apple OAuth |
| 출석 | /attendance, /attendCheck | 출석 체크 및 현황 |
| 회비 | /dues, /receipt | 회비 납부 관리 |
| 게시판 | /board/* | 공지사항, 교육, 팀별 게시판 |
| 이벤트 | /events/* | 이벤트 관리, 캘린더 |
| 멤버 | /member | 멤버 조회 |
| 관리자 | /admin/* | 멤버/출석/회비/페널티 관리 |

## 환경 변수

- `VITE_API_URL`: API 서버 주소

## 인증 흐름

1. OAuth 로그인 (Kakao/Apple)
2. 토큰 저장: localStorage (`accessToken`, `refreshToken`)
3. API 요청 시 Authorization 헤더 자동 추가
4. 401 응답 시 자동 토큰 갱신 (api.ts 인터셉터)

## 테마 색상 (theme.ts)

- `main`: #00DDA8 (메인 그린)
- `positive`: #508FFF (긍정/파랑)
- `negative`: #FF5858 (부정/빨강)
- `caution`: #FFB200 (주의/주황)
- `gray.100` ~ `gray.9`: 그레이 스케일

## 린트/포맷

- ESLint: Airbnb 스타일
- Prettier: single quote, trailing comma
- Husky: pre-commit 시 pretty-quick 실행
