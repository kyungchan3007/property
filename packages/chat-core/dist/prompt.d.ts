export declare const PROMPT_RULES: {
    BASE: string;
    PRICE_ANALYST: string;
    CONSULTANT: string;
    POLICY: string;
};
export type PromptRuleKey = keyof typeof PROMPT_RULES;
export declare const detectPromptType: (input: string) => PromptRuleKey;
export declare const resolvePromptRule: (input: string) => string;
//# sourceMappingURL=prompt.d.ts.map