import { Dispatch, SetStateAction, useMemo } from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string;
  setBlankAnswer: Dispatch<SetStateAction<string>>;
};

const BLANKS = '_____';

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {


  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: 'english',
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
    // console.log(words);
  }, [ answer ]);

  const answerWithBlanks = useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    setBlankAnswer(answerWithBlanks);
    return answerWithBlanks;
  }, [ keywords, answer, setBlankAnswer ]);

  // console.log(answerWithBlanks);


  return (
    <div className="flex justify-center w-full mt-4">
      <h1 className="text-xl font-semibold">
        { answerWithBlanks.split(BLANKS).map((part, index) => {
          return (
            <>
              { part }
              { index === answerWithBlanks.split(BLANKS).length - 1 ? null : (
                <input id="user-blank-input" className="text-center border-b-2 border-black dark:border-white focus:border-2 focus:border-b-4 focus:outline-none">
                </input>
              ) }
            </>
          );
        }) }
      </h1>
    </div>
  );
};

export default BlankAnswerInput;