# Frontend Fundamentals 모의고사

## Overview

**페이지 중심 구조**로 설계하여 모바일 앱 특성에 맞게 응집도 높은 코드베이스를 구축했으며, **React Query + Suspense**, **React Hook Form + Zod**를 활용하여 선언적인 상태 관리 시스템을 구축했습니다.

<details>
<summary><strong>실행 방법</strong></summary>

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build
```

</details>

<details>
<summary><strong>기술 스택</strong></summary>

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **React Query** - 서버 상태 관리 (Suspense 모드)
- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증
- **Vite** - 빌드 도구

</details>

<details>
<summary><strong>프로젝트 구조</strong></summary>

```
src/
├── app/
│   ├── App.tsx                            # 앱 진입점 (ErrorBoundary + Suspense)
│   └── Routes.tsx                         # 라우팅 설정
│
├── pages/                                 # 페이지 중심 구조 (Feature-based)
│   └── SavingsCalculatorPage/            # 저축 계산기 페이지
│       ├── SavingsCalculatorPage.tsx     # 메인 페이지 (폼 + 탭 관리)
│       ├── types.ts                      # 페이지 전용 타입
│       ├── constants.ts                  # 저축 기간 상수
│       │
│       ├── components/                   # 페이지 전용 컴포넌트
│       │   ├── container/                # 비즈니스 로직을 포함하는 컨테이너
│       │   │   ├── ProductsTab.tsx       # 적금 상품 목록 탭
│       │   │   └── ResultsTab/           # 계산 결과 탭
│       │   │       ├── ResultsTab.tsx
│       │   │       ├── calculateSavingsResults.ts
│       │   │       └── getTopProductsByAnnualRate.ts
│       │   │
│       │   └── ui/                       # 프레젠테이션 컴포넌트
│       │       ├── SavingsForm.tsx       # 저축 목표 입력 폼
│       │       ├── ProductList.tsx       # 적금 상품 목록
│       │       ├── ProductItem.tsx       # 적금 상품 아이템
│       │       ├── CalculationResult.tsx # 계산 결과 표시
│       │       └── RecommendedProducts.tsx  # 추천 상품 섹션
│       │
│       ├── hooks/                        # 커스텀 훅
│       │   ├── useSavingsProducts.ts     # 적금 상품 조회 (React Query)
│       │   └── useFilteredProducts/      # 상품 필터링 로직
│       │       ├── useFilteredProducts.ts
│       │       └── filterProductsByCriteria.ts
│       │
│       └── lib/                          # 비즈니스 로직
│           ├── savingsProductApi.ts      # API 호출 함수
│           └── calculateSavingsResults.ts  # 계산 로직 (순수 함수)
│
└── shared/                                # 진짜 공통 코드만
    ├── lib/                               # 공통 라이브러리 설정
    │   └── react-query/
    │       └── queryClient.ts
    │
    ├── ui/                                # 재사용 가능한 UI 컴포넌트
    │   ├── Tabs.tsx                      # 제네릭 탭 컴포넌트
    │   ├── ErrorBoundary.tsx             # 에러 처리
    │   ├── EmptyState.tsx                # 빈 상태 UI
    │   └── TextFieldWithError.tsx        # 에러 표시 Input
    │
    └── utils/                             # 유틸리티 함수
        ├── format.ts                      # 숫자/텍스트 포맷팅
        └── parseNumberFromInput.ts        # Input 파싱
```

</details>

<details>
<summary><strong> 코드 둘러보기</strong> (처음 보시는 분들을 위한 탐색 가이드)</summary>

### 1단계: 공통 레이어 (`src/shared`)

재사용 가능한 코드들을 먼저 확인하세요.

- `ui/` → Tabs, ErrorBoundary, EmptyState 등 공통 컴포넌트
- `utils/` → format, parseNumberFromInput 등 유틸리티

### 2단계: 페이지 구조 (`src/pages/SavingsCalculatorPage`)

페이지 안에 모든 것이 모여있습니다.

- `types.ts` → 타입 정의
- `constants.ts` → 상수 정의
- `hooks/` → 커스텀 훅 (React Query, 필터링 로직)
- `lib/` → 비즈니스 로직 (API, 계산 함수)
- `components/container/` → 비즈니스 로직을 포함하는 컨테이너 컴포넌트
- `components/ui/` → 프레젠테이션 컴포넌트 (순수 UI)
- `SavingsCalculatorPage.tsx` → 메인 페이지

### 3단계: 핵심 패턴 이해

- `components/container/ResultsTab/calculateSavingsResults.ts` → UI와 분리된 순수 함수
- `hooks/useSavingsProducts.ts` → React Query Suspense 모드
- `components/ui/` → 프레젠테이션 컴포넌트 (props만 받아서 렌더링)
- `components/container/` → 컨테이너 컴포넌트 (로직 + UI 조합)

### 시간 없으시면 이것만

핵심 파일 5개만 봐도 설계 의도를 파악할 수 있습니다.

1. `components/container/ResultsTab/calculateSavingsResults.ts` - 순수 함수로 분리한 비즈니스 로직
2. `shared/ui/Tabs.tsx` - 제네릭으로 만든 재사용 컴포넌트
3. `components/ui/SavingsForm.tsx` - 프레젠테이션 컴포넌트 (props 기반)
4. `SavingsCalculatorPage.tsx` - React Hook Form + Suspense 통합
5. `hooks/useSavingsProducts.ts` - React Query Suspense 모드

</details>

## 구현하면서 고민했던 점들

코드를 작성하면서 **"이 설계가 정말 좋은 구조인가?"** 를 계속 자문했습니다. 단순히 동작하는 코드가 아니라, 유지보수하기 쉽고 확장 가능한 코드를 만들고 싶었습니다.

### 높은 응집도: 관련된 것들끼리 모여있는가?

기능이 사라지면 폴더만 지우면 관련 로직들이 깔끔하게 사라질 수 있도록 구성했습니다.

**페이지 단위 응집**

- `SavingsCalculatorPage` 폴더 안에 API 호출, 계산 로직, 컴포넌트, 타입이 모두 있습니다.
- 저축 계산기 기능을 제거하려면? → `pages/SavingsCalculatorPage/` 폴더만 삭제
- 다른 코드는 전혀 영향받지 않습니다.

**컴포넌트 단위 응집**

```
components/
├── container/ResultsTab/     # 계산 결과 관련 모든 것
│   ├── ResultsTab.tsx
│   ├── calculateSavingsResults.ts
│   └── getTopProductsByAnnualRate.ts
└── ui/                        # 순수 표현 컴포넌트
```

- 계산 결과 탭을 제거하려면? → `container/ResultsTab/` 폴더만 삭제
- 이 폴더 안에 계산 로직부터 UI까지 관련된 모든 것이 함께 있습니다.

**재사용되는 것만 shared로**

- 2개 이상의 페이지에서 쓰이는 것만 `shared`에 둡니다.
- 나중에 필요해지면 그때 옮겨도 됩니다 (YAGNI 원칙).

### 낮은 결합도: 서로 독립적으로 변경할 수 있는가?

**비즈니스 로직을 UI에서 완전히 분리**했습니다.

```typescript
// components/container/ResultsTab/calculateSavingsResults.ts
export function calculateSavingsResults(input: SavingsCalculationInput) {
  // React 없이도 동작하는 순수 함수
}
```

- 계산 로직은 React를 전혀 모릅니다. UI 프레임워크를 바꿔도 이 로직은 그대로 쓸 수 있습니다.
- 테스트할 때도 컴포넌트를 렌더링할 필요 없이 함수만 호출하면 됩니다.

**페이지는 독립적**입니다.

- 각 페이지는 `shared`만 의존하고, 다른 페이지를 몰라도 됩니다.
- 페이지를 통째로 삭제하거나 추가해도 다른 페이지에 영향 없습니다.

### 적절한 추상화 수준: 각 계층이 자신의 레벨에 맞는 고민을 하는가?

**페이지 레벨**: "전체 흐름을 어떻게 구성할까?"

```tsx
// SavingsCalculatorPage.tsx
<SavingsForm formValues={formValues} setValue={setValue} errors={errors} />

<Tabs
  tabs={[
    { value: 'products', label: '적금 상품' },
    { value: 'results', label: '계산 결과' }
  ]}
  content={{
    products: <ProductsTab ... />,
    results: <ResultsTab ... />
  }}
/>
```

페이지는 컴포넌트를 배치하고 데이터 흐름을 제어합니다.

**컴포넌트 레벨**: "어떤 데이터를 어떻게 보여줄까?"

```tsx
// components/container/ResultsTab.tsx (컨테이너 - 로직 처리)
const calculationResults = selectedProduct
  ? calculateSavingsResults({
      product: selectedProduct,
      targetAmount: formValues.targetAmount,
      monthlyAmount: formValues.monthlyAmount,
      savingTerm: formValues.savingTerm,
    })
  : null;

return <CalculationResult selectedProduct={selectedProduct} calculationResults={calculationResults} />;

// components/ui/CalculationResult.tsx (프레젠테이션 - UI 표현)
<ListRow
  contents={
    <ListRow.Texts
      top="예상 수익 금액"
      bottom={`${format.currency.won(calculationResults?.expectedAmount ?? 0)}원`}
    />
  }
/>
```

Container는 계산 로직을 실행하고, UI 컴포넌트는 받은 데이터를 시각적으로 표현합니다.

**비즈니스 로직 레벨**: "로직을 어떻게 구현할까?"

```typescript
// components/container/ResultsTab/calculateSavingsResults.ts
function calculateExpectedAmount(monthlyAmount, savingTerm, annualRate) {
  return Math.floor(monthlyAmount * savingTerm * calculateAnnualInterestRate(annualRate));
}
```

순수한 비즈니스 로직만 있습니다. UI가 어떻게 생겼는지 몰라도 되고, ResultsTab에서만 사용되므로 함께 모여있습니다.

### 선언적 코드: "어떻게"가 아니라 "무엇을" 표현하는가?

**명령형 코드를 최소화**했습니다.

```tsx
// ❌ 명령형: 어떻게 로딩을 처리할지 직접 작성
if (isLoading) return <Spinner />;
if (isError) return <Error />;
return <ProductList data={data} />;

// ✅ 선언적: Suspense와 ErrorBoundary에 위임
<ErrorBoundary>
  <Suspense fallback={<Spinner />}>
    <ProductsTab />
  </Suspense>
</ErrorBoundary>;
```

**관계를 선언만으로 표현**합니다.

```tsx
<Tabs
  tabs={[
    { value: 'products', label: '적금 상품' },
    { value: 'results', label: '계산 결과' },
  ]}
  content={{
    products: <ProductsTab />,
    results: <ResultsTab />,
  }}
/>
```

탭이 "어떻게" 동작하는지가 아니라, "무엇을" 보여줄지만 정의합니다. 컴포넌트 코드를 읽으면 구조와 관계가 한눈에 들어옵니다.

### 꼭 필요한 추상화인가?

`calculateSavingsResults` 함수를 만들 때 고민이 많았습니다.

```typescript
// 이 함수가 정말 필요한가? 그냥 3개 함수를 직접 호출하면 되는 거 아닌가?
export function calculateSavingsResults(input) {
  const expectedAmount = calculateExpectedAmount(...);
  const difference = calculateDifference(...);
  const recommendedAmount = calculateRecommendedAmount(...);
  return { expectedAmount, difference, recommendedAmount };
}
```

하지만 "적금 계산 결과를 한 번에 받는다"는 명확한 책임이 있다고 판단했습니다.

- 사용하는 쪽에서는 함수 하나만 호출하면 됩니다.
- 나중에 세금 계산이 추가되면 여기에만 넣으면 됩니다.
- 3개 함수의 조합 로직을 여러 곳에 중복으로 작성할 필요가 없습니다.
- 테스트하기 편해집니다.
