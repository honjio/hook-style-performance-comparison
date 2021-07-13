# hook-style-performance-comparison

Profile hook-style component generation against styled-components, emotion & @emotion/styled

## Arbitrary test results (don't trust these, run your own)

From `React.unstable__Profiler` mounting 4000 elements based on 2 components (1 with prop-based style)

```txt
hook-style
  Actual: 216.4049898274243
  Base:   152.3249913007021

emotion(v10)
  Actual: 128.42499604448676
  Base:   72.33999785967171

@emotion/styled(v10)
  Actual: 152.72499807178974
  Base:   106.08999780379236

styled-components(v4)
  Actual: 308.6600126698613
  Base:   214.07501213252544
```

## 更新

Forked this repository to 2021-07-12

setup

```bash
# node_modules install
yarn

# https://localhost:8000
yarn start
```

### 結果

fast > slow

@emotion/styled(v11) > styled-component(v5) > @emotion/react(v11)

### 詳細

各ライブラリの計測結果を記載

* Actual time, Base time についてはこちら [Profile API](https://ja.reactjs.org/docs/profiler.html#onrender-callback) を見てください
* Mount time は useEffect が実行されるまでの時間です

#### react-component v17 non-style

```jsx
{range.map(index => (
  <div key={index}>
    <div>
      <div>
        <div>{index + 1}</div>
      </div>
    </div>
  </div>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.058ms|0.022ms|0.112ms|
|2|0.060ms|0.023ms|0.113ms|
|3|0.061ms|0.021ms|0.111ms|
|Average|0.060ms|0.022ms|0.112ms|

#### styled-component v5

```jsx
const StyledComponentsContainer = styled.div`/* スタイル定義 */`;
const StyledComponentsBox = styled.div`/* スタイル定義 */`;

{range.map(index => (
  <StyledComponentsContainer key={index}>
    <StyledComponentsBox>
      <StyledComponentsContainer border>
        <StyledComponentsBox>{index + 1}</StyledComponentsBox>
      </StyledComponentsContainer>
    </StyledComponentsBox>
  </StyledComponentsContainer>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.135ms|0.085ms|0.206ms|
|2|0.139ms|0.088ms|0.215ms|
|3|0.137ms|0.081ms|0.206ms|
|Average|0.137ms|0.085ms|0.209ms|

#### @emotion/styled v11 pattern.1

```jsx
const EmotionStyledContainer = styled.div`/* スタイル定義 */`;
const EmotionStyledBox = styled.div`/* スタイル定義 */`;

{range.map(index => (
  <EmotionStyledContainer key={index}>
    <EmotionStyledBox>
      <EmotionStyledContainer border>
        <EmotionStyledBox>{index + 1}</EmotionStyledBox>
      </EmotionStyledContainer>
    </EmotionStyledBox>
  </EmotionStyledContainer>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.117ms|0.067ms|0.185ms|
|2|0.118ms|0.070ms|0.190ms|
|3|0.096ms|0.053ms|0.170ms|
|Average|0.110ms|0.063ms|0.182ms|

#### @emotion/styled v11 pattern.2

```jsx

const _EmotionComponentA = ({ className, children }) => (
  <div className={className}>
    <div className="box">
      <div className="container">
        <div className="box">{children}</div>
      </div>
  </div>
</div>
);

const EmotionComponentA = eStyled(_EmotionComponentA)`/* スタイル定義 */`;

{range.map(index => (
  <EmotionComponentA border key={index}>{index + 1}</EmotionComponentA>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.113ms|0.058ms|0.170ms|
|2|0.112ms|0.064ms|0.167ms|
|3|0.114ms|0.063ms|0.171ms|
|Average|0.113ms|0.062ms|0.169ms|

#### @emotion/styled v11 pattern.3

```jsx
const EmotionComponentB = ({children}) => (
  // pattern.1 の DOM を CompoentB としてまとめて return する
  <EmotionStyledContainer>
  <EmotionStyledBox>
    <EmotionStyledContainer border>
      <EmotionStyledBox>{children}</EmotionStyledBox>
    </EmotionStyledContainer>
  </EmotionStyledBox>
</EmotionStyledContainer>
);

{range.map(index => (
  <EmotionComponentB key={index}>{index + 1}</EmotionComponentB>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.130ms|0.079ms|0.195ms|
|2|0.131ms|0.085ms|0.198ms|
|3|0.128ms|0.077ms|0.196ms|
|Average|0.130ms|0.080ms|0.196ms|

#### @emotion/react v11 pattern.1

※ React の Profile API を利用した計測値（Actual, Base）が以上に早いが、恐らく pattern.2 の結果が正しく、計測に当たって下記の記述は適していなかった可能性がある。

```jsx
const emotionContainer = css`/* スタイル定義 */`;
const emotionBox = css`/* スタイル定義 */`;

{range.map(index => (
  <div css={emotionContainer} key={index}>
    <div css={emotionBox}>
      <div css={[emotionContainer, {border: '1rem solid yellow'}]}>
        <div css={emotionBox}>{index + 1}</div>
      </div>
    </div>
  </div>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.084ms|0.041ms|0.434ms|
|2|0.082ms|0.038ms|0.450ms|
|3|0.088ms|0.044ms|0.423ms|
|Average|0.085ms|0.041ms|0.436ms|

#### @emotion/react v11 pattern.2

```jsx
const EmotionContainer = ({ border, children, ...props }) => (
  <div css={css`/*スタイル定義*/`} {...props}>{children}</div>
);

const EmotionBox = ({ children, ...props }) => (
  <div css={css`/*スタイル定義*/`} {...props}>{children}</div>
);

{range.map(index => (
  <EmotionContainer key={index}>
    <EmotionBox>
      <EmotionContainer border>
        <EmotionBox>{index + 1}</EmotionBox>
      </EmotionContainer>
    </EmotionBox>
  </EmotionContainer>
))}
```

|Count|Actual time|Base Time|Mount time|
|--|--|--|--|
|1|0.258ms|0.209ms|0.339ms|
|2|0.266ms|0.215ms|0.347ms|
|3|0.266ms|0.215ms|0.345ms|
|Average|0.263ms|0.213ms|0.344ms|

### 雑感

* @emotion/styled が早い
* @emotion/styled v11 と styled-component v5 のパフォーマンス差はそこまで無い
* @emotion/react (css prop) は思ったより遅い（特に dom の mount が
* @emotion/styled において個々の要素を styled component 化するのと、幾つかの要素を束ねて styled component 化するでは若干後者のパフォーマンスが良さそう。今回は個々の要素と言っても２つしか無いので、もっと増えれば差が出てくるかも。

### その他 css-in-js パフォーマンス関連資料

[3. simnalamburt/css-in-js-benchmark](https://github.com/simnalamburt/css-in-js-benchmark/) でも @emotion/react, @emotion/styled, styled-component, etc... のパフォーマンス計測を行うことができたので、確認したが概ね fork してきた本リポジトリで調査した結果と相違なかった。

1. [modulz/stitches-bench _ 2021/06](https://github.com/modulz/stitches-bench)
2. [necolas/react-native-web _ 2021/06](https://github.com/necolas/react-native-web/tree/master/packages/benchmarks)
3. [simnalamburt/css-in-js-benchmark _ 2020/09](https://github.com/simnalamburt/css-in-js-benchmark/)
4. [The battle of CSS in JS solutions _ 2020/05](https://github.com/petertenhoor/css-in-js-comparison)
5. [A-gambit/CSS-IN-JS-Benchmarks _ 2018/03](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md)
