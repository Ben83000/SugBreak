import {
  waffleSteps,
  waffleStepsKey,
  waffleSchema,
  handleCheckWaffle,
} from "@/components/Modal/CustomProduct/Data/waffleData.js";
import {
  pancakeSteps,
  pancakeStepsKey,
  pancakeSchema,
  handleCheckPancake,
} from "@/components/Modal/CustomProduct/Data/pancakeData.js";
import {
  milkshakeSteps,
  milkshakeStepsKey,
  milkshakeSchema,
  handleCheckMilkshake,
} from "@/components/Modal/CustomProduct/Data/milkshakeData";
import {
  smoothieSteps,
  smoothieStepsKey,
  smoothieSchema,
  handleCheckSmoothie,
} from "@/components/Modal/CustomProduct/Data/smoothieData";
import {
  bubbleTeaSteps,
  bubbleTeaStepsKey,
  bubbleTeaSchema,
  handleCheckBubbleTea,
} from "@/components/Modal/CustomProduct/Data/bubbleTeaData";
import {
  iceCreamSteps,
  iceCreamStepsKey,
  iceCreamSchema,
  handleCheckIceCream,
} from "@/components/Modal/CustomProduct/Data/iceCreamData";

export const categoryData = {
  waffle: {
    steps: waffleSteps,
    stepsKey: waffleStepsKey,
    schema: waffleSchema,
    handleCheck: handleCheckWaffle,
  },
  pancake: {
    steps: pancakeSteps,
    stepsKey: pancakeStepsKey,
    schema: pancakeSchema,
    handleCheck: handleCheckPancake,
  },
  milkshake: {
    steps: milkshakeSteps,
    stepsKey: milkshakeStepsKey,
    schema: milkshakeSchema,
    handleCheck: handleCheckMilkshake,
  },
  smoothie: {
    steps: smoothieSteps,
    stepsKey: smoothieStepsKey,
    schema: smoothieSchema,
    handleCheck: handleCheckSmoothie,
  },
  bubbletea: {
    steps: bubbleTeaSteps,
    stepsKey: bubbleTeaStepsKey,
    schema: bubbleTeaSchema,
    handleCheck: handleCheckBubbleTea,
  },
  icecream: {
    steps: iceCreamSteps,
    stepsKey: iceCreamStepsKey,
    schema: iceCreamSchema,
    handleCheck: handleCheckIceCream,
  },
};
