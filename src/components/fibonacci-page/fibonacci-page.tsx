import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form>
        <Input max={19}/>
        
      </form>
     
    </SolutionLayout>
  );
};
