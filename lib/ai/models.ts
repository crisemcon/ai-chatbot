// OpenAI models for direct API access
export const DEFAULT_CHAT_MODEL = "gpt-5-mini";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  // GPT-5 Generation
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "openai",
    description: "Fast and affordable for everyday tasks",
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "openai",
    description: "Most capable OpenAI model",
  },
  // GPT-4.1 Generation
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    description: "Cost-effective for simple tasks",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "openai",
    description: "Powerful with image and PDF support",
  },
  // Reasoning models (extended thinking)
  {
    id: "gpt-5-mini-reasoning",
    name: "GPT-5 Mini (Reasoning)",
    provider: "reasoning",
    description: "Reasoning model with thinking summaries",
  },
];

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
