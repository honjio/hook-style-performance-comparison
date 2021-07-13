/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, Profiler, useEffect } from 'react';
import styled from 'styled-components';
import eStyled from '@emotion/styled';
const { useStyle: useHookStyle } = require('hook-style/dist/hook-style.js');
const { useStyle: useStyledHooks } = require('styled-hooks/dist/styled-hooks.js');

const StyledComponentsContainer = styled.div`
  padding: 1rem;
  background: red;
  border: ${props => (props.border ? '1rem solid yellow' : 'none')};
`;

const StyledComponentsBox = styled.div`
  padding: 1rem;
  background: black;
  color: white;
`;

const EmotionStyledContainer = eStyled.div`
  padding: 1rem;
  background: red;
  border: ${props => (props.border ? '1rem solid yellow' : 'none')};
`;

const EmotionStyledBox = eStyled.div`
  padding: 1rem;
  background: black;
  color: white;
`;

const _EmotionComponentA = ({ className, children }) => (
  <div className={className}>
    <div className="box">
      <div className="container">
        <div className={"box"}>{children}</div>
      </div>
  </div>
</div>
);

const EmotionComponentA = eStyled(_EmotionComponentA)`
  padding: 1rem;
  background: red;
  border: none;

  > .box, .container > .box {
    padding: 1rem;
    background: black;
    color: white;

    > .container {
      padding: 1rem;
      background: red;
      border: ${props => (props.border ? '1rem solid yellow' : 'none')};
    }
  }
`;

const EmotionComponentB = ({children}) => (
  <EmotionStyledContainer>
  <EmotionStyledBox>
    <EmotionStyledContainer border>
      <EmotionStyledBox>{children}</EmotionStyledBox>
    </EmotionStyledContainer>
  </EmotionStyledBox>
</EmotionStyledContainer>
);

const emotionContainer = css`
  padding: 1rem;
  background: red;
  border: null;
`;

const emotionBox = css`
  padding: 1rem;
  background: black;
  color: white;
`;

const EmotionContainer = ({ border, children, ...props }) => {
  return (
    <div
      css={css`
        padding: 1rem;
        background: red;
        border: ${border ? '1rem solid yellow' : 'none'};
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const EmotionBox = ({ children, ...props }) => {
  return (
    <div
      css={css`
        padding: 1rem;
        background: black;
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const HookStyleContainer = ({ border, children, ...props }) => {
  return (
    <div
      className={useHookStyle`
        padding: 1rem;
        background: red;
        border: ${border ? '1rem solid yellow' : 'none'};
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const HookStyleBox = ({ children, ...props }) => {
  return (
    <div
      className={useHookStyle`
        padding: 1rem;
        background: black;
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const StyledHooksContainer = ({ border, children, ...props }) => {
  return (
    <div
      className={useStyledHooks`
        padding: 1rem;
        background: red;
        border: ${border ? '1rem solid yellow' : 'none'};
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const StyledHooksBox = ({ children, ...props }) => {
  return (
    <div
      className={useStyledHooks`
        padding: 1rem;
        background: black;
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const range = Array.from(Array(1000).keys());

const areAnyTruthy = arr => arr.filter(x => x).length > 0;

const log = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  console.group(`${id}:${phase}`);
  console.log(`Actual: ${actualTime / 1000} ms`);
  console.log(`Base:   ${baseTime / 1000} ms`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
  console.groupEnd(`${id}${phase}`);
};

export default function App() {
  const [isComponentsActive, setIssComponentsActive] = useState(false);
  const [isStyledComponentsActive, setIsStyledComponentsActive] = useState(false);
  const [isEmotionStyledActive1, setIsEmotionStyledActive1] = useState(false);
  const [isEmotionStyledActive2, setIsEmotionStyledActive2] = useState(false);
  const [isEmotionStyledActive3, setIsEmotionStyledActive3] = useState(false);
  const [isEmotionActive1, setIsEmotionActive1] = useState(false);
  const [isEmotionActive2, setIsEmotionActive2] = useState(false);
  const [isHookStyleActive, setIsHookStyleActive] = useState(false);
  const [isStyledHooksActive, setIsStyledHooksActive] = useState(false);
  const isAnythingActive = areAnyTruthy([
    isComponentsActive,
    isStyledComponentsActive,
    isEmotionStyledActive1,
    isEmotionStyledActive2,
    isEmotionStyledActive3,
    isEmotionActive1,
    isEmotionActive2,
    isHookStyleActive,
    isStyledHooksActive
  ]);

  const startTime = Date.now();
  useEffect(() => {
    if (isAnythingActive) {
      const endTime = Date.now();
      console.log(`DOM mount time - ${(endTime - startTime)/1000}ms`);
    }
  });

  return (
    <div>
      <div>
        <button
          disabled={isAnythingActive && !isComponentsActive}
          onClick={() => setIssComponentsActive(!isComponentsActive)}
        >
          {isComponentsActive ? 'Remove ' : 'Add '}
          <code>react-components</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isStyledComponentsActive}
          onClick={() => setIsStyledComponentsActive(!isStyledComponentsActive)}
        >
          {isStyledComponentsActive ? 'Remove ' : 'Add '}
          <code>styled-components</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isEmotionStyledActive1}
          onClick={() => setIsEmotionStyledActive1(!isEmotionStyledActive1)}
        >
          {isEmotionStyledActive1 ? 'Remove ' : 'Add '}
          <code>@emotion/styled - 1</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isEmotionStyledActive2}
          onClick={() => setIsEmotionStyledActive2(!isEmotionStyledActive2)}
        >
          {isEmotionStyledActive2 ? 'Remove ' : 'Add '}
          <code>@emotion/styled - 2</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isEmotionStyledActive3}
          onClick={() => setIsEmotionStyledActive3(!isEmotionStyledActive3)}
        >
          {isEmotionStyledActive3 ? 'Remove ' : 'Add '}
          <code>@emotion/styled - 3</code>
        </button>{' '}
        <button disabled={isAnythingActive && !isEmotionActive1} onClick={() => setIsEmotionActive1(!isEmotionActive1)}>
          {isEmotionActive1 ? 'Remove ' : 'Add '}
          <code>@emotion/react - 1</code>
        </button>{' '}
        <button disabled={isAnythingActive && !isEmotionActive2} onClick={() => setIsEmotionActive2(!isEmotionActive2)}>
          {isEmotionActive2 ? 'Remove ' : 'Add '}
          <code>@emotion/react - 2</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isHookStyleActive}
          onClick={() => setIsHookStyleActive(!isHookStyleActive)}
        >
          {isHookStyleActive ? 'Remove ' : 'Add '}
          <code>hook-style</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isStyledHooksActive}
          onClick={() => setIsStyledHooksActive(!isStyledHooksActive)}
        >
          {isStyledHooksActive ? 'Remove ' : 'Add '}
          <code>styled-hooks</code>
        </button>
      </div>
      {isComponentsActive && (
        <Profiler id="react-components" onRender={log}>
          {range.map(index => (
            <div key={index}>
              <div>
                <div>
                  <div>{index + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </Profiler>
      )}
      {isStyledComponentsActive && (
        <Profiler id="styled-components" onRender={log}>
          {range.map(index => (
            <StyledComponentsContainer key={index}>
              <StyledComponentsBox>
                <StyledComponentsContainer border>
                  <StyledComponentsBox>{index + 1}</StyledComponentsBox>
                </StyledComponentsContainer>
              </StyledComponentsBox>
            </StyledComponentsContainer>
          ))}
        </Profiler>
      )}
      {isEmotionStyledActive1 && (
        <Profiler id="@emotion/styled-1" onRender={log}>
          {range.map(index => (
            <EmotionStyledContainer key={index}>
              <EmotionStyledBox>
                <EmotionStyledContainer border>
                  <EmotionStyledBox>{index + 1}</EmotionStyledBox>
                </EmotionStyledContainer>
              </EmotionStyledBox>
            </EmotionStyledContainer>
          ))}
        </Profiler>
      )}
      {isEmotionStyledActive2 && (
        <Profiler id="@emotion/styled-2" onRender={log}>
          {range.map(index => (
            <EmotionComponentA border key={index}>{index + 1}</EmotionComponentA>
          ))}
        </Profiler>
      )}
      {isEmotionStyledActive3 && (
        <Profiler id="@emotion/styled-3" onRender={log}>
          {range.map(index => (
            <EmotionComponentB key={index}>{index + 1}</EmotionComponentB>
          ))}
        </Profiler>
      )}
      {isEmotionActive1 && (
        <Profiler id="@emotion/react-1" onRender={log}>
          {range.map(index => (
            <div css={emotionContainer} key={index}>
              <div css={emotionBox}>
                <div css={[emotionContainer, {border: '1rem solid yellow'}]}>
                  <div css={emotionBox}>{index + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </Profiler>
      )}
      {isEmotionActive2 && (
        <Profiler id="@emotion/react-2" onRender={log}>
          {range.map(index => (
            <EmotionContainer key={index}>
              <EmotionBox>
                <EmotionContainer border>
                  <EmotionBox>{index + 1}</EmotionBox>
                </EmotionContainer>
              </EmotionBox>
            </EmotionContainer>
          ))}
        </Profiler>
      )}
      {isHookStyleActive && (
        <Profiler id="hook-style" onRender={log}>
          {range.map(index => (
            <HookStyleContainer key={index}>
              <HookStyleBox>
                <HookStyleContainer border>
                  <HookStyleBox>{index + 1}</HookStyleBox>
                </HookStyleContainer>
              </HookStyleBox>
            </HookStyleContainer>
          ))}
        </Profiler>
      )}
      {isStyledHooksActive && (
        <Profiler id="hook-style" onRender={log}>
          {range.map(index => (
            <StyledHooksContainer key={index}>
              <StyledHooksBox>
                <StyledHooksContainer border>
                  <StyledHooksBox>{index + 1}</StyledHooksBox>
                </StyledHooksContainer>
              </StyledHooksBox>
            </StyledHooksContainer>
          ))}
        </Profiler>
      )}
    </div>
  );
}
