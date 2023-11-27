import { useContext, useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import Header from './components/header/Header';
import Main from './components/main/Main'
import Introduction from './components/intro/Introduction';
import { ObserveContext } from './context/ObserveContext';
import Ability from './components/ability/Ability';
import Result from './components/result/Result';
import { DarkModeProvider } from './context/DarkModeContext';
import { LuArrowUpFromDot } from 'react-icons/lu';

function App() {
  const [isLoad, setIsLoad] = useState([false, false]);
  const { isIntersect, handleIntersect } = useContext(ObserveContext);
  const [isResult, setIsResult] = useState(false);

  const main = useRef(null);
  const result = useRef(null);

  const handleTopClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const bgTimer = setTimeout(() => setIsLoad(prev => prev.map((e, i) => !i ? true : e)), 300);
    const lineTimer = setTimeout(() => setIsLoad(prev => prev.map((e, i) => i ? true : e)), 1200);

    const intersectionCallback = entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleIntersect(false);
        } else {
          handleIntersect(true);
        }
      });
    }

    const intersectionCallbackResult = entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsResult(true);
        } else {
          setIsResult(false);
        }
      })
    }

    const observer = new IntersectionObserver(intersectionCallback, { threshold: 1 });
    const resultObserver = new IntersectionObserver(intersectionCallbackResult, { threshold: 1 });

    if (main.current) observer.observe(main.current);
    if (result.current) resultObserver.observe(result.current);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(lineTimer);
      observer.disconnect();
      resultObserver.disconnect();
    }
  }, [handleIntersect]);

  return (
    <DarkModeProvider>
      <Header isResult={isResult} />
      <div className={styles.mainWrap} ref={main}>
        <Main isLoad={isLoad} />
      </div>
      {
        <LuArrowUpFromDot
          className={`${styles.top} ${isIntersect ? styles.active : ''}`}
          onClick={handleTopClick} />
      }
      <Introduction />
      <Ability />
      <div className={styles.resultWrap} ref={result}>
        <Result />
      </div>
    </DarkModeProvider>
  );
}

export default App;