# Frontend Fundamentals 모의고사

## Overview

**Feature-Sliced Design** 아키텍처를 기반으로 확장 가능하고 유지보수하기 쉬운 구조로 설계했으며, **React Query + Suspense**, **React Hook Form + Zod**를 활용하여 선언적인 상태 관리 시스템을 구축했습니다.

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
│   ├── App.tsx
│   └── Routes.tsx
│
├── pages/                        # 페이지 계층
│   └── SavingsCalculatorPage/
│       ├── SavingsCalculatorPage.tsx  # 메인 페이지 (폼 + 탭 관리)
│       ├── ProductsTab.tsx            # 적금 상품 목록 탭
│       └── ResultsTab.tsx             # 계산 결과 탭
│
├── widgets/                      # 비즈니스 기능 단위
│   ├── savings-form/             # 저축 목표 입력 폼
│   │   ├── model/
│   │   │   ├── schema.ts
│   │   │   └── constants.ts
│   │   └── ui/
│   │       └── SavingsForm.tsx
│   │
│   ├── product-list/             # 적금 상품 목록
│   │   └── ui/
│   │       └── ProductList.tsx
│   │
│   ├── calculation-result/       # 계산 결과 표시
│   │   └── ui/
│   │       └── CalculationResult.tsx
│   │
│   └── recommended-products/     # 추천 상품 섹션
│       └── ui/
│           └── RecommendedProducts.tsx
│
├── entities/                     # 비즈니스 엔티티
│   └── savings-product/          # 적금 상품 도메인
│       ├── api/                  # 서버 상태 관리
│       │   ├── savingsProductApi.ts
│       │   └── useSavingsProductsQuery.ts
│       │
│       ├── lib/                  # 비즈니스 로직 (순수 함수)
│       │   ├── calculateSavingsResults.ts
│       │   ├── filterProductsByCriteria.ts
│       │   └── getTopProductsByAnnualRate.ts
│       │
│       ├── model/                # 타입 정의
│       │   └── types.ts
│       │
│       └── ui/                   # 엔티티 UI 컴포넌트
│           └── ProductItem.tsx
│
└── shared/                       # 공통 레이어
    ├── lib/                      # 공통 라이브러리
    │   └── react-query/
    │       └── queryClient.ts    # React Query 설정
    │
    ├── ui/                       # 재사용 가능한 UI 컴포넌트
    │   ├── Tabs.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── EmptyState.tsx
    │   └── TextFieldWithError.tsx
    │
    └── utils/                    # 유틸리티 함수
        ├── format.ts             # 금액 포맷팅
        └── parseNumberFromInput.ts # 숫자 파싱
```

</details>

<details>
<summary><strong> 코드 둘러보기</strong> (처음 보시는 분들을 위한 탐색 가이드)</summary>

### 1단계: 설정 파일 확인

전체 구조 파악을 위해 설정 파일부터 보는 걸 추천합니다.

- `package.json` → 어떤 라이브러리를 사용했는지
- `tsconfig.json` → 경로 별칭(`@app`, `@entities` 등) 설정
- `vite.config.mts` → 빌드 설정

### 2단계: 공통 레이어부터

재사용 컴포넌트들을 먼저 보면 전체적인 코드 스타일을 파악하기 쉽습니다.

**UI 컴포넌트** (`src/shared/ui/`)

- `EmptyState.tsx`, `TextFieldWithError.tsx` → 간단한 컴포넌트들
- `ErrorBoundary.tsx` → 에러 처리
- `Tabs.tsx` → 탭상태를 선언적으로 관리할 수 있는 컴포넌트

**유틸** (`src/shared/utils/`)

- `format.ts` → 금액 포맷팅 (1000000 → "1,000,000")
- `parseNumberFromInput.ts` → 입력값에서 숫자제거 후 파싱

### 3단계: 비즈니스 로직

적금 계산의 핵심입니다. UI와 완전히 분리되어 있어서 테스트하기 좋게 만들었습니다.

**계산 로직** (`src/entities/savings-product/lib/`)

- `calculateSavingsResults.ts` → 예상 수익, 추천 납입액 계산
- `filterProductsByCriteria.ts` → 조건 필터링
- `getTopProductsByAnnualRate.ts` → 이자율 정렬

**API** (`src/entities/savings-product/api/`)

- `savingsProductApi.ts` → HTTP 호출
- `useSavingsProductsQuery.ts` → React Query의 useSuspenseQuery 활용

### 4단계: 폼 구현

Zod와 React Hook Form을 어떻게 통합했는지 확인할 수 있습니다.

**스키마** (`src/widgets/savings-form/model/`)

- `schema.ts` → Zod로 검증 규칙 정의
- `constants.ts` → 저축 기간 옵션

**폼 UI** (`src/widgets/savings-form/ui/`)

- `SavingsForm.tsx` → 숫자 포맷팅 처리 방식 참고

### 5단계: 페이지 조립

모든 조각을 어떻게 조립했는지 확인합니다.

- `SavingsCalculatorPage.tsx` → 폼 상태 관리와 탭 제어
- `ProductsTab.tsx`, `ResultsTab.tsx` → Suspense로 감싼 탭 내용

### 시간 없으시면 이것만

핵심 파일 5개만 봐도 설계 의도를 파악할 수 있습니다.

1. `calculateSavingsResults.ts` - 순수 함수로 분리한 비즈니스 로직
2. `Tabs.tsx` - 제네릭으로 만든 재사용 컴포넌트
3. `schema.ts` - Zod로 타입과 검증을 한 번에
4. `SavingsCalculatorPage.tsx` - React Hook Form + Suspense 통합
5. `useSavingsProductsQuery.ts` - React Query Suspense 모드

</details>

<details>
<summary><strong>설계 시 고려한 점</strong></summary>

### Feature-Sliced Design 도입

확장성과 유지보수성을 위해 계층별로 코드를 분리했습니다. 새로운 기능을 추가하거나 수정할 때 다른 계층에 영향을 주지 않습니다.

### 비즈니스 로직 분리

UI와 독립적인 순수 함수로 계산 로직을 구현해 테스트하기 쉽게 만들었습니다. `calculateSavingsResults`, `filterProductsByCriteria` 같은
함수들은 React 없이도 독립적으로 테스트할 수 있습니다.

### 타입 안전성

Zod 스키마로 런타임 검증과 타입 정의를 동시에 처리했습니다. 하나의 스키마에서 TypeScript 타입과 검증 로직이 모두 나오기 때문에 타입과 검증이
항상 일치합니다.

### 선언적 UI 관리

React Query의 Suspense 모드와 ErrorBoundary를 활용해 로딩/에러 상태를 선언적으로 처리했습니다. `if (isLoading)` 같은 명령형 코드 없이 컴포넌트를 깔끔하게 유지할 수 있습니다.

또한 제네릭 기반 Tabs 컴포넌트로 탭 상태를 선언적으로 관리합니다. `tabs` 배열과 `content` 객체만 전달하면 탭 UI가 완성되고, 타입 안전성도 보장됩니다.

</details>

<details>
<summary><strong>구현하면서 고민했던 점들</strong></summary>

코드를 작성하면서 **"이 설계가 정말 좋은 구조인가?"** 를 계속 자문했습니다. 단순히 동작하는 코드가 아니라, 유지보수하기 쉽고 확장 가능한 코드를 만들고 싶었습니다.

### 높은 응집도: 관련된 것들끼리 모여있는가?

**같은 관심사는 같은 곳에** 모아두려고 했습니다.

- `savings-product` 엔티티 안에 API 호출(`useSavingsProductsQuery`), 계산 로직(`calculateSavingsResults`), 타입 정의(`types.ts`)가 모두 모여있습니다.
- 적금 상품과 관련된 모든 것이 한 곳에 있으니, 상품 관련 수정이 필요할 때 여기저기 찾아다닐 필요가 없습니다.

**위젯도 자신의 관심사에만 집중**합니다.

- `savings-form`은 폼 스키마(`schema.ts`), 상수(`constants.ts`), UI(`SavingsForm.tsx`)만 가지고 있습니다.
- 계산 로직은 `entities`에 있으니, 폼은 "사용자 입력을 받는 것"에만 집중할 수 있습니다.

### 낮은 결합도: 서로 독립적으로 변경할 수 있는가?

**비즈니스 로직을 UI에서 완전히 분리**했습니다.

```typescript
// entities/savings-product/lib/calculateSavingsResults.ts
export function calculateSavingsResults(input: SavingsCalculationInput) {
  // React 없이도 동작하는 순수 함수
}
```

- 계산 로직은 React를 전혀 모릅니다. UI 프레임워크를 바꿔도 이 로직은 그대로 쓸 수 있습니다.
- 테스트할 때도 컴포넌트를 렌더링할 필요 없이 함수만 호출하면 됩니다.

**계층 간 단방향 의존성**을 유지했습니다.

```
pages → widgets → entities → shared
```

- `pages`는 `widgets`을 알지만, `widgets`은 `pages`를 모릅니다.
- `ProductList` 위젯을 다른 페이지에서도 재사용할 수 있습니다.

### 적절한 추상화 수준: 각 계층이 자신의 레벨에 맞는 고민을 하는가?

**페이지 레벨**: "어떤 위젯을 조합할까?"

```tsx
// SavingsCalculatorPage.tsx
<SavingsForm formValues={formValues} setValue={setValue} errors={errors} />

<Tabs
  tabs={[
    { value: 'products', label: '적금 상품' },
    { value: 'results', label: '계산 결과' }
  ]}
  content={{
    products: <ProductsTab formValues={formValues} selectedProduct={selectedProduct} />,
    results: <ResultsTab formValues={formValues} selectedProduct={selectedProduct} />
  }}
/>
```

페이지는 위젯을 배치하고 데이터를 전달하는 것에만 집중합니다. 계산이나 필터링 로직은 몰라도 됩니다.

**위젯 레벨**: "어떤 데이터를 어떻게 보여줄까?"

```tsx
// ResultsTab.tsx
const calculationResults = selectedProduct
  ? calculateSavingsResults({
      product: selectedProduct,
      targetAmount: formValues.targetAmount,
      monthlyAmount: formValues.monthlyAmount,
      savingTerm: formValues.savingTerm,
    })
  : null;

return <CalculationResult results={calculationResults} />;
```

위젯은 엔티티의 함수를 호출하고 결과를 렌더링합니다. 계산 로직의 내부 구현은 몰라도 됩니다.

**엔티티 레벨**: "도메인 로직을 어떻게 구현할까?"

```typescript
// calculateSavingsResults.ts
function calculateExpectedAmount(monthlyAmount, savingTerm, annualRate) {
  return Math.floor(monthlyAmount * savingTerm * calculateAnnualInterestRate(annualRate));
}
```

순수한 비즈니스 로직만 있습니다. UI가 어떻게 생겼는지 몰라도 됩니다.

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

</details>
