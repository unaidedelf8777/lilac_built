import {SlIcon} from '@shoelace-style/shoelace/dist/react';
import * as React from 'react';

export interface Example {
  text: string;
  id: string;
}

interface ExampleViewerProps {
  examples: Example[];
  labeledData?: LabeledData;
  exampleLabeled: (labeledData: LabeledData) => void;
}

export interface LabeledData {
  [exampleIdx: string]: number;
}

export const ExampleViewer = React.memo(function ExampleViewer({
  examples,
  labeledData,
  exampleLabeled,
}: ExampleViewerProps): JSX.Element {
  if (examples.length === 0) {
    return <div className="text-lg">No examples to show...</div>;
  }
  const exampleLabelClicked = (exampleId: string, label: number) => {
    const newLabeledData = {...labeledData};
    if (exampleId in newLabeledData && newLabeledData[exampleId] === label) {
      delete newLabeledData[exampleId];
    } else {
      newLabeledData[exampleId] = label;
    }
    exampleLabeled(newLabeledData);
  };
  const exampleCards = examples.map((example) => {
    labeledData = labeledData || {};
    const checkedName =
      example.id in labeledData && labeledData[example.id] ? 'check-square-fill' : 'check-square';
    const uncheckedName =
      example.id in labeledData && !labeledData[example.id] ? 'x-square-fill' : 'x-square';
    return (
      <div key={example.id} className="flex flex-col bg-white w-64 h-64 m-2 rounded-lg p-4">
        <div className="flex flex-grow text-ellipsis overflow-auto">{example.text}</div>
        <div className="mt-2 flex justify-center shrink-0">
          <SlIcon
            onClick={() => exampleLabelClicked(example.id, 1)}
            className="cursor-pointer text-blue-400 text-2xl mr-2"
            name={checkedName}
          />
          <SlIcon
            onClick={() => exampleLabelClicked(example.id, 0)}
            className="cursor-pointer text-rose-400 text-2xl"
            name={uncheckedName}
          />
        </div>
      </div>
    );
  });
  return <div className="flex flex-wrap bg-slate-200">{exampleCards}</div>;
});
