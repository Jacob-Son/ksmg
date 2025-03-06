## package manager 세팅

    yarn set version berry
    yarn install
    yarn dlx @yarnpkg/sdks vscode
    yarn plugin import typescript
    Shift + Command(Ctrl) + P > Select Typescript version

## 실행

### 테스트 환경 실행법

1. git checkout main
2. yarn install
3. yarn dev:test

### 라이브 환경 실행법

1. git checkout live
2. yarn install
3. yarn dev:pickapen

### 파세듀 환경 실행법

1. git checkout passedu
2. yarn install
3. yarn dev:passedu